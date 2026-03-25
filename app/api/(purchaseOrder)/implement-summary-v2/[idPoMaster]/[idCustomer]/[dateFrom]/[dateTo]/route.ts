import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { isIsoDate, toDateRange, toPositiveInt } from "@/lib/services/purchaseOrderInsights";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPoMaster: string; idCustomer: string; dateFrom: string; dateTo: string }> }) {
    try {
        const { idPoMaster, idCustomer, dateFrom, dateTo } = await context.params;
        const idPoMasterNum = toPositiveInt(idPoMaster);
        const idCustomerNum = toPositiveInt(idCustomer);

        if (!idPoMasterNum || !idCustomerNum) return validationError({ id: ["Parameter id tidak valid"] });
        if (!isIsoDate(dateFrom) || !isIsoDate(dateTo)) return validationError({ date: ["Format tanggal harus YYYY-MM-DD"] });

        const rows = await prisma.tbl_po.groupBy({
            by: ["nama_gudang", "status_mesin"],
            where: {
                id_po_master: idPoMasterNum,
                customer: idCustomerNum,
                created_at: toDateRange(dateFrom, dateTo),
                deleted_at: null,
            },
            _count: { id: true },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
