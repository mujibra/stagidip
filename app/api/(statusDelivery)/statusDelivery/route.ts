import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
import { hasValidationErrors, toDate, toNumber } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeSnMesin,
    StatusDeliveryBody,
    validateStatusDeliveryPayload,
} from "@/lib/http/statusDeliveryValidation";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const { skip, take, page, perPage } = getPagination(req.nextUrl.searchParams, { defaultPerPage: 20 });

        const [rows, total] = await Promise.all([
            prisma.transaksi_status_delivery.findMany({
                orderBy: { id: "desc" },
                skip,
                take,
            }),
            prisma.transaksi_status_delivery.count(),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            page,
            perPage,
            data: toJsonSafe(rows),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<StatusDeliveryBody>(req);
        const errors = validateStatusDeliveryPayload(body);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = toNumber(body.id_po)!;
        const idMesin = toNumber(body.id_mesin)!;
        const snMesin = normalizeSnMesin(body.sn_mesin);

        const exists = await prisma.transaksi_status_delivery.findFirst({
            where: { id_po: idPo, sn_mesin: snMesin },
        });

        if (exists) {
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

        return NextResponse.json({
            success: true,
            message: "Transaksi Status Delivery created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
