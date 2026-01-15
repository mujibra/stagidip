import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";

type UpdateParentTypeDTO = {
    type_atm?: unknown[];
};

export async function PUT(req: NextRequest, { params }: { params: { idParent: string } }) {
    try {
        const idParent = Number(params.idParent);
        const body = await parseBody<UpdateParentTypeDTO>(req);

        if (!body.type_atm) {
            return validationError({
                type_atm: ["Type ATM wajib diisi"],
            });
        }

        const exists = await prisma.mst_parent_type_spesifikasi_msn.findUnique({
            where: { id: idParent },
        });

        if (!exists) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        const updated = await prisma.mst_parent_type_spesifikasi_msn.update({
            where: { id: idParent },
            data: {
                type_atm: JSON.stringify(body.type_atm),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Parent Type updated successfully.",
            data: {
                ...updated,
                id: updated.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: { idParent: string } }) {
    try {
        const idParent = Number(params.idParent);

        const parent = await prisma.mst_parent_type_spesifikasi_msn.findUnique({
            where: { id: idParent },
        });

        if (!parent) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Remove Item Parent was Error, Data Not Found",
                },
                { status: 400 }
            );
        }

        const hasChild = await prisma.mst_type_spesifikasi_msn.findFirst({
            where: { id_parent: idParent },
        });

        if (hasChild) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Gagal Menghapus ${parent.parent}, Silahkan untuk Pilih Action 'Edit Data' -> Kemudian Hapus Semua Data Item nya`,
                },
                { status: 400 }
            );
        }

        await prisma.mst_parent_type_spesifikasi_msn.delete({
            where: { id: idParent },
        });

        return NextResponse.json({
            success: true,
            message: `Remove Item List [${parent.parent}] has been deleted.`,
            data: {
                ...parent,
                id: parent.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
