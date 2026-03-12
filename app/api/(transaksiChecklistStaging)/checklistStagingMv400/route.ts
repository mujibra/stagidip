import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
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
    id_classification?: number | string;
    id_checklist_staging?: number | string;
    checkpoint_desc?: string | null;
    sn_part?: string | null;
    results?: string | null;
    inspector_sign?: string | null;
    fix_description?: string | null;
};

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function POST(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.checklistStagingMv400.POST");

    try {
        const payload = await parseBody<ChecklistPayload[]>(req);
        const batch = payload?.[0];
        const dataChecklist = batch?.dataArray ?? [];
        const timeTodo = batch?.time_todo ?? null;

        if (!Array.isArray(dataChecklist) || dataChecklist.length === 0) {
            requestContext.warn("checklist_staging_mv400.validation_failed", { reason: "empty_payload" });
            return jsonWithRequestId(
                {
                    success: false,
                    requestId: requestContext.requestId,
                    message: "Gagal input data Checklist Staging Mv400",
                    data: [],
                },
                requestContext.requestId,
                400
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
            const idPo = Number(item.id_po ?? 0);
            const idMesin = Number(item.no_mesin ?? 0);

            try {
                const inserted = await prisma.transaksi_checklist_stag_mv400.create({
                    data: {
                        id_po: idPo,
                        no_mesin: idMesin,
                        sn_mesin: String(item.sn_mesin ?? ""),
                        id_classification: Number(item.id_classification ?? 0),
                        id_checklist_staging: Number(item.id_checklist_staging ?? 0),
                        checkpoint_desc: item.checkpoint_desc ?? null,
                        sn_part: item.sn_part ?? null,
                        results: item.results ?? null,
                        inspector_sign: item.inspector_sign ?? null,
                        fix_description: item.fix_description ?? null,
                    },
                });

                created.push(inserted);

                if (idPo && idMesin && timeTodo) {
                    const sql = `update crt_${idPo} set TIME_CHECKLIST = ? where id = ?`;
                    await prisma.$executeRawUnsafe(sql, timeTodo, idMesin);
                }
            } catch (error) {
                await prisma.transaksi_checklist_stag_mv400.deleteMany({
                    where: {
                        id_po: Number(first.id_po ?? 0),
                        no_mesin: Number(first.no_mesin ?? 0),
                        id_classification: Number(first.id_classification ?? 0),
                    },
                });

                requestContext.error("checklist_staging_mv400.create_batch_failed", error);
                return serverErrorWithRequestId(requestContext.requestId);
            }
        }

        if (created.length > 0) {
            requestContext.done("request.completed", { statusCode: 200, totalDatas: created.length });
            return jsonWithRequestId(
                {
                    success: true,
                    requestId: requestContext.requestId,
                    message: "Berhasil Insert data Checklist Staging Mv400",
                    totalDatas: created.length,
                    data: toJsonSafe(created),
                },
                requestContext.requestId
            );
        }

        requestContext.warn("checklist_staging_mv400.no_rows_created");
        return jsonWithRequestId(
            {
                success: false,
                requestId: requestContext.requestId,
                message: "Gagal input data Checklist Staging Mv400",
                data: [],
            },
            requestContext.requestId,
            400
        );
    } catch (error) {
        requestContext.error("checklist_staging_mv400.unhandled_error", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
