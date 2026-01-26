import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

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

// Mirrors Laravel DeliveryRequestController@getListSN
export async function GET() {
    try {
        // Equivalent to: PurchaseOrder::select(['mdl.name', 'tbl_po.*'])->join('models as mdl'...)
        const dataPo = await prisma.tbl_po.findMany({
            where: { deleted_at: null },
            orderBy: { id: "desc" },
        });

        if (dataPo.length === 0) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        // Fetch all models used by the POs
        const modelIds = Array.from(new Set(dataPo.map((po) => po.model).filter((v): v is number => typeof v === "number")));
        const models = modelIds.length
            ? await prisma.models.findMany({ where: { id: { in: modelIds.map((id) => BigInt(id)) } } })
            : [];
        const modelById = new Map(models.map((m) => [Number(m.id), m]));

        const out: Array<{ id_po: number; no_po: string | null; sn_mesin: string; no_mesin: number }> = [];

        for (const po of dataPo) {
            const modelName = po.model ? modelById.get(po.model)?.name ?? "" : "";
            const col = getSnColumnByModelName(modelName);

            // crt_{id_po} tables are dynamic. Laravel runs raw SQL, so we do too.
            const tableName = `crt_${po.id}`;
            const sql = `SELECT id, ${col} as sn FROM ${tableName} WHERE ${col} IS NOT NULL`;

            // Note: $queryRawUnsafe because table/column are dynamic.
            // These are derived from controlled mappings, not user input.
            const rows = (await prisma.$queryRawUnsafe<{ id: number; sn: string }[]>(sql)) ?? [];

            for (const r of rows) {
                out.push({
                    id_po: po.id,
                    no_po: po.no_po ?? null,
                    sn_mesin: r.sn,
                    no_mesin: r.id,
                });
            }
        }

        return NextResponse.json({ success: true, totalDatas: out.length, data: toJsonSafe(out) });
    } catch (e) {
        return serverError(e);
    }
}
