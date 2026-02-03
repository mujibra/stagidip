import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type StatusDeliveryBody = {
    id_po?: string | number;
    id_mesin?: string | number;
    sn_mesin?: string;
    tgl_perkiraan_tiba?: string;
    tgl_perkiraan_keluar?: string;
    notes?: string;
    obsolete?: string | null;
};

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

function toDate(value: unknown): Date | null {
    if (!value) return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const body = await parseBody<StatusDeliveryBody>(req);
        const id_po = toNumber(body.id_po);
        const id_mesin = toNumber(body.id_mesin);
        const sn_mesin = (body.sn_mesin ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!id_po) errors.id_po = ["PO wajib diisi"];
        if (!id_mesin) errors.id_mesin = ["Mesin wajib diisi"];
        if (!sn_mesin) errors.sn_mesin = ["SN Mesin wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const updated = await prisma.transaksi_status_delivery.update({
            where: { id },
            data: {
                id_po: id_po ?? 0,
                id_mesin: id_mesin ?? 0,
                sn_mesin,
                tgl_perkiraan_tiba: toDate(body.tgl_perkiraan_tiba) ?? undefined,
                tgl_perkiraan_keluar: toDate(body.tgl_perkiraan_keluar) ?? undefined,
                notes: body.notes ?? null,
                obsolete: body.obsolete ?? undefined,
            },
        });

        return NextResponse.json({
            success: true,
            message: "PO Master was Updated.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const deleted = await prisma.transaksi_status_delivery.delete({ where: { id } });

        await prisma.transaksi_status_deliv_detail.deleteMany({ where: { id_header: id } });

        return NextResponse.json({
            success: true,
            message: `Status Delivery dengan SN Mesin ${deleted.sn_mesin} berhasil di hapus.`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
