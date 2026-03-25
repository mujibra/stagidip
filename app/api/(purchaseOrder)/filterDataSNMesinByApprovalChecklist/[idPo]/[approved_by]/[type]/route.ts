import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string; approved_by: string; type: string }> }) {
    try {
        const { idPo, approved_by, type } = await context.params;
        const idPoNum = toPositiveInt(idPo);
        if (!idPoNum) return validationError({ idPo: ["idPo tidak valid"] });

        const row = await prisma.tbl_po.findFirst({ where: { id: idPoNum, deleted_at: null }, select: { id: true, sn_mesins: true, status_mesin: true } });
        if (!row) return NextResponse.json({ success: true, totalDatas: 0, data: [] });

        const snList = (row.sn_mesins ?? "").split(",").map((v) => v.trim()).filter(Boolean);
        const filtered = snList.filter((sn) => (approved_by === "all" ? true : sn.includes(approved_by))).map((sn) => ({ sn_mesin: sn, type, status_mesin: row.status_mesin }));

        return NextResponse.json({ success: true, totalDatas: filtered.length, data: toJsonSafe(filtered) });
    } catch (error) {
        return serverError(error);
    }
}
