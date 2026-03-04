import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, isPrismaNotFoundError, toDate, toNumber, validatePositiveId } from "@/lib/http/validation";
import {
    normalizeNullableText,
    normalizeSnMesin,
    StatusDeliveryBody,
    validateStatusDeliveryPayload,
} from "@/lib/http/statusDeliveryValidation";

export const runtime = "nodejs";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idParam = (await ctx.params).id;
        const idErrors = validatePositiveId(idParam, "id", "ID status delivery tidak valid");
        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const body = await parseBody<StatusDeliveryBody>(req);
        const payloadErrors = validateStatusDeliveryPayload(body);

        if (hasValidationErrors(payloadErrors)) {
            return validationError(payloadErrors);
        }

        const updated = await prisma.transaksi_status_delivery.update({
            where: { id: Number(idParam) },
            data: {
                id_po: toNumber(body.id_po)!,
                id_mesin: toNumber(body.id_mesin)!,
                sn_mesin: normalizeSnMesin(body.sn_mesin),
                tgl_perkiraan_tiba: toDate(body.tgl_perkiraan_tiba) ?? undefined,
                tgl_perkiraan_keluar: toDate(body.tgl_perkiraan_keluar) ?? undefined,
                notes: normalizeNullableText(body.notes),
                obsolete: normalizeNullableText(body.obsolete) ?? undefined,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status Delivery was updated.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json(
                { success: false, type: "NOT_FOUND", message: "Data status delivery tidak ditemukan" },
                { status: 404 }
            );
        }
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idParam = (await ctx.params).id;
        const idErrors = validatePositiveId(idParam, "id", "ID status delivery tidak valid");
        if (hasValidationErrors(idErrors)) {
            return validationError(idErrors);
        }

        const id = Number(idParam);
        const deleted = await prisma.transaksi_status_delivery.delete({ where: { id } });

        await prisma.transaksi_status_deliv_detail.deleteMany({ where: { id_header: id } });

        return NextResponse.json({
            success: true,
            message: `Status Delivery dengan SN Mesin ${deleted.sn_mesin} berhasil di hapus.`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json(
                { success: false, type: "NOT_FOUND", message: "Data status delivery tidak ditemukan" },
                { status: 404 }
            );
        }
        return serverError(error);
    }
}
