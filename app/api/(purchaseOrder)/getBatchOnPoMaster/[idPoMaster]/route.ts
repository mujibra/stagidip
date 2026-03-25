import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toPositiveInt(value: string) {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 ? num : null;
}

export async function GET(_req: NextRequest, context: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const { idPoMaster } = await context.params;
        const idPoMasterNum = toPositiveInt(idPoMaster);
        if (!idPoMasterNum) {
            return validationError({ idPoMaster: ["idPoMaster tidak valid"] });
        }

        const rows = await prisma.tbl_po.findMany({
            where: { id_po_master: idPoMasterNum, deleted_at: null },
            select: { batch: true },
            distinct: ["batch"],
        });

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: toJsonSafe(rows.filter((row) => row.batch !== null).map((row) => row.batch)),
        });
    } catch (error) {
        return serverError(error);
    }
}
