import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getMachineColumns, getPoTableName, getTableColumns, tableExists, toPositiveInt } from "@/lib/services/purchaseOrderTable";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const { idPo } = await context.params;
        const idPoNum = toPositiveInt(idPo);

        if (!idPoNum) {
            return validationError({ idPo: ["idPo tidak valid"] });
        }

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) {
            return notFoundError("Table purchase order tidak ditemukan");
        }

        const columns = (await getTableColumns(tableName)).map((item) => item.COLUMN_NAME);
        const machineColumns = getMachineColumns(columns);
        if (!machineColumns.length) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        const selectCols = machineColumns.join(", ");
        const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
            `SELECT id, ${selectCols} FROM ${tableName} ORDER BY id ASC`,
        );

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
