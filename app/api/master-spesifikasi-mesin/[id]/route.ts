import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

// PUT /api/master-spesifikasi-mesin/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const body = await parseBody<{
            item: string;
            description?: string;
        }>(req);

        if (!body.item) {
            return NextResponse.json({ item: ["Item tidak boleh kosong"] }, { status: 400 });
        }

        const updated = await prisma.mst_spesifikasi_mesin.update({
            where: { id },
            data: {
                item: body.item,
                description: body.description,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Spesifikasi Mesin berhasil diupdate",
            data: {
                ...updated,
                id: updated.id.toString(),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}

// DELETE /api/master-spesifikasi-mesin/:id
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);

        const deleted = await prisma.mst_spesifikasi_mesin.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: `Data Spesifikasi Mesin ${deleted.item}-${deleted.description ?? ""} berhasil dihapus`,
            data: {
                ...deleted,
                id: deleted.id.toString(),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}
