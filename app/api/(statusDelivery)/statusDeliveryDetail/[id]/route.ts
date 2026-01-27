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

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const idHeader = Number(ctx.params.id);
        const data = await prisma.transaksi_status_deliv_detail.findMany({
            where: { id_header: idHeader },
            orderBy: { id: "asc" },
        });

        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    totalDatas: null,
                    data: [],
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<StatusDeliveryDetailBody>(req);
        const id_header = toNumber(body.id_header);
        const status = (body.status ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!id_header) errors.id_header = ["Header wajib diisi"];
        if (!status) errors.status = ["Status wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        await prisma.transaksi_status_deliv_detail.update({
            where: { id },
            data: {
                id_header: id_header ?? 0,
                status,
                keterangan: body.keterangan ?? null,
            },
        });

        const updated = await prisma.transaksi_status_deliv_detail.findUnique({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Status Delivery updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}
