import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { ensureChecklistApprovalRecord, updateChecklistTimeTodo } from "@/lib/services/checklistStagingDb";
import { parseBody } from "@/lib/parseBody";
import { serverErrorWithRequestId } from "@/lib/http/errorResponse";
import { createApiRequestContext } from "@/lib/http/observability";
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

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function POST(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.checklistStaging.POST");

    try {
        const payload = await parseBody<ChecklistPayload[]>(req);
        const batch = payload?.[0];
        const dataChecklist = batch?.dataArray ?? [];
        const timeTodo = batch?.time_todo ?? null;

        if (!Array.isArray(dataChecklist) || dataChecklist.length === 0) {
            requestContext.warn("checklist_staging.validation_failed", { reason: "empty_payload" });
            return jsonWithRequestId(
                {
                    success: false,
                    requestId: requestContext.requestId,
                    message: "Gagal input data Checklist Staging",
                    data: [],
                },
                requestContext.requestId,
                400
            );
        }

        const first = dataChecklist[0] as ChecklistItem;
        await ensureChecklistApprovalRecord({
            idPo: Number(first.id_po ?? 0),
            noMesin: Number(first.no_mesin ?? 0),
            snMesin: String(first.sn_mesin ?? ""),
        });

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

                await updateChecklistTimeTodo({
                    idPo: Number(first.id_po ?? 0),
                    idMesin: Number(first.no_mesin ?? 0),
                    timeTodo,
                });
            } catch (error) {
                await prisma.transaksi_checklist_staging.deleteMany({
                    where: {
                        id_po: Number(first.id_po ?? 0),
                        no_mesin: Number(first.no_mesin ?? 0),
                        id_divisi: Number(first.id_divisi ?? 0),
                    },
                });

                requestContext.error("checklist_staging.create_batch_failed", error);
                return serverErrorWithRequestId(requestContext.requestId);
            }
        }

        if (created.length > 0) {
            requestContext.done("request.completed", { statusCode: 200, totalDatas: created.length });
            return jsonWithRequestId(
                {
                    success: true,
                    requestId: requestContext.requestId,
                    message: "Berhasil Insert data Checklist Staging",
                    totalDatas: created.length,
                    data: toJsonSafe(created),
                },
                requestContext.requestId
            );
        }

        requestContext.warn("checklist_staging.no_rows_created");
        return jsonWithRequestId(
            {
                success: false,
                requestId: requestContext.requestId,
                message: "Gagal input data Checklist Staging",
                data: [],
            },
            requestContext.requestId,
            400
        );
    } catch (error) {
        requestContext.error("checklist_staging.unhandled_error", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
