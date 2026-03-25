import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idCustomer: string; type: string }> }) {
    try {
        const { idCustomer } = await context.params;
        const idCustomerNum = toPositiveInt(idCustomer);
        if (!idCustomerNum) return validationError({ idCustomer: ["idCustomer tidak valid"] });

        const rows = await prisma.tbl_po.findMany({
            where: { customer: idCustomerNum, deleted_at: null },
            select: { nama_gudang: true },
            distinct: ["nama_gudang"],
            orderBy: { nama_gudang: "asc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows.filter((r) => r.nama_gudang !== null)) });
    } catch (error) {
        return serverError(error);
    }
}
