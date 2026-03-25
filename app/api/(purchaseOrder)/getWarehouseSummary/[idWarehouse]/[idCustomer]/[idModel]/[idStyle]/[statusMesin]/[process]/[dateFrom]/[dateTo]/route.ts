import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { isIsoDate, toDateRange, toPositiveInt } from "@/lib/services/purchaseOrderInsights";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ idWarehouse: string; idCustomer: string; idModel: string; idStyle: string; statusMesin: string; process: string; dateFrom: string; dateTo: string }> },
) {
    try {
        const { idWarehouse, idCustomer, idModel, idStyle, statusMesin, process, dateFrom, dateTo } = await context.params;
        const idWarehouseNum = toPositiveInt(idWarehouse);
        const idCustomerNum = toPositiveInt(idCustomer);
        const idModelNum = toPositiveInt(idModel);

        if (!idWarehouseNum || !idCustomerNum || !idModelNum) return validationError({ id: ["Parameter id tidak valid"] });
        if (!isIsoDate(dateFrom) || !isIsoDate(dateTo)) return validationError({ date: ["Format tanggal harus YYYY-MM-DD"] });

        const rows = await prisma.tbl_po.findMany({
            where: {
                nama_gudang: idWarehouseNum,
                customer: idCustomerNum,
                model: idModelNum,
                style: idStyle === "all" ? undefined : idStyle,
                status_mesin: statusMesin === "all" ? undefined : statusMesin,
                brand: process === "all" ? undefined : process,
                created_at: toDateRange(dateFrom, dateTo),
                deleted_at: null,
            },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
