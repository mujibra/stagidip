import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { serializeId } from "@/lib/serialize";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

// PUT /api/master-spesifikasi-mesin/:id
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<{ item?: string; description?: string }>(req);
        const bodyErrors = validateRequiredName(body.item, "item", "Item tidak boleh kosong");
        if (hasValidationErrors(bodyErrors)) return validationError(bodyErrors);

        const updated = await prisma.mst_spesifikasi_mesin.update({
            where: { id: toNumber(id)! },
            data: {
                item: body.item!.trim(),
                description: body.description?.trim() || undefined,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Spesifikasi Mesin berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data Spesifikasi Mesin tidak ditemukan");
        return serverError(error);
    }
}

// DELETE /api/master-spesifikasi-mesin/:id
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const deleted = await prisma.mst_spesifikasi_mesin.delete({
            where: { id: toNumber(id)! },
        });

        return NextResponse.json({
            success: true,
            message: `Data Spesifikasi Mesin ${deleted.item}-${deleted.description ?? ""} berhasil dihapus`,
            data: serializeId(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data Spesifikasi Mesin tidak ditemukan");
        return serverError(error);
    }
}
