import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type MasterGudangId = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: MasterGudangId) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    try {
        const gudang = await prisma.mst_gudang.findUnique({
            where: { id: numericId },
        });

        return NextResponse.json({
            success: true,
            data: gudang || [],
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching gudangs.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, { params }: MasterGudangId) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    try {
        const body = await req.json();

        if (!body.gudang_desc) {
            return NextResponse.json({ gudang_desc: ["Gudang tidak boleh kosong"] }, { status: 400 });
        }

        const update = await prisma.mst_gudang.update({
            where: { id: numericId },
            data: {
                gudang_desc: body.gudang_desc,
                alamat: body.alamat ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil di update",
            data: update,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching gudangs.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: MasterGudangId) {
    try {
        const { id } = await params; // params is a Promise now
        const numericId = Number(id);

        const existsPo = await prisma.tbl_po.findFirst({
            where: { nama_gudang: numericId },
        });

        if (existsPo) {
            const gudang = await prisma.mst_gudang.findUnique({
                where: { id: numericId },
            });

            return NextResponse.json(
                {
                    success: false,
                    message: `Gudang ${gudang?.gudang_desc} Gagal di hapus`,
                },
                { status: 400 }
            );
        }

        const deleted = await prisma.mst_gudang.delete({
            where: { id: numericId },
        });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil dihapus",
            data: deleted,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while deleted gudangs.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
