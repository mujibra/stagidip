import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);

        const pic = await prisma.pic_mitra.findUnique({ where: { id } });
        if (!pic) {
            return NextResponse.json({ success: false, message: "Data picmitra tidak ditemukan", data: "" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Detail data picmitra", data: { ...pic, id: String(pic.id) } });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const body = await parseBody<{ name?: string }>(req);
        const name = (body.name ?? "").trim();

        if (!name) return validationError({ name: ["Pic mitra tidak boleh kosong"] });

        const updated = await prisma.pic_mitra.update({
            where: { id },
            data: { name, updated_at: new Date() },
        });

        return NextResponse.json({ success: true, message: "Data pic mitra berhasil diupdate", data: { ...updated, id: String(updated.id) } });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);

        const used = await prisma.tbl_po.findFirst({ where: { pic_staging: id }, select: { id: true } });
        if (used) {
            const pic = await prisma.pic_mitra.findUnique({ where: { id }, select: { name: true } });
            return NextResponse.json({ success: false, message: `PIC ${pic?.name ?? ""} Gagal di hapus` }, { status: 400 });
        }

        const deleted = await prisma.pic_mitra.delete({ where: { id } });
        return NextResponse.json({ success: true, message: "Data pic mitra berhasil dihapus", data: { ...deleted, id: String(deleted.id) } });
    } catch (error) {
        return serverError(error);
    }
}
