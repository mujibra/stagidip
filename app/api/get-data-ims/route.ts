import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const rows = await prisma.tbl_po.findMany({
            where: { deleted_at: null },
            select: { id: true, no_po: true, id_po_master: true, status_po: true, created_at: true, updated_at: true },
            orderBy: { id: "desc" },
            take: 200,
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
