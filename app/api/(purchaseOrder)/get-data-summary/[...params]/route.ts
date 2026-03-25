import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ params: string[] }> }) {
    try {
        const { params } = await context.params;

        if (params.length !== 2 && params.length !== 5) {
            return validationError({ params: ["Jumlah parameter harus 2 atau 5"] });
        }

        if (params.length === 2) {
            const [idPoMaster, type] = params;
            const idPoMasterNum = toPositiveInt(idPoMaster);
            if (!idPoMasterNum) return validationError({ idPoMaster: ["idPoMaster tidak valid"] });

            const rows = await prisma.tbl_po.groupBy({
                by: ["customer", "nama_gudang", "model"],
                where: { id_po_master: idPoMasterNum, status_mesin: type, deleted_at: null },
                _count: { id: true },
            });

            return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
        }

        const [idCustomer, idWarehouse, idModel, idPoMaster, type] = params;
        const idCustomerNum = toPositiveInt(idCustomer);
        const idWarehouseNum = toPositiveInt(idWarehouse);
        const idModelNum = toPositiveInt(idModel);
        const idPoMasterNum = toPositiveInt(idPoMaster);

        if (!idCustomerNum || !idWarehouseNum || !idModelNum || !idPoMasterNum) {
            return validationError({ params: ["Salah satu parameter id tidak valid"] });
        }

        const rows = await prisma.tbl_po.findMany({
            where: {
                customer: idCustomerNum,
                nama_gudang: idWarehouseNum,
                model: idModelNum,
                id_po_master: idPoMasterNum,
                status_mesin: type,
                deleted_at: null,
            },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
