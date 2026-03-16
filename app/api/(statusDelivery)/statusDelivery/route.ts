import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverErrorWithRequestId, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
import { createApiRequestContext } from "@/lib/http/observability";
import { hasValidationErrors, toDate, toNumber } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeSnMesin,
    StatusDeliveryBody,
    validateStatusDeliveryPayload,
} from "@/lib/http/statusDeliveryValidation";

export const runtime = "nodejs";

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function GET(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.statusDelivery.GET");

    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [rows, total] = await Promise.all([
            prisma.transaksi_status_delivery.findMany({
                orderBy: { id: "desc" },
                skip,
                take,
            }),
            prisma.transaksi_status_delivery.count(),
        ]);

        requestContext.done("request.completed", { statusCode: 200, totalDatas: total, page, perPage });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                totalDatas: total,
                totalPages: Math.ceil(total / perPage),
                page,
                perPage,
                data: toJsonSafe(rows),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("status_delivery.list_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}

export async function POST(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.statusDelivery.POST");

    try {
        const body = await parseBody<StatusDeliveryBody>(req);
        const errors = validateStatusDeliveryPayload(body);

        if (hasValidationErrors(errors)) {
            requestContext.warn("status_delivery.validation_failed", { reason: "payload_invalid" });
            return validationError(errors);
        }

        const idPo = toNumber(body.id_po)!;
        const idMesin = toNumber(body.id_mesin)!;
        const snMesin = normalizeSnMesin(body.sn_mesin);

        const exists = await prisma.transaksi_status_delivery.findFirst({
            where: { id_po: idPo, sn_mesin: snMesin },
        });

        if (exists) {
            requestContext.warn("status_delivery.validation_failed", { reason: "duplicate_sn", idPo, snMesin });
            return validationError({
                sn_mesin: [`Transaksi Status Delivery dengan SN Number ${snMesin} sudah ada.`],
            });
        }

        const created = await prisma.transaksi_status_delivery.create({
            data: {
                id_po: idPo,
                id_mesin: idMesin,
                sn_mesin: snMesin,
                tgl_perkiraan_tiba: toDate(body.tgl_perkiraan_tiba) ?? undefined,
                tgl_perkiraan_keluar: toDate(body.tgl_perkiraan_keluar) ?? undefined,
                notes: normalizeNullableText(body.notes),
            },
        });

        requestContext.done("request.completed", { statusCode: 200, createdStatusDeliveryId: created.id });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                message: "Transaksi Status Delivery created successfully.",
                data: toJsonSafe(created),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("status_delivery.create_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
