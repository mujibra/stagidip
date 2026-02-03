
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterSpekMesinBody = {
    item?: string;
    description?: string;
};

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const body = await parseBody<MasterSpekMesinBody>(req);
        const item = (body.item ?? "").trim();

        if (!item) {
            return validationError({ item: ["Item wajib diisi"] });
        }

        await prisma.mst_spesifikasi_mesin.update({
            where: { id },
            data: {
                item,
                description: body.description ?? "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Spesifikasi Mesin berhasil diupdate",
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const deleted = await prisma.mst_spesifikasi_mesin.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `Data Spesifikasi Mesin ${deleted.item}-${deleted.description} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
