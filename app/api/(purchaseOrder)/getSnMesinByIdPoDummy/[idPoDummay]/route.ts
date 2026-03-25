import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPoDummay: string }> }) {
    try {
        const { idPoDummay } = await context.params;
        const idPoNum = toPositiveInt(idPoDummay);
        if (!idPoNum) return validationError({ idPoDummay: ["idPoDummay tidak valid"] });

        const po = await prisma.tbl_po.findFirst({ where: { id: idPoNum, deleted_at: null }, select: { sn_mesins: true } });
        const sns = (po?.sn_mesins ?? "").split(",").map((v) => v.trim()).filter(Boolean);

        return NextResponse.json({ success: true, totalDatas: sns.length, data: sns });
    } catch (error) {
        return serverError(error);
    }
}
