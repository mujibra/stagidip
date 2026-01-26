import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: { type: string } }) {
    try {
        const type = ctx.params.type;
        const data = await prisma.mst_spesifikasi_mesin.findMany({
            where: { item: type },
            orderBy: { id: "asc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
