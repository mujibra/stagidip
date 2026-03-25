import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idCustomer: string; idWarehouse: string; idModel: string; type: string }> }) {
    try {
        const { idCustomer, idWarehouse, idModel } = await context.params;
        const idCustomerNum = toPositiveInt(idCustomer);
        const idWarehouseNum = toPositiveInt(idWarehouse);
        const idModelNum = toPositiveInt(idModel);

        if (!idCustomerNum || !idWarehouseNum || !idModelNum) {
            return validationError({ id: ["idCustomer, idWarehouse, atau idModel tidak valid"] });
        }

        const rows = await prisma.tbl_po.findMany({
            where: {
                customer: idCustomerNum,
                nama_gudang: idWarehouseNum,
                model: idModelNum,
                deleted_at: null,
            },
            select: { id: true, no_po: true, id_po_master: true, batch: true },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
