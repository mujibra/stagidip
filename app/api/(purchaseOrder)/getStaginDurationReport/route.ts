import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const rows = await prisma.tbl_po.findMany({
            where: { deleted_at: null },
            select: { id: true, no_po: true, tgl_masuk: true, tgl_staging: true, status_mesin: true },
            orderBy: { id: "desc" },
            take: 500,
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
