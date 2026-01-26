import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type ChecklistPayload = {
    dataArray?: Record<string, unknown>[];
    time_todo?: string;
};

type ChecklistItem = {
    id_po?: number | string;
    no_mesin?: number | string;
    sn_mesin?: string;
    id_divisi?: number | string;
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

function shouldEncodeFillColumns(resultDetails: string | null, types?: string | null) {
    if (!resultDetails && !types) return false;
    if (types && ["TEXT_INPUT", "COMBO_BOX"].includes(types)) return true;
    if (!resultDetails) return false;
    return (
        resultDetails === "VDisplay" ||
        resultDetails.includes("Dev. 1,2,3,4") ||
        resultDetails.includes("1.Booting time: Min. Sec.") ||
        resultDetails.includes("No problem the display status")
    );
}

export async function POST(req: NextRequest) {
    try {
        const payload = await parseBody<ChecklistPayload[]>(req);
        const batch = payload?.[0];
        const dataChecklist = batch?.dataArray ?? [];
        const timeTodo = batch?.time_todo ?? null;

        if (!Array.isArray(dataChecklist) || dataChecklist.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal input data Checklist Staging",
                    data: [],
                },
                { status: 400 }
            );
        }

        const first = dataChecklist[0] as ChecklistItem;
        const approvalExists = await prisma.transaksi_checklist_stag_approval.count({
            where: {
                id_po: Number(first.id_po ?? 0),
                no_mesin: Number(first.no_mesin ?? 0),
            },
        });

        if (approvalExists < 1) {
            await prisma.transaksi_checklist_stag_approval.create({
                data: {
                    id_po: Number(first.id_po ?? 0),
                    no_mesin: Number(first.no_mesin ?? 0),
                    sn_mesin: String(first.sn_mesin ?? ""),
                },
            });
        }

        const created = [] as unknown[];

        for (const raw of dataChecklist) {
            const item = raw as ChecklistItem;
            const checklistId = toNumber(item.id_checklist_staging) ?? 0;
            const typeItem = await prisma.mst_checklist_staging.findFirst({
                where: { id: checklistId },
                include: { mst_type_value_checklist: true },
            });

            const shouldEncode = shouldEncodeFillColumns(
                item.result_details ?? null,
                typeItem?.mst_type_value_checklist?.types ?? null
            );

            const fillColumns = shouldEncode
                ? JSON.stringify(item.fill_columns ?? null)
                : (item.fill_columns as string | null);

            try {
                const inserted = await prisma.transaksi_checklist_staging.create({
                    data: {
                        id_po: Number(item.id_po ?? 0),
                        no_mesin: Number(item.no_mesin ?? 0),
                        sn_mesin: String(item.sn_mesin ?? ""),
                        id_divisi: Number(item.id_divisi ?? 0),
                        id_checklist_staging: checklistId,
                        result_details: item.result_details ?? null,
                        results: item.results ?? null,
                        problem: toNumber(item.problem),
                        action: toNumber(item.action),
                        remark: toNumber(item.remark),
                        fill_columns: fillColumns ?? null,
                    },
                });

                created.push(inserted);

                const idPo = Number(first.id_po ?? 0);
                const idMesin = Number(first.no_mesin ?? 0);
                if (idPo && idMesin && timeTodo) {
                    const sql = `update crt_${idPo} set TIME_CHECKLIST = ? where id = ?`;
                    await prisma.$executeRawUnsafe(sql, timeTodo, idMesin);
                }
            } catch (error) {
                await prisma.transaksi_checklist_staging.deleteMany({
                    where: {
                        id_po: Number(first.id_po ?? 0),
                        no_mesin: Number(first.no_mesin ?? 0),
                        id_divisi: Number(first.id_divisi ?? 0),
                    },
                });

                return serverError(error);
            }
        }

        if (created.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Berhasil Insert data Checklist Staging",
                totalDatas: created.length,
                data: toJsonSafe(created),
            });
        }

        return NextResponse.json(
            {
                success: false,
                message: "Gagal input data Checklist Staging",
                data: [],
            },
            { status: 400 }
        );
    } catch (error) {
        return serverError(error);
    }
}
