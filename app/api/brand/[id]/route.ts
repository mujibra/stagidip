import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

type BrandIdContext = {
    params: Promise<{ id: string }>;
};

// GET /api/brand/:id (show)
export async function GET(req: NextRequest, { params }: BrandIdContext) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const brand = await prisma.brand.findUnique({
        where: { id: numericId },
    });

    if (!brand) {
        return NextResponse.json(
            {
                success: false,
                message: "Data brand tidak ditemukan",
                data: [],
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Detail data brand",
        data: {
            ...brand,
            id: brand.id.toString(),
        },
    });
}

// PUT /api/brand/:id (update)
export async function PUT(req: NextRequest, { params }: BrandIdContext) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const { name } = await parseBody<{ name: string }>(req);

    if (!name) {
        return NextResponse.json({ name: ["Brand tidak boleh kosong"] }, { status: 400 });
    }

    const updated = await prisma.brand.update({
        where: { id: numericId },
        data: { name },
    });

    return NextResponse.json({
        success: true,
        message: "Data brand berhasil diupdate",
        data: {
            ...updated,
            id: updated.id.toString(),
        },
    });
}

// DELETE /api/brand/:id (destroy)
export async function DELETE(req: NextRequest, { params }: BrandIdContext) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const deleted = await prisma.brand.delete({
        where: { id: numericId },
    });

    return NextResponse.json({
        success: true,
        message: "Data brand berhasil di hapus",
        data: {
            ...deleted,
            id: deleted.id.toString(),
        },
    });
}
