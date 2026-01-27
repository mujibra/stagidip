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
    context: { params: { type: string; idPo: string; idMesin: string } }
) {
    try {
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);
        const type = context.params.type;

        if (!idPo || !idMesin) {
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                status: type,
            });
        }

        const total = await prisma.transaksi_checklist_staging.count({
            where: {
                id_po: idPo,
                no_mesin: idMesin,
                results: type,
            },
        });

        return NextResponse.json({
            success: true,
            totalDatas: total,
            status: type,
        });
    } catch (error) {
        return serverError(error);
    }
}
