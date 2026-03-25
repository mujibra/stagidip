import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ type: string }> }) {
    try {
        const { type } = await context.params;

        const rows = await prisma.tbl_po.findMany({
            where: { status_mesin: { contains: type }, deleted_at: null },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
