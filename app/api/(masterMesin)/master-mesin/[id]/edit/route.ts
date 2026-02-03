import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);

        const mesin = await prisma.mst_mesin.findUnique({ where: { id } });
        if (!mesin) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan", data: [] },
                { status: 400 }
            );
        }

        const model = await prisma.models.findUnique({ where: { id: Number(mesin.model) } });

        return NextResponse.json({
            success: true,
            data: { ...mesin, id: String(mesin.id), model },
        });
    } catch (error) {
        return serverError(error);
    }
}
