import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

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
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                data: [],
                status_checklist: false,
                time_checklist: null,
            });
        }

        const sql = `select TIME_CHECKLIST as time_checklist from crt_${idPo} where id = ${idMesin}`;
        const timeRows =
            (await prisma.$queryRawUnsafe<{ time_checklist: string | null }[]>(
                sql
            )) ?? [];
        const timeChecklist = timeRows[0]?.time_checklist ?? null;

        const list = await prisma.mst_checklist_stag_mv400.findMany({
            orderBy: { id: "asc" },
        });

        const classifMap = new Map(
            (await prisma.mst_classification.findMany()).map((item) => [item.id, item.name])
        );

        let statusChecklist = false;

        const data = await Promise.all(
            list.map(async (item) => {
                const detail = await prisma.transaksi_checklist_stag_mv400.findFirst({
                    where: {
                        id_po: idPo,
                        no_mesin: idMesin,
                        id_checklist_staging: item.id,
                    },
                });

                if (detail) statusChecklist = true;

                return {
                    ...item,
                    name: classifMap.get(item.id_classification) ?? null,
                    detail_checklist: detail ?? {
                        sn_part: null,
                        results: null,
                        inspector_sign: null,
                        fix_description: null,
                    },
                };
            })
        );

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
            status_checklist: statusChecklist,
            time_checklist: timeChecklist,
        });
    } catch (error) {
        return serverError(error);
    }
}
