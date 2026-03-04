import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterSpekMesinBody = {
    item?: string;
    description?: string;
};

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<MasterSpekMesinBody>(req);
        const itemErrors = validateRequiredName(body.item, "item", "Item wajib diisi");
        if (hasValidationErrors(itemErrors)) return validationError(itemErrors);

        await prisma.mst_spesifikasi_mesin.update({
            where: { id: toNumber(id)! },
            data: {
                item: body.item!.trim(),
                description: body.description ?? "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Spesifikasi Mesin berhasil diupdate",
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data Spesifikasi Mesin tidak ditemukan");
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const deleted = await prisma.mst_spesifikasi_mesin.delete({ where: { id: toNumber(id)! } });

        return NextResponse.json({
            success: true,
            message: `Data Spesifikasi Mesin ${deleted.item}-${deleted.description} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data Spesifikasi Mesin tidak ditemukan");
        return serverError(error);
    }
}
