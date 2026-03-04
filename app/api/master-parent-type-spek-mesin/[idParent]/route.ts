import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredArray } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateParentTypeDTO = {
    type_atm?: unknown[];
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ idParent: string }> }) {
    try {
        const { idParent } = await params;
        const idErrors = validateMasterIdParam(idParent);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<UpdateParentTypeDTO>(req);
        const bodyErrors = validateRequiredArray(body.type_atm, "type_atm", "Type ATM wajib diisi");
        if (hasValidationErrors(bodyErrors)) return validationError(bodyErrors);

        const idParentNum = toNumber(idParent)!;
        const exists = await prisma.mst_parent_type_spesifikasi_msn.findUnique({ where: { id: idParentNum } });
        if (!exists) return notFoundError("Data not found");

        const updated = await prisma.mst_parent_type_spesifikasi_msn.update({
            where: { id: idParentNum },
            data: {
                type_atm: JSON.stringify(body.type_atm),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Parent Type updated successfully.",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ idParent: string }> }) {
    try {
        const { idParent } = await params;
        const idErrors = validateMasterIdParam(idParent);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idParentNum = toNumber(idParent)!;
        const parent = await prisma.mst_parent_type_spesifikasi_msn.findUnique({ where: { id: idParentNum } });
        if (!parent) return notFoundError("Remove Item Parent was Error, Data Not Found");

        const hasChild = await prisma.mst_type_spesifikasi_msn.findFirst({ where: { id_parent: idParentNum } });
        if (hasChild) {
            return badRequestError(
                `Gagal Menghapus ${parent.parent}, Silahkan untuk Pilih Action 'Edit Data' -> Kemudian Hapus Semua Data Item nya`
            );
        }

        await prisma.mst_parent_type_spesifikasi_msn.delete({ where: { id: idParentNum } });

        return NextResponse.json({
            success: true,
            message: `Remove Item List [${parent.parent}] has been deleted.`,
            data: serializeId(parent),
        });
    } catch (error) {
        return serverError(error);
    }
}
