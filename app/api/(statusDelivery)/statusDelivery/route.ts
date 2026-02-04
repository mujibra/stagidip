import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type StatusDeliveryBody = {
    id_po?: string | number;
    id_mesin?: string | number;
    sn_mesin?: string;
    tgl_perkiraan_tiba?: string;
    tgl_perkiraan_keluar?: string;
    notes?: string;
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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take } = getPagination(searchParams);

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
            data: toJsonSafe(rows),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
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

        const exists = await prisma.transaksi_status_delivery.findFirst({
            where: { id_po: id_po ?? 0, sn_mesin },
        });

        if (exists) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Transaksi Status Delivery with SN Number ${sn_mesin} was Exists.`,
                },
                { status: 400 }
            );
        }

        const created = await prisma.transaksi_status_delivery.create({
            data: {
                id_po: id_po ?? 0,
                id_mesin: id_mesin ?? 0,
                sn_mesin,
                tgl_perkiraan_tiba: toDate(body.tgl_perkiraan_tiba) ?? undefined,
                tgl_perkiraan_keluar: toDate(body.tgl_perkiraan_keluar) ?? undefined,
                notes: body.notes ?? null,
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
