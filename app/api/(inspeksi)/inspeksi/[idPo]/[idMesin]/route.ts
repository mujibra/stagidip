import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

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

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function toNumberOrNull(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function normalizeEmpty(value: unknown) {
    if (value === "") return null;
    return value;
}

function parseJsonValue(value: string | null) {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

export async function GET(
    _req: NextRequest,
    context: { params: { idPo: string; idMesin: string } }
) {
    try {
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);

        if (!idPo || !idMesin) {
            return NextResponse.json(
                {
                    success: true,
                    totalDatas: 0,
                    data: [],
                    time_preloading: null,
                },
                { status: 200 }
            );
        }

        const sql = `select TIME_PRELOADING as time_preloading from crt_${idPo} where id = ${idMesin}`;
        const timeRows =
            (await prisma.$queryRawUnsafe<{ time_preloading: string | null }[]>(
                sql
            )) ?? [];
        const timePreloading = timeRows[0]?.time_preloading ?? null;

        const po = await prisma.tbl_po.findFirst({
            where: { id: idPo },
        });
        const mesin = po?.id_type_mesin
            ? await prisma.mst_mesin.findFirst({
                  where: { id: po.id_type_mesin },
              })
            : null;
        const model = po?.model
            ? await prisma.models.findFirst({
                  where: { id: BigInt(po.model) },
              })
            : null;

        const modelName = model?.name ?? "";
        let orderBy: "orderby_atms" | "orderby_crms" | "orderby_cskios" = "orderby_atms";

        if (modelName === "CRM") orderBy = "orderby_crms";
        if (modelName === "CS KIOS") orderBy = "orderby_cskios";

        const inspections = await prisma.mst_inspeksi.findMany({
            where: {
                type_atm: { contains: modelName || undefined },
            },
            orderBy: { [orderBy]: "asc" },
        });

        const inspectionIds = inspections.map((item) => item.id);
        const details = inspectionIds.length
            ? await prisma.transaksi_inspeksi.findMany({
                  where: {
                      id_po: idPo,
                      no_mesin: idMesin,
                      id_inspeksi: { in: inspectionIds },
                  },
              })
            : [];

        const detailMap = new Map(details.map((item) => [item.id_inspeksi ?? 0, item]));
        const statusCount = await prisma.transaksi_inspeksi.count({
            where: { id_po: idPo, no_mesin: idMesin },
        });

        const data = inspections.map((item) => {
            const detail = detailMap.get(item.id) ?? null;
            return {
                ...item,
                detail_inspeksi: detail,
                testing_inspection: statusCount > 0,
                in_out_info: parseJsonValue(item.in_out_info),
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
            time_preloading: timePreloading,
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: { idPo: string; idMesin: string } }
) {
    try {
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);
        const payload = await parseBody<InspeksiItem[]>(req);

        if (!idPo || !idMesin || !Array.isArray(payload)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal input data Transaksi Inspeksi",
                    data: [],
                },
                { status: 400 }
            );
        }

        const results = [] as Array<number | InspeksiItem>;

        for (const item of payload) {
            const idInspeksi = toNumberOrNull(item.id_inspeksi);
            const exists = await prisma.transaksi_inspeksi.findFirst({
                where: {
                    id_po: idPo,
                    no_mesin: idMesin,
                    id_inspeksi: idInspeksi ?? undefined,
                },
            });

            try {
                if (exists) {
                    const updated = await prisma.transaksi_inspeksi.updateMany({
                        where: {
                            id_po: Number(item.id_po ?? idPo),
                            no_mesin: Number(item.no_mesin ?? idMesin),
                            id_inspeksi: idInspeksi ?? undefined,
                        },
                        data: {
                            id_inspeksi: idInspeksi,
                            position: normalizeEmpty(item.position) as string | null,
                            quantity: toNumberOrNull(item.quantity),
                            status: normalizeEmpty(item.status) as string | null,
                            keterangan: normalizeEmpty(item.keterangan) as string | null,
                        },
                    });
                    results.push(updated.count);
                } else {
                    const created = await prisma.transaksi_inspeksi.create({
                        data: {
                            id_po: Number(item.id_po ?? idPo),
                            no_mesin: Number(item.no_mesin ?? idMesin),
                            sn_mesin: (item.sn_mesin ?? null) as string | null,
                            id_inspeksi: idInspeksi,
                            position: normalizeEmpty(item.position) as string | null,
                            quantity: toNumberOrNull(item.quantity),
                            status: normalizeEmpty(item.status) as string | null,
                            keterangan: normalizeEmpty(item.keterangan) as string | null,
                        },
                    });
                    results.push(created);
                }
            } catch {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Harap untuk Melakukan Update Mesin, dengan Men-submit Ulang Preloading Inspeksi di Mesin 1",
                    },
                    { status: 400 }
                );
            }
        }

        if (results.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Berhasil Update data Inspeksi Testing",
                totalDatas: results.length,
                data: toJsonSafe(results),
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
