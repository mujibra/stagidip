import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPoTableName, tableExists } from "@/lib/services/purchaseOrderTable";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const { idPo } = await context.params;
        const idPoNum = toPositiveInt(idPo);
        if (!idPoNum) return validationError({ idPo: ["idPo tidak valid"] });

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) return notFoundError("Detail mesin tidak ditemukan");

        const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(`SELECT * FROM ${tableName} ORDER BY id ASC`);

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
