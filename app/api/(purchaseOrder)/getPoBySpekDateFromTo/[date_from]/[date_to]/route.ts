import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function isIsoDate(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(_req: NextRequest, context: { params: Promise<{ date_from: string; date_to: string }> }) {
    try {
        const { date_from, date_to } = await context.params;

        if (!isIsoDate(date_from) || !isIsoDate(date_to)) {
            return validationError({ date: ["Format tanggal harus YYYY-MM-DD"] });
        }

        const rows = await prisma.tbl_po.findMany({
            where: {
                deleted_at: null,
                created_at: {
                    gte: new Date(`${date_from}T00:00:00.000Z`),
                    lte: new Date(`${date_to}T23:59:59.999Z`),
                },
            },
            select: {
                id: true,
                no_po: true,
                id_po_master: true,
                customer: true,
                nama_gudang: true,
                model: true,
                batch: true,
                created_at: true,
            },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
