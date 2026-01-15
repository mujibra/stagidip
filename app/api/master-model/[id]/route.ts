import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type MasterModel = {
    params: Promise<{ id: string }>;
};

// GET /master-model/:id (show)
export async function GET(req: Request, { params }: MasterModel) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const model = await prisma.models.findUnique({ where: { id: numericId } });

    if (model) {
        return NextResponse.json({
            success: true,
            message: "Detail data model",
            data: model,
        });
    }

    return NextResponse.json(
        {
            success: false,
            message: "Detail data model tidak ditemukan",
            data: "",
        },
        { status: 401 }
    );
}

// PUT /master-model/:id (update)
export async function PUT(req: Request, { params }: MasterModel) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const body = await req.json();

    if (!body.name) {
        return NextResponse.json(
            {
                success: false,
                message: "Model tidak boleh kosong",
                data: { name: ["Model tidak boleh kosong"] },
            },
            { status: 400 }
        );
    }

    const model = await prisma.models.findUnique({ where: { id: numericId } });

    if (!model) {
        return NextResponse.json(
            {
                success: false,
                message: "Data not found",
            },
            { status: 400 }
        );
    }

    // check purchase order usage
    const usedInPo = await prisma.tbl_po.findFirst({
        where: { model: numericId },
    });

    if (usedInPo) {
        return NextResponse.json(
            {
                success: false,
                message: `Type ${model.name} Gagal di update, Type ini sedang dipakai di Transaksi Staging Registration`,
            },
            { status: 400 }
        );
    }

    const update = await prisma.models.update({
        where: { id: numericId },
        data: { name: body.name },
    });

    return NextResponse.json({
        success: true,
        message: "Data model berhasil diupdate",
        data: update,
    });
}

// DELETE /master-model/:id (destroy)
export async function DELETE(req: Request, { params }: MasterModel) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const model = await prisma.models.findUnique({ where: { id: numericId } });

    if (!model) {
        return NextResponse.json({ success: false, message: "Data not found" }, { status: 400 });
    }

    const usedInPo = await prisma.tbl_po.findFirst({
        where: { model: numericId },
    });

    if (usedInPo) {
        return NextResponse.json(
            {
                success: false,
                message: `Type ${model.name} Gagal di hapus, Type ini masih terpakai di Transaksi Staging Registration`,
            },
            { status: 400 }
        );
    }

    const usedInMasterMesin = await prisma.mst_mesin.findFirst({
        where: { model: numericId },
    });

    if (usedInMasterMesin) {
        return NextResponse.json(
            {
                success: false,
                message: `${model.name} Gagal di hapus, Type ini masih terpilih di Model Mesin`,
            },
            { status: 400 }
        );
    }

    const deleted = await prisma.models.delete({ where: { id: numericId } });

    return NextResponse.json({
        success: true,
        message: "Data model berhasil dihapus",
        data: deleted,
    });
}
