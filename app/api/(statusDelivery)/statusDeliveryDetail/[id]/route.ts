import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, isPrismaNotFoundError, toNumber, validatePositiveId } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeStatus,
    StatusDeliveryDetailBody,
    validateStatusDeliveryDetailPayload,
} from "@/lib/http/statusDeliveryDetailValidation";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idHeaderParam = (await ctx.params).id;
        const idErrors = validatePositiveId(idHeaderParam, "id", "ID header tidak valid");

        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const idHeader = Number(idHeaderParam);
        const data = await prisma.transaksi_status_deliv_detail.findMany({
            where: { id_header: idHeader },
            orderBy: { id: "asc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idParam = (await ctx.params).id;
        const idErrors = validatePositiveId(idParam, "id", "ID detail tidak valid");

        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const body = await parseBody<StatusDeliveryDetailBody>(req);
        const payloadErrors = validateStatusDeliveryDetailPayload(body);

        if (hasValidationErrors(payloadErrors)) {
            return validationError(payloadErrors);
        }

        const id = Number(idParam);
        const updated = await prisma.transaksi_status_deliv_detail.update({
            where: { id },
            data: {
                id_header: toNumber(body.id_header)!,
                status: normalizeStatus(body.status),
                keterangan: normalizeNullableText(body.keterangan),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status Delivery updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json(
                { success: false, type: "NOT_FOUND", message: "Status Delivery Detail tidak ditemukan" },
                { status: 404 }
            );
        }
        return serverError(error);
    }
}
