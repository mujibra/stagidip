import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idStatusPo: string }> }) {
    try {
        const { idStatusPo } = await context.params;
        const idStatusPoNum = toPositiveInt(idStatusPo);
        if (!idStatusPoNum) return validationError({ idStatusPo: ["idStatusPo tidak valid"] });

        const rows = await prisma.tbl_po.findMany({
            where: { id_status_po: idStatusPoNum, deleted_at: null },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (error) {
        return serverError(error);
    }
}
