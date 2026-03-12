import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverErrorWithRequestId, validationError } from "@/lib/http/errorResponse";
import { createApiRequestContext } from "@/lib/http/observability";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeStatus,
    StatusDeliveryDetailBody,
    validateStatusDeliveryDetailPayload,
} from "@/lib/http/statusDeliveryDetailValidation";

export const runtime = "nodejs";

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function POST(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.statusDeliveryDetail.POST");

    try {
        const body = await parseBody<StatusDeliveryDetailBody>(req);
        const errors = validateStatusDeliveryDetailPayload(body);

        if (hasValidationErrors(errors)) {
            requestContext.warn("status_delivery_detail.validation_failed", { reason: "payload_invalid" });
            return validationError(errors);
        }

        const idHeader = toNumber(body.id_header)!;
        const status = normalizeStatus(body.status);

        const exists = await prisma.transaksi_status_deliv_detail.count({
            where: { id_header: idHeader, status },
        });

        if (exists > 0) {
            requestContext.warn("status_delivery_detail.validation_failed", {
                reason: "duplicate_status_for_header",
                idHeader,
                status,
            });
            return validationError({
                status: ["Tambah Status Delivery Errors. Status sudah ada untuk header ini."],
            });
        }

        const created = await prisma.transaksi_status_deliv_detail.create({
            data: {
                id_header: idHeader,
                status,
                keterangan: normalizeNullableText(body.keterangan),
            },
        });

        requestContext.done("request.completed", { statusCode: 200, createdStatusDeliveryDetailId: created.id });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                message: "Status Delivery Detail created successfully.",
                data: toJsonSafe(created),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("status_delivery_detail.create_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
