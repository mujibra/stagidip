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
    context: { params: { idPo: string; idMesin: string } }
) {
    try {
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);

        if (!idPo || !idMesin) {
            return NextResponse.json({ success: true, data: [] });
        }

        const classif = await prisma.mst_classification.findMany({
            orderBy: { id: "asc" },
        });

        const data = await Promise.all(
            classif.map(async (item) => {
                const checklist = await prisma.mst_checklist_stag_mv400.findMany({
                    where: { id_classification: item.id },
                    orderBy: { id: "asc" },
                });

                const count = await prisma.transaksi_checklist_stag_mv400.count({
                    where: {
                        id_po: idPo,
                        no_mesin: idMesin,
                        id_classification: item.id,
                    },
                });

                return {
                    ...item,
                    checklist_staging: checklist,
                    staging_checklist: count > 0,
                };
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
