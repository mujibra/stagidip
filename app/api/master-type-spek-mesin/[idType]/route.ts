import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateTypeSpekMesinDTO = {
    val?: string;
    label?: string;
    id_parent?: number;
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ idType: string }> }) {
    try {
        const { idType } = await params;
        const idErrors = validateMasterIdParam(idType);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<UpdateTypeSpekMesinDTO>(req);
        const idTypeNum = toNumber(idType)!;

        const exists = await prisma.mst_type_spesifikasi_msn.findUnique({ where: { id: idTypeNum } });
        if (!exists) return notFoundError("Data not found");

        await prisma.mst_type_spesifikasi_msn.update({
            where: { id: idTypeNum },
            data: body,
        });

        const updated = await prisma.mst_type_spesifikasi_msn.findUnique({ where: { id: idTypeNum } });

        return NextResponse.json({
            success: true,
            message: "Item Type was Updated.",
            data: serializeId(updated!),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ idType: string }> }) {
    try {
        const { idType } = await params;
        const idErrors = validateMasterIdParam(idType);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idTypeNum = toNumber(idType)!;
        const data = await prisma.mst_type_spesifikasi_msn.findUnique({ where: { id: idTypeNum } });
        if (!data) return notFoundError("Data not found");

        const used = await prisma.mst_spesifikasi_mesin_fnew.findFirst({ where: { item_code: data.val } });
        if (used) {
            return badRequestError(
                `Gagal Menghapus ${data.val} - ${data.label}, Silahkan pilih Action Detail , Kemudian Hapus Semua Detail List nya`
            );
        }

        await prisma.mst_type_spesifikasi_msn.delete({ where: { id: idTypeNum } });

        return NextResponse.json({
            success: true,
            message: `Remove Field Item [${data.val} - ${data.label}] has been deleted.`,
            data: serializeId(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
