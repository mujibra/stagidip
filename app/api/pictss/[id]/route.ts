import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdatePicTssDTO = {
    name?: string;
};

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const pic = await prisma.pic_tss.findFirst({
            where: { id, deleted_at: null },
        });

        if (!pic) {
            return NextResponse.json({ success: false, message: "Data pictss tidak ditemukan", data: [] }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Detail data pictss",
            data: serializeId(pic),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<UpdatePicTssDTO>(req);
        const name = (body.name ?? "").trim();

        if (!name) {
            return validationError({ name: ["Pic TSS tidak boleh kosong"] });
        }

        const updated = await prisma.pic_tss.update({
            where: { id },
            data: {
                name,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Pic TSS berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const deleted = await prisma.pic_tss.update({
            where: { id },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "Data Pic TSS berhasil dihapus",
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
