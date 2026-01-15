import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";

type UpdateTypeSpekMesinDTO = {
    val?: string;
    label?: string;
    id_parent?: number;
};

export async function PUT(req: NextRequest, { params }: { params: { idType: string } }) {
    try {
        const idType = Number(params.idType);
        const body = await parseBody<UpdateTypeSpekMesinDTO>(req);

        const exists = await prisma.mst_type_spesifikasi_msn.findUnique({
            where: { id: idType },
        });

        if (!exists) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        await prisma.mst_type_spesifikasi_msn.update({
            where: { id: idType },
            data: body,
        });

        const updated = await prisma.mst_type_spesifikasi_msn.findUnique({
            where: { id: idType },
        });

        return NextResponse.json({
            success: true,
            message: "Item Type was Updated.",
            data: {
                ...updated!,
                id: updated!.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: { idType: string } }) {
    try {
        const idType = Number(params.idType);

        const data = await prisma.mst_type_spesifikasi_msn.findUnique({
            where: { id: idType },
        });

        if (!data) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        const used = await prisma.mst_spesifikasi_mesin_fnew.findFirst({
            where: { item_code: data.val },
        });

        if (used) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Gagal Menghapus ${data.val} - ${data.label}, Silahkan pilih Action Detail , Kemudian Hapus Semua Detail List nya`,
                },
                { status: 400 }
            );
        }

        await prisma.mst_type_spesifikasi_msn.delete({
            where: { id: idType },
        });

        return NextResponse.json({
            success: true,
            message: `Remove Field Item [${data.val} - ${data.label}] has been deleted.`,
            data: {
                ...data,
                id: data.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
