import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type UpdateModelDTO = { name?: string };

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const model = await prisma.models.findUnique({ where: { id } });
        if (!model) {
            return NextResponse.json({ success: false, message: "Detail data model tidak ditemukan", data: "" }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            message: "Detail data model",
            data: { ...model, id: String(model.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<UpdateModelDTO>(req);
        const name = (body.name ?? "").trim();

        if (!name) {
            return validationError({ name: ["Model tidak boleh kosong"] });
        }

        const model = await prisma.models.findUnique({ where: { id }, select: { id: true, name: true } });
        if (!model) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 400 });
        }

        const usedInPo = await prisma.tbl_po.findFirst({ where: { model: id }, select: { id: true } });
        if (usedInPo) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Type ${model.name} Gagal di update, Type ini sedang dipakai di Transaksi Staging Registration`,
                },
                { status: 400 }
            );
        }

        const updated = await prisma.models.update({ where: { id }, data: { name } });

        return NextResponse.json({
            success: true,
            message: "Data model berhasil diupdate",
            data: { ...updated, id: String(updated.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const model = await prisma.models.findUnique({ where: { id }, select: { id: true, name: true } });
        if (!model) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 400 });
        }

        const usedInPo = await prisma.tbl_po.findFirst({ where: { model: id }, select: { id: true } });
        if (usedInPo) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Type ${model.name} Gagal di hapus, Type ini masih terpakai di Transaksi Staging Registration`,
                },
                { status: 400 }
            );
        }

        const usedInMasterMesin = await prisma.mst_mesin.findFirst({ where: { model: id }, select: { id: true } });
        if (usedInMasterMesin) {
            return NextResponse.json(
                {
                    success: false,
                    message: `${model.name} Gagal di hapus, Type ini masih terpilih di Model Mesin`,
                },
                { status: 400 }
            );
        }

        const deleted = await prisma.models.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Data model berhasil dihapus",
            data: { ...deleted, id: String(deleted.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
