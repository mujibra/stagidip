import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type UpdateGudangDTO = {
    gudang_desc?: string;
    alamat?: string | null;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);

        const gudang = await prisma.mst_gudang.findUnique({ where: { id } });

        return NextResponse.json({
            success: true,
            data: gudang ? { ...gudang, id: String(gudang.id) } : [],
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const body = await parseBody<UpdateGudangDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.gudang_desc) errors.gudang_desc = ["Gudang tidak boleh kosong"];
        if (Object.keys(errors).length) return validationError(errors);

        const updated = await prisma.mst_gudang.update({
            where: { id },
            data: {
                gudang_desc: body.gudang_desc!,
                alamat: body.alamat ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil di update",
            data: { ...updated, id: String(updated.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);

        const existsPo = await prisma.tbl_po.findFirst({
            where: { nama_gudang: id },
            select: { id: true },
        });

        if (existsPo) {
            const gudang = await prisma.mst_gudang.findUnique({
                where: { id },
                select: { gudang_desc: true },
            });

            return NextResponse.json({ success: false, message: `Gudang ${gudang?.gudang_desc ?? ""} Gagal di hapus` }, { status: 400 });
        }

        const deleted = await prisma.mst_gudang.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil dihapus",
            data: { ...deleted, id: String(deleted.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
