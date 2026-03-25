import { NextRequest, NextResponse } from "next/server";

import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { getPoTableName, getTableColumns, tableExists } from "@/lib/services/purchaseOrderTable";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const { idPo } = await context.params;
        const idPoNum = toPositiveInt(idPo);
        if (!idPoNum) return validationError({ idPo: ["idPo tidak valid"] });

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) return notFoundError("Template staging tidak ditemukan");

        const columns = await getTableColumns(tableName);
        return NextResponse.json({ success: true, totalDatas: columns.length, data: columns.map((c) => c.COLUMN_NAME) });
    } catch (error) {
        return serverError(error);
    }
}
