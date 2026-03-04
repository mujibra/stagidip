import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";
import { serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type RouteParams = {
    params: Promise<{ modelId: string }>;
};

// GET /api/master-mesin/model/:modelId
export async function GET(_req: Request, { params }: RouteParams) {
    try {
        const { modelId } = await params;
        const idErrors = validateMasterIdParam(modelId);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const list = await prisma.mst_mesin.findMany({ where: { model: toNumber(modelId)! } });
        if (!list.length) return notFoundError("Data tidak ditemukan", { data: [] });

        return NextResponse.json({
            success: true,
            totalDatas: list.length,
            data: serializeMany(list),
        });
    } catch (error) {
        return serverError(error);
    }
}
