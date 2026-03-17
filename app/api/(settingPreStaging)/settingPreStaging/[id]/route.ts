import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";

type SettingPreStagingBody = {
    types?: string;
    description?: string;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const data = await prisma.setting_prestaging.findUnique({ where: { id: toNumber(id)! } });

        if (!data) return notFoundError("Data tidak ditemukan", { data: "" });

        return NextResponse.json({
            success: true,
            message: "Detail data",
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<SettingPreStagingBody>(req);
        const types = (body.types ?? "").trim();
        const description = (body.description ?? "").trim();

        const idNum = toNumber(id)!;
        const errors: Record<string, string[]> = {};
        if (!types) errors.types = ["Types wajib diisi"];
        if (!description) errors.description = ["Description wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        await prisma.setting_prestaging.update({
            where: { id: idNum },
            data: { types, description },
        });

        const updated = await prisma.setting_prestaging.findUnique({ where: { id: idNum } });

        return NextResponse.json({
            success: true,
            message: "Setting Pre Staging updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const deleted = await prisma.setting_prestaging.delete({ where: { id: idNum } });

        return NextResponse.json({
            success: true,
            message: `Data ${deleted.types}-${deleted.description} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
