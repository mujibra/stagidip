import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateStyleDTO = {
    name?: string;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const style = await prisma.mst_style.findFirst({ where: { id: toNumber(id)!, deleted_at: null } });

        if (!style) return notFoundError("Data style tidak ditemukan", { data: [] });

        return NextResponse.json({
            success: true,
            message: "Detail data style",
            data: serializeId(style),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data style tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<UpdateStyleDTO>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Style tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const updated = await prisma.mst_style.update({
            where: { id: toNumber(id)! },
            data: {
                name: body.name!.trim(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data style berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data style tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const deleted = await prisma.mst_style.update({
            where: { id: toNumber(id)! },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "Data style berhasil dihapus",
            data: serializeId(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data style tidak ditemukan", { data: [] });
        return serverError(error);
    }
}
