import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type StatusDeliveryDetailBody = {
    id_header?: string | number;
    status?: string;
    keterangan?: string;
};

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<StatusDeliveryDetailBody>(req);
        const id_header = toNumber(body.id_header);
        const status = (body.status ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!id_header) errors.id_header = ["Header wajib diisi"];
        if (!status) errors.status = ["Status wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const exists = await prisma.transaksi_status_deliv_detail.count({
            where: { id_header: id_header ?? 0, status },
        });

        if (exists > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tambah Status Delivery Errors.",
                    data: [],
                },
                { status: 400 }
            );
        }

        const created = await prisma.transaksi_status_deliv_detail.create({
            data: {
                id_header: id_header ?? 0,
                status,
                keterangan: body.keterangan ?? null,
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
