import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type RouteParams = {
    params: Promise<{ idMesin: string }>;
};

// GET /api/master-mesin/new-mesin/:idMesin
export async function GET(_req: Request, { params }: RouteParams) {
    try {
        const { idMesin } = await params;
        const idErrors = validateMasterIdParam(idMesin);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const mesin = await prisma.mst_mesin.findUnique({ where: { id: toNumber(idMesin)! } });
        if (!mesin) return notFoundError("Data tidak ditemukan", { data: [] });

        const model = await prisma.models.findUnique({ where: { id: mesin.model as number } });
        const listCopyFrom = await prisma.mst_mesin.findMany({
            where: {
                model: Number(model?.id),
                status_template_prestaging: 1,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                ...mesin,
                id: String(mesin.id),
                model,
            },
            list_copy_from: listCopyFrom.map((m) => ({ ...m, id: String(m.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}
