import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const rows = await prisma.tbl_po.groupBy({
            by: ["id_type_mesin"],
            where: { tgl_masuk: { not: null }, deleted_at: null },
            _count: { id: true },
        });
        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
