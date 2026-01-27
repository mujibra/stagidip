import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type ChecklistItem = {
    id_po?: number | string;
    no_mesin?: number | string;
    id_checklist_staging?: number | string;
    result_details?: string | null;
    results?: string | null;
    problem?: number | string | null;
    action?: number | string | null;
    remark?: number | string | null;
    fill_columns?: unknown;
};

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function shouldEncodeFillColumns(resultDetails: string | null) {
    if (!resultDetails) return false;
    return (
        resultDetails === "VDisplay" ||
        resultDetails.includes("Dev. 1,2,3,4") ||
        resultDetails.includes("1.Booting time: Min. Sec.") ||
        resultDetails.includes("No problem the display status")
    );
}

export async function PUT(
    req: NextRequest,
    context: { params: { idPo: string; idMesin: string; idDivisi: string } }
) {
    try {
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);
        const idDivisiRaw = context.params.idDivisi;
        const payload = await parseBody<ChecklistItem[]>(req);

        if (!idPo || !idMesin || !Array.isArray(payload)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal Update data Checklist Staging",
                    data: [],
                },
                { status: 400 }
            );
        }

        const updated = [] as unknown[];

        for (const item of payload) {
            const checklistId = toNumber(item.id_checklist_staging) ?? 0;
            const fillColumns = shouldEncodeFillColumns(item.result_details ?? null)
                ? JSON.stringify(item.fill_columns ?? null)
                : (item.fill_columns as string | null);

            try {
                if (idDivisiRaw === "null") {
                    const exists = await prisma.transaksi_checklist_staging.findFirst({
                        where: {
                            id_po: idPo,
                            no_mesin: idMesin,
                            id_checklist_staging: checklistId,
                        },
                    });

                    if (!exists) {
                        const created = await prisma.transaksi_checklist_staging.create({
                            data: {
                                id_po: Number(item.id_po ?? idPo),
                                no_mesin: Number(item.no_mesin ?? idMesin),
                                sn_mesin: "",
                                id_divisi: 0,
                                id_checklist_staging: checklistId,
                                result_details: item.result_details ?? null,
                                results: item.results ?? null,
                                problem: toNumber(item.problem),
                                action: toNumber(item.action),
                                remark: toNumber(item.remark),
                                fill_columns: fillColumns ?? null,
                            },
                        });
                        updated.push(created);
                    } else {
                        const result = await prisma.transaksi_checklist_staging.updateMany({
                            where: {
                                id_po: idPo,
                                no_mesin: idMesin,
                                id_checklist_staging: checklistId,
                            },
                            data: {
                                result_details: item.result_details ?? null,
                                results: item.results ?? null,
                                problem: toNumber(item.problem),
                                action: toNumber(item.action),
                                remark: toNumber(item.remark),
                                fill_columns: fillColumns ?? null,
                            },
                        });
                        updated.push(result);
                    }
                } else {
                    const idDivisi = toNumber(idDivisiRaw) ?? 0;
                    const result = await prisma.transaksi_checklist_staging.updateMany({
                        where: {
                            id_po: idPo,
                            no_mesin: idMesin,
                            id_divisi: idDivisi,
                            id_checklist_staging: checklistId,
                        },
                        data: {
                            result_details: item.result_details ?? null,
                            results: item.results ?? null,
                            problem: toNumber(item.problem),
                            action: toNumber(item.action),
                            remark: toNumber(item.remark),
                            fill_columns: fillColumns ?? null,
                        },
                    });
                    updated.push(result);
                }
            } catch (error) {
                return serverError(error);
            }
        }

        if (updated.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Berhasil Update data Checklist Staging",
                totalDatas: updated.length,
                data: toJsonSafe(updated),
            });
        }

        return NextResponse.json(
            {
                success: false,
                message: "Gagal Update data Checklist Staging",
                data: [],
            },
            { status: 400 }
        );
    } catch (error) {
        return serverError(error);
    }
}
