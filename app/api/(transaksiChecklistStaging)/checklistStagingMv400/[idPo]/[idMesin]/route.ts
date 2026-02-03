import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type ChecklistItem = {
    id_checklist_staging?: number | string;
    checkpoint_desc?: string | null;
    sn_part?: string | null;
    results?: string | null;
    inspector_sign?: string | null;
    fix_description?: string | null;
};

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const idPo = toNumber((await context.params).idPo);
        const idMesin = toNumber((await context.params).idMesin);

        if (!idPo || !idMesin) {
            return NextResponse.json({ success: true, data: [] });
        }

        const list = await prisma.mst_checklist_stag_mv400.findMany({
            orderBy: { id: "asc" },
        });

        const data = await Promise.all(
            list.map(async (item) => {
                const detail = await prisma.transaksi_checklist_stag_mv400.findFirst({
                    where: {
                        id_po: idPo,
                        no_mesin: idMesin,
                        id_checklist_staging: item.id,
                    },
                });

                return detail ?? [];
            })
        );

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const idPo = toNumber((await context.params).idPo);
        const idMesin = toNumber((await context.params).idMesin);
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
            const checklistId = Number(item.id_checklist_staging ?? 0);
            try {
                const result = await prisma.transaksi_checklist_stag_mv400.updateMany({
                    where: {
                        id_po: idPo,
                        no_mesin: idMesin,
                        id_checklist_staging: checklistId,
                    },
                    data: {
                        checkpoint_desc: item.checkpoint_desc ?? null,
                        sn_part: item.sn_part ?? null,
                        results: item.results ?? null,
                        inspector_sign: item.inspector_sign ?? null,
                        fix_description: item.fix_description ?? null,
                    },
                });
                updated.push(result);
            } catch (error) {
                return serverError(error);
            }
        }

        if (updated.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Berhasil Update data Checklist Staging Mv400",
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
