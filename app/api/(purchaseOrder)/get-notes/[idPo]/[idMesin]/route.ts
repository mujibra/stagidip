import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validatePoMesinParams } from "@/lib/http/purchaseOrderRuntimeValidation";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const params = await context.params;
        const errors = validatePoMesinParams(params.idPo, params.idMesin);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = toNumber(params.idPo)!;
        const idMesin = toNumber(params.idMesin)!;

        const sql = `select NOTES as notes from crt_${idPo} where id = ?`;
        const rows = (await prisma.$queryRawUnsafe<{ notes: string | null }[]>(sql, idMesin)) ?? [];

        return NextResponse.json({
            success: true,
            data: rows[0]?.notes ?? null,
        });
    } catch (error) {
        return serverError(error);
    }
}
