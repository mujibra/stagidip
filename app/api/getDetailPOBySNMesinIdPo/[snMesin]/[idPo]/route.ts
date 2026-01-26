import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function getSnColumnByModelName(name: string): string {
    switch (name) {
        case "ATM":
        case "ATMS":
        case "TTW":
            return "ATM_MESIN";
        case "CRM":
        case "CRMS":
            return "CRM_MESIN";
        case "TCR":
            return "TCR_MESIN";
        case "CS KIOS":
            return "CS_KIOS_MESIN";
        case "VBK":
            return "VBK_MESIN";
        default:
            return "NEW_MESIN";
    }
}

// Mirrors Laravel DeliveryRequestController@getDetailPOBySNMesinIdPo
export async function GET(_req: Request, ctx: { params: Promise<{ snMesin: string; idPo: string }> }) {
    try {
        const { snMesin, idPo } = await ctx.params;
        const poId = toInt(idPo);
        if (!poId) return validationError({ idPo: ["Invalid idPo"] });

        const po = await prisma.tbl_po.findFirst({ where: { id: poId } });
        if (!po) {
            return NextResponse.json({ success: true, snMesin, data: [], message: "PO Not Found" });
        }

        const model = po.model ? await prisma.models.findFirst({ where: { id: BigInt(po.model) } }) : null;
        const col = getSnColumnByModelName(model?.name ?? "");

        const tableName = `crt_${poId}`;
        const sqlCheck = `SELECT COUNT(*) as is_exists FROM ${tableName} WHERE ${col} = ?`;
        const checkRows = (await prisma.$queryRawUnsafe<{ is_exists: bigint }[]>(sqlCheck, snMesin)) ?? [];
        const isExists = checkRows[0] ? Number(checkRows[0].is_exists) : 0;

        if (isExists !== 1) {
            return NextResponse.json({
                success: true,
                snMesin,
                data: [],
                message: `Data with Serial Number Machine ${snMesin} is Not Found in PO ${po.no_po ?? ""}`,
            });
        }

        const customer = po.customer ? await prisma.mst_customer.findFirst({ where: { id: po.customer } }) : null;
        const mesin = await prisma.mst_mesin.findFirst({ where: { id: po.id_type_mesin } });
        const gudang = po.nama_gudang ? await prisma.mst_gudang.findFirst({ where: { id: po.nama_gudang } }) : null;

        const detail: Record<string, unknown> = {
            ...toJsonSafe(po),
            name: model?.name ?? null,
            customer: toJsonSafe(customer),
            type: toJsonSafe(model),
            mesin: toJsonSafe(mesin),
            gudang: toJsonSafe(gudang),
        };

        return NextResponse.json({ success: true, snMesin, data: detail });
    } catch (e) {
        return serverError(e);
    }
}
