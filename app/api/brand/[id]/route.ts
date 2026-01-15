import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const brand = await prisma.brand.findUnique({ where: { id } });
        if (!brand) {
            return NextResponse.json({ success: false, message: "Data brand tidak ditemukan", data: [] }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Detail data brand", data: serializeId(brand) });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<{ name?: string }>(req);
        const name = (body.name ?? "").trim();

        if (!name) {
            return validationError({ name: ["Brand tidak boleh kosong"] });
        }

        const updated = await prisma.brand.update({ where: { id }, data: { name } });

        return NextResponse.json({ success: true, message: "Data brand berhasil diupdate", data: serializeId(updated) });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const deleted = await prisma.brand.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "Data brand berhasil di hapus", data: serializeId(deleted) });
    } catch (error) {
        return serverError(error);
    }
}
