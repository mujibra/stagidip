import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const brand = await prisma.brand.findUnique({ where: { id: toNumber(id)! } });
        if (!brand) return notFoundError("Data brand tidak ditemukan", { data: [] });

        return NextResponse.json({ success: true, message: "Detail data brand", data: serializeId(brand) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data brand tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<{ name?: string }>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Brand tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const updated = await prisma.brand.update({ where: { id: toNumber(id)! }, data: { name: body.name!.trim() } });

        return NextResponse.json({ success: true, message: "Data brand berhasil diupdate", data: serializeId(updated) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data brand tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const deleted = await prisma.brand.delete({ where: { id: toNumber(id)! } });

        return NextResponse.json({ success: true, message: "Data brand berhasil di hapus", data: serializeId(deleted) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data brand tidak ditemukan", { data: [] });
        return serverError(error);
    }
}
