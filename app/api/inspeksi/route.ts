import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type InspeksiPayload = {
    dataArray?: Record<string, unknown>[];
    time_todo?: string;
};

type InspeksiItem = {
    id_po?: number | string;
    no_mesin?: number | string;
    sn_mesin?: string | null;
    id_inspeksi?: number | string | null;
    position?: string | null;
    quantity?: number | string | null;
    status?: string | null;
    keterangan?: string | null;
};

function normalizeEmpty(value: unknown) {
    if (value === "") return null;
    return value;
}

function toNumberOrNull(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(req: NextRequest) {
    try {
        const payload = await parseBody<InspeksiPayload[]>(req);
        const batch = payload?.[0];
        const dataInspeksi = batch?.dataArray ?? [];
        const timeTodo = batch?.time_todo ?? null;

        if (!Array.isArray(dataInspeksi) || dataInspeksi.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal input data Transaksi Inspeksi",
                    data: [],
                },
                { status: 400 }
            );
        }

        const created = await prisma.$transaction(
            dataInspeksi.map((raw) => {
                const item = raw as InspeksiItem;
                return prisma.transaksi_inspeksi.create({
                    data: {
                        id_po: Number(item.id_po ?? 0),
                        no_mesin: Number(item.no_mesin ?? 0),
                        sn_mesin: (item.sn_mesin ?? null) as string | null,
                        id_inspeksi: toNumberOrNull(item.id_inspeksi),
                        position: normalizeEmpty(item.position) as string | null,
                        quantity: toNumberOrNull(item.quantity),
                        status: normalizeEmpty(item.status) as string | null,
                        keterangan: normalizeEmpty(item.keterangan) as string | null,
                    },
                });
            })
        );

        if (created.length > 0) {
            const first = dataInspeksi[0] as InspeksiItem;
            await prisma.transaksi_inspeksi_approval.create({
                data: {
                    id_po: Number(first.id_po ?? 0),
                    no_mesin: Number(first.no_mesin ?? 0),
                    sn_mesin: String(first.sn_mesin ?? ""),
                },
            });

            const idPo = Number(first.id_po ?? 0);
            const idMesin = Number(first.no_mesin ?? 0);
            if (idPo && idMesin && timeTodo) {
                const sql = `update crt_${idPo} set TIME_PRELOADING = ? where id = ?`;
                await prisma.$executeRawUnsafe(sql, timeTodo, idMesin);
            }

            return NextResponse.json({
                success: true,
                message: "Berhasil Insert data Inspeksi Testing",
                totalDatas: created.length,
                data: toJsonSafe(created),
            });
        }

        return NextResponse.json(
            {
                success: false,
                message: "Gagal input data Transaksi Inspeksi",
                data: [],
            },
            { status: 400 }
        );
    } catch (error) {
        return serverError(error);
    }
}
