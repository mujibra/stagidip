import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idCustomer: string; idModel: string; idPoMaster: string }> }) {
    try {
        const { idCustomer, idModel, idPoMaster } = await context.params;
        const idCustomerNum = toPositiveInt(idCustomer);
        const idModelNum = toPositiveInt(idModel);
        const idPoMasterNum = toPositiveInt(idPoMaster);
        if (!idCustomerNum || !idModelNum || !idPoMasterNum) {
            return validationError({ id: ["idCustomer, idModel, atau idPoMaster tidak valid"] });
        }

        const rows = await prisma.tbl_po.groupBy({
            by: ["status_mesin"],
            where: { customer: idCustomerNum, model: idModelNum, id_po_master: idPoMasterNum, deleted_at: null },
            _count: { id: true },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
