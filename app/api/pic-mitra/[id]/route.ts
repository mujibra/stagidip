import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

type PicMitraId = {
    params: Promise<{ id: string }>;
};

// GET /api/pic-mitra/:id
export async function GET(_req: Request, { params }: PicMitraId) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const pic = await prisma.pic_mitra.findUnique({ where: { id: numericId } });

    if (!pic) {
        return NextResponse.json({ success: false, message: "Data picmitra tidak ditemukan", data: "" }, { status: 400 });
    }

    return NextResponse.json({
        success: true,
        message: "Detail data picmitra",
        data: {
            ...pic,
            id: pic.id.toString(),
        },
    });
}

// PUT /api/pic-mitra/:id
export async function PUT(req: Request, { params }: PicMitraId) {
    try {
        const { id } = await params; // params is a Promise now
        const numericId = Number(id);
        const body = await parseBody<{ name: string }>(req);

        if (!body.name) {
            return NextResponse.json({ name: ["Pic mitra tidak boleh kosong"] }, { status: 400 });
        }

        const updated = await prisma.pic_mitra.update({
            where: { id: numericId },
            data: {
                name: body.name,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data pic mitra berhasil diupdate",
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
            { status: 500 }
        );
    }
}

// DELETE /api/pic-mitra/:id
export async function DELETE(_req: Request, { params }: PicMitraId) {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    // check usage in tbl_po.pic_staging
    const used = await prisma.tbl_po.findFirst({
        where: { pic_staging: numericId },
    });

    if (used) {
        const pic = await prisma.pic_mitra.findUnique({ where: { id: numericId } });

        return NextResponse.json(
            {
                success: false,
                message: `PIC ${pic?.name} Gagal di hapus`,
            },
            { status: 400 }
        );
    }

    const deleted = await prisma.pic_mitra.delete({ where: { id: numericId } });

    return NextResponse.json({
        success: true,
        message: "Data pic mitra berhasil dihapus",
        data: {
            ...deleted,
            id: deleted.id.toString(),
        },
    });
}
