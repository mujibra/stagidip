import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { getPoTableName, tableExists, toPositiveInt } from "@/lib/services/purchaseOrderTable";

export const runtime = "nodejs";

function isIsoDate(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(_req: NextRequest, context: { params: Promise<{ date_from: string; date_to: string; idPo: string }> }) {
    try {
        const { date_from, date_to, idPo } = await context.params;
        const idPoNum = toPositiveInt(idPo);

        if (!isIsoDate(date_from) || !isIsoDate(date_to)) {
            return validationError({ date: ["Format tanggal harus YYYY-MM-DD"] });
        }

        if (!idPoNum) {
            return validationError({ idPo: ["idPo tidak valid"] });
        }

        const po = await prisma.tbl_po.findFirst({
            where: {
                id: idPoNum,
                deleted_at: null,
                created_at: {
                    gte: new Date(`${date_from}T00:00:00.000Z`),
                    lte: new Date(`${date_to}T23:59:59.999Z`),
                },
            },
            select: { id: true },
        });

        if (!po) return notFoundError("Purchase Order tidak ditemukan pada range tanggal tersebut");

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) {
            return notFoundError("Table purchase order tidak ditemukan");
        }

        const rows = await prisma.$queryRawUnsafe<Array<{ total: number; time_staging: number; time_preloading: number; time_checklist: number }>>(
            `
            SELECT
                COUNT(*) AS total,
                SUM(CASE WHEN TIME_STAGING IS NOT NULL AND TIME_STAGING <> '' THEN 1 ELSE 0 END) AS time_staging,
                SUM(CASE WHEN TIME_PRELOADING IS NOT NULL AND TIME_PRELOADING <> '' THEN 1 ELSE 0 END) AS time_preloading,
                SUM(CASE WHEN TIME_CHECKLIST IS NOT NULL AND TIME_CHECKLIST <> '' THEN 1 ELSE 0 END) AS time_checklist
            FROM ${tableName}
        `,
        );

        const summary = rows[0] ?? { total: 0, time_staging: 0, time_preloading: 0, time_checklist: 0 };

        return NextResponse.json({ success: true, data: summary });
    } catch (error) {
        return serverError(error);
    }
}
