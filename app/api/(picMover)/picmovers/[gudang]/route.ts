import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ gudang: string }> }) {
    try {
        const gudang = (await ctx.params).gudang;
        const data = await prisma.pic_mover.findMany({
            where: { gudang },
            orderBy: { id: "desc" },
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
