import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

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
            return NextResponse.json({
                success: true,
                data_status: { data_ok: 0, data_ng: 0, data_na: 0 },
            });
        }

        const po = await prisma.tbl_po.findFirst({ where: { id: idPo } });
        const mesin = po?.id_type_mesin
            ? await prisma.mst_mesin.findFirst({ where: { id: po.id_type_mesin } })
            : null;

        const isMv400 = mesin?.type === "MV-400";

        if (isMv400) {
            const [countOk, countNg, countNa] = await Promise.all([
                prisma.transaksi_checklist_stag_mv400.count({
                    where: { id_po: idPo, no_mesin: idMesin, results: "OK" },
                }),
                prisma.transaksi_checklist_stag_mv400.count({
                    where: { id_po: idPo, no_mesin: idMesin, results: "NG" },
                }),
                prisma.transaksi_checklist_stag_mv400.count({
                    where: { id_po: idPo, no_mesin: idMesin, results: "NA" },
                }),
            ]);

            return NextResponse.json({
                success: true,
                data_status: {
                    data_ok: countOk,
                    data_ng: countNg,
                    data_na: countNa,
                },
            });
        }

        const [countOk, countNg, countNa] = await Promise.all([
            prisma.transaksi_checklist_staging.count({
                where: { id_po: idPo, no_mesin: idMesin, results: "OK" },
            }),
            prisma.transaksi_checklist_staging.count({
                where: { id_po: idPo, no_mesin: idMesin, results: "NG" },
            }),
            prisma.transaksi_checklist_staging.count({
                where: { id_po: idPo, no_mesin: idMesin, results: "NA" },
            }),
        ]);

        return NextResponse.json({
            success: true,
            data_status: {
                data_ok: countOk,
                data_ng: countNg,
                data_na: countNa,
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
