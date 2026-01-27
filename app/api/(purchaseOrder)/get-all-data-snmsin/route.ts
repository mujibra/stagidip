import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const pos = await prisma.tbl_po.findMany({
            select: { id: true, id_type_mesin: true },
        });

        const data: unknown[] = [];

        for (const po of pos) {
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
            if (!columnName) continue;

            const sql = `select ${columnName} as sn_mesin, id from crt_${po.id} where ${columnName} is not null`;
            const rows =
                (await prisma.$queryRawUnsafe<{ sn_mesin: string | null; id: number }[]>(
                    sql
                )) ?? [];

            if (rows.length > 0) {
                data.push(rows);
            }
        }

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
