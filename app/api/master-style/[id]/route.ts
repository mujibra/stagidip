import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateStyleDTO = {
    name?: string;
};

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const style = await prisma.mst_style.findFirst({
            where: { id, deleted_at: null },
        });

        if (!style) {
            return NextResponse.json({ success: false, message: "Data style tidak ditemukan", data: [] }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Detail data style",
            data: serializeId(style),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<UpdateStyleDTO>(req);
        const name = (body.name ?? "").trim();

        if (!name) {
            return validationError({ name: ["Style tidak boleh kosong"] });
        }

        const updated = await prisma.mst_style.update({
            where: { id },
            data: {
                name,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data style berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const deleted = await prisma.mst_style.update({
            where: { id },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "Data style berhasil dihapus",
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
