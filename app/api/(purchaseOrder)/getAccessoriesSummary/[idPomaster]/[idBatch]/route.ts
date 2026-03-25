import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPomaster: string; idBatch: string }> }) {
    try {
        const { idPomaster, idBatch } = await context.params;
        const idPoMasterNum = toPositiveInt(idPomaster);
        const idBatchNum = toPositiveInt(idBatch);
        if (!idPoMasterNum || !idBatchNum) return validationError({ id: ["idPomaster atau idBatch tidak valid"] });

        const rows = await prisma.tbl_po.findMany({
            where: { id_po_master: idPoMasterNum, batch: idBatchNum, part_number: { not: null }, deleted_at: null },
            select: { id: true, no_po: true, part_number: true, brand: true },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
