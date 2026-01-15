import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /bacth/:id (show)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const batch = await prisma.bacth_po.findUnique({
        where: { id: numericId },
    });

    if (!batch) {
        return NextResponse.json(
            {
                success: false,
                message: "Data batch tidak ditemukan",
                data: "",
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Detail data batch",
        data: batch,
    });
}

// PUT /bacth/:id (update)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);
    const body = await req.json();

    if (!body.name) {
        return NextResponse.json({ name: ["Batch tidak boleh kosong"] }, { status: 400 });
    }

    try {
        // Check duplicate first
        const exists = await prisma.bacth_po.findFirst({
            where: {
                name: body.name,
                NOT: { id: numericId },
            },
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

        const update = await prisma.bacth_po.update({
            where: { id: numericId },
            data: { name: body.name },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Bacth berhasil di update",
                data: update,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error update bacth",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

// DELETE /bacth/:id (destroy)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    // Check usage in PurchaseOrder
    const used = await prisma.tbl_po.findFirst({
        where: { batch: numericId },
    });

    if (used) {
        const batch = await prisma.bacth_po.findUnique({ where: { id: numericId } });

        return NextResponse.json(
            {
                success: false,
                message: `${batch?.name} Gagal di hapus`,
            },
            { status: 400 }
        );
    }

    const deleted = await prisma.bacth_po.delete({
        where: { id: numericId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Data berhasil di hapus",
            data: deleted,
        },
        { status: 200 }
    );
}
