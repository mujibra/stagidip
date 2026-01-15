import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

type RouteParams = {
    params: Promise<{ id: string }>;
};

// GET /api/master-mesin/:id  (getDataById)
export async function GET(_req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const numericId = Number(id);

    const mesin = await prisma.mst_mesin.findUnique({
        where: { id: numericId },
    });

    if (!mesin) {
        return NextResponse.json(
            {
                success: false,
                message: "Data tidak ditemukan",
                data: [],
            },
            { status: 400 }
        );
    }

    const model = await prisma.models.findUnique({
        where: { id: mesin.model as number },
    });

    return NextResponse.json({
        success: true,
        data: {
            ...mesin,
            id: mesin.id.toString(),
            model,
        },
    });
}

// PUT /api/master-mesin/:id  (update)
export async function PUT(req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const numericId = Number(id);

    const body = await parseBody<{
        merek?: string;
        model?: number;
        type?: string;
    }>(req);

    const { merek, model, type, ...rest } = body;

    const errors: Record<string, string[]> = {};
    if (!merek) errors.merek = ["Merek tidak boleh kosong !"];
    if (!model) errors.model = ["Model tidak boleh kosong !"];
    if (!type) errors.type = ["Type tidak boleh kosong"];

    if (Object.keys(errors).length > 0) {
        return NextResponse.json(errors, { status: 400 });
    }

    try {
        const updated = await prisma.mst_mesin.update({
            where: { id: numericId },
            data: {
                merek,
                model,
                type,
                ...rest,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Data berhasil diupdate",
                data: {
                    ...updated,
                    id: updated.id.toString(),
                },
            },
            { status: 200 }
        );
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan pada database";

        if (msg.includes("Unique constraint failed")) {
            return NextResponse.json(
                {
                    errorMessage: `Model Mesin ${type} sudah ada, Harap Isi Nama Model dengan nama lain`,
                },
                { status: 400 }
            );
        }

        return NextResponse.json({ errorMessage: msg }, { status: 400 });
    }
}

// DELETE /api/master-mesin/:id  (destroy)
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const numericId = Number(id);

    // Cek apakah dipakai di PurchaseOrder.id_type_mesin
    const usedInPo = await prisma.tbl_po.findFirst({
        where: { id_type_mesin: numericId },
    });

    if (usedInPo) {
        const mesin = await prisma.mst_mesin.findUnique({
            where: { id: numericId },
        });

        return NextResponse.json(
            {
                success: false,
                message: `Type Mesin ${mesin?.type} Gagal di hapus, karena sudah terpakai di Transaksi Staging Registration`,
            },
            { status: 400 }
        );
    }

    const deleted = await prisma.mst_mesin.findUnique({
        where: { id: numericId },
    });

    if (!deleted) {
        return NextResponse.json(
            {
                success: false,
                message: "Data gagal dihapus",
            },
            { status: 400 }
        );
    }

    await prisma.mst_mesin.delete({ where: { id: numericId } });

    // cascade delete like Laravel
    await prisma.mst_divisi.deleteMany({ where: { id_mesin: numericId } });
    await prisma.mst_checklist_staging.deleteMany({
        where: { id_mesin: numericId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Data berhasil dihapus",
            data: {
                ...deleted,
                id: deleted.id.toString(),
            },
        },
        { status: 200 }
    );
}
