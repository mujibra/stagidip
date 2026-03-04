import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const mesin = await prisma.mst_mesin.findUnique({ where: { id: idNum } });
        if (!mesin) return notFoundError("Data tidak ditemukan", { data: [] });

        const model = await prisma.models.findUnique({ where: { id: Number(mesin.model) } });

        return NextResponse.json({
            success: true,
            data: { ...mesin, id: String(mesin.id), model },
        });
    } catch (error) {
        return serverError(error);
    }
}
