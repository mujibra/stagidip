import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function isIsoDate(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(_req: NextRequest, context: { params: Promise<{ dateFrom: string; dateTo: string }> }) {
    try {
        const { dateFrom, dateTo } = await context.params;

        if (!isIsoDate(dateFrom) || !isIsoDate(dateTo)) {
            return validationError({ date: ["Format tanggal harus YYYY-MM-DD"] });
        }

        const rows = await prisma.tbl_po.findMany({
            where: {
                deleted_at: null,
                created_at: {
                    gte: new Date(`${dateFrom}T00:00:00.000Z`),
                    lte: new Date(`${dateTo}T23:59:59.999Z`),
                },
            },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
