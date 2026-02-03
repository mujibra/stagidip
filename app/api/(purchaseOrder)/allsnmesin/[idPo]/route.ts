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
    context: { params: Promise<{ idPo: string }> }
) {
    try {
        const idPo = toNumber((await context.params).idPo);
        if (!idPo) {
            return NextResponse.json(
                { success: false, data: [] },
                { status: 400 }
            );
        }

        const po = await prisma.tbl_po.findFirst({
            where: { id: idPo },
        });

        if (!po) {
            return NextResponse.json(
                { success: false, data: [] },
                { status: 400 }
            );
        }

        const masterPart = await prisma.mst_part_number.findFirst({
            where: {
                id_mesin: po.id_type_mesin,
                part_column: {
                    in: [
                        "ATM_MESIN",
                        "CRM_MESIN",
                        "TCR_MESIN",
                        "CS_KIOS_MESIN",
                        "VBK_MESIN",
                        "NEW_MESIN",
                    ],
                },
            },
        });

        const columnName = masterPart?.part_column;
        if (!columnName) {
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                data: [],
            });
        }

        const sql = `select ${columnName} as sn_mesin, id from crt_${idPo}`;
        const rows =
            (await prisma.$queryRawUnsafe<{ sn_mesin: string | null; id: number }[]>(
                sql
            )) ?? [];

        const snById = new Map(rows.map((row) => [row.id, row.sn_mesin]));
        const data = [] as Array<{ id: number; sn_mesin: string | null }>;

        for (let i = 1; i <= (po.jumlah ?? 0); i += 1) {
            data.push({
                id: i,
                sn_mesin: snById.get(i) ?? null,
            });
        }

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
