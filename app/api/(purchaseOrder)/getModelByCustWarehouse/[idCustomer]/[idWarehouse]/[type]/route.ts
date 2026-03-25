import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idCustomer: string; idWarehouse: string; type: string }> }) {
    try {
        const { idCustomer, idWarehouse } = await context.params;
        const idCustomerNum = toPositiveInt(idCustomer);
        const idWarehouseNum = toPositiveInt(idWarehouse);
        if (!idCustomerNum || !idWarehouseNum) return validationError({ id: ["idCustomer atau idWarehouse tidak valid"] });

        const rows = await prisma.tbl_po.findMany({
            where: { customer: idCustomerNum, nama_gudang: idWarehouseNum, deleted_at: null },
            select: { model: true },
            distinct: ["model"],
            orderBy: { model: "asc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows.filter((r) => r.model !== null)) });
    } catch (error) {
        return serverError(error);
    }
}
