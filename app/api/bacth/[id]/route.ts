import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const batch = await prisma.bacth_po.findUnique({ where: { id } });
        if (!batch) {
            return NextResponse.json({ success: false, message: "Data batch tidak ditemukan", data: "" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Detail data batch", data: serializeId(batch) });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<{ name?: string }>(req);
        const name = (body.name ?? "").trim();

        if (!name) return validationError({ name: ["Batch tidak boleh kosong"] });

        const exists = await prisma.bacth_po.findFirst({
            where: { name, NOT: { id } },
        });

        if (exists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Nama Batch sudah ada, harap masukkan Nama Batch lain",
                    data: "",
                },
                { status: 400 }
            );
        }

        const updated = await prisma.bacth_po.update({ where: { id }, data: { name } });

        return NextResponse.json({ success: true, message: "Bacth berhasil di update", data: serializeId(updated) });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const used = await prisma.tbl_po.findFirst({ where: { batch: id }, select: { id: true } });
        if (used) {
            const batch = await prisma.bacth_po.findUnique({ where: { id }, select: { name: true } });
            return NextResponse.json({ success: false, message: `${batch?.name ?? "Batch"} Gagal di hapus` }, { status: 400 });
        }

        const deleted = await prisma.bacth_po.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "Data berhasil di hapus", data: serializeId(deleted) });
    } catch (error) {
        return serverError(error);
    }
}
