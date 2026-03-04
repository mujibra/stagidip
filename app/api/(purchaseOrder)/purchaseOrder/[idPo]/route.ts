import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, isPrismaNotFoundError, validatePositiveId } from "@/lib/http/validation";

export const runtime = "nodejs";

type UpdatePoBody = Record<string, unknown>;

export async function PUT(req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const idPoParam = (await context.params).idPo;
        const idErrors = validatePositiveId(idPoParam, "idPo", "idPo is invalid");
        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const body = await parseBody<UpdatePoBody>(req);

        const updated = await prisma.tbl_po.update({
            where: { id: Number(idPoParam) },
            data: body as never,
        });

        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "Purchase Order not found" }, { status: 404 });
        }
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const idPoParam = (await context.params).idPo;
        const idErrors = validatePositiveId(idPoParam, "idPo", "idPo is invalid");
        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const updated = await prisma.tbl_po.update({
            where: { id: Number(idPoParam) },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "Purchase Order not found" }, { status: 404 });
        }
        return serverError(error);
    }
}
