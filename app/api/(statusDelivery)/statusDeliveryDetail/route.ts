import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeStatus,
    StatusDeliveryDetailBody,
    validateStatusDeliveryDetailPayload,
} from "@/lib/http/statusDeliveryDetailValidation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<StatusDeliveryDetailBody>(req);
        const errors = validateStatusDeliveryDetailPayload(body);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idHeader = toNumber(body.id_header)!;
        const status = normalizeStatus(body.status);

        const exists = await prisma.transaksi_status_deliv_detail.count({
            where: { id_header: idHeader, status },
        });

        if (exists > 0) {
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

        return NextResponse.json({
            success: true,
            message: "Status Delivery Detail created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
