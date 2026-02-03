import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toBigInt(value: string): bigint | null {
    const v = value.trim();
    if (!/^\d+$/.test(v)) return null;
    try {
        return BigInt(v);
    } catch {
        return null;
    }
}

function snMesinColumnByModelName(modelName: string | null | undefined): string {
    const name = (modelName ?? "").trim().toUpperCase();
    const map: Record<string, string> = {
        ATM: "ATM_MESIN",
        ATMS: "ATM_MESIN",
        TTW: "ATM_MESIN",
        CRM: "CRM_MESIN",
        CRMS: "CRM_MESIN",
        TCR: "TCR_MESIN",
        "CS KIOS": "CS_KIOS_MESIN",
        VBK: "VBK_MESIN",
    };
    return map[name] ?? "NEW_MESIN";
}

type TransferLatestRow = {
    id_po: number;
    to_warehouse: number | null;
    jml_mesin_tf: bigint | number | null;
};

type CountRow = { id_po: number; jml: bigint | number | null };

function toNumberSafe(v: bigint | number | null | undefined): number {
    if (typeof v === "bigint") return Number(v);
    return Number(v ?? 0);
}

export async function GET(_req: NextRequest, context: { params: Promise<{ user_login: string }> }) {
    try {
        const userId = toBigInt((await context.params).user_login);
        if (!userId) return NextResponse.json({ success: false, message: "Invalid user" }, { status: 400 });

        const user = await prisma.users.findFirst({
            where: { id: userId },
            select: { id: true, roles: true, id_customer: true },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const poWhere = user.roles === "GUEST_BANK" ? { deleted_at: null, customer: user.id_customer ?? undefined } : { deleted_at: null };

        const pos = await prisma.tbl_po.findMany({
            where: poWhere,
            orderBy: { id: "desc" },
        });

        if (pos.length === 0) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        // Batch-fetch relations (avoid N+1 hell)
        const mesinIds = Array.from(new Set(pos.map((p) => p.id_type_mesin).filter((v): v is number => typeof v === "number")));
        const gudangIds = Array.from(new Set(pos.map((p) => p.nama_gudang).filter((v): v is number => typeof v === "number")));
        const customerIds = Array.from(new Set(pos.map((p) => p.customer).filter((v): v is number => typeof v === "number")));
        const modelIds = Array.from(new Set(pos.map((p) => p.model).filter((v): v is number => typeof v === "number")));
        const modelIdsBigInt = modelIds.map((id) => BigInt(id));
        const picIds = Array.from(new Set(pos.map((p) => p.pic_staging).filter((v): v is number => typeof v === "number")));
        const picIdsBigInt = picIds.map((id) => BigInt(id));
        const batchIds = Array.from(new Set(pos.map((p) => p.batch).filter((v): v is number => typeof v === "number")));
        const poMasterIds = Array.from(new Set(pos.map((p) => p.id_po_master).filter((v): v is number => typeof v === "number")));
        const styleIds = Array.from(new Set(pos.map((p) => p.style).filter((v): v is string => typeof v === "string")));
        const statusPoIds = Array.from(new Set(pos.map((p) => p.id_status_po).filter((v): v is number => typeof v === "number")));
        const poIds = pos.map((p) => p.id);

        const [mesins, gudangs, customers, models, pics, batches, poMasters, styles, statusPos] = await Promise.all([
            mesinIds.length ? prisma.mst_mesin.findMany({ where: { id: { in: mesinIds } } }) : Promise.resolve([]),
            gudangIds.length ? prisma.mst_gudang.findMany({ where: { id: { in: gudangIds } } }) : Promise.resolve([]),
            customerIds.length ? prisma.mst_customer.findMany({ where: { id: { in: customerIds } } }) : Promise.resolve([]),
            modelIdsBigInt.length ? prisma.models.findMany({ where: { id: { in: modelIdsBigInt } } }) : Promise.resolve([]),
            picIdsBigInt.length ? prisma.pic_mitra.findMany({ where: { id: { in: picIdsBigInt } } }) : Promise.resolve([]),
            batchIds.length ? prisma.bacth_po.findMany({ where: { id: { in: batchIds.map((x) => BigInt(x)) } } }).catch(() => []) : Promise.resolve([]),
            poMasterIds.length ? prisma.mst_po.findMany({ where: { id: { in: poMasterIds } } }) : Promise.resolve([]),
            styleIds.length ? prisma.mst_style.findMany({ where: { id: { in: styleIds.map(Number) } } }) : Promise.resolve([]),
            statusPoIds.length ? prisma.mst_status_po.findMany({ where: { id: { in: statusPoIds } } }) : Promise.resolve([]),
        ]);

        const mesinMap = new Map(mesins.map((x) => [x.id, x]));
        const gudangMap = new Map(gudangs.map((x) => [x.id, x]));
        const customerMap = new Map(customers.map((x) => [x.id, x]));
        const modelMap = new Map(models.map((x) => [Number(x.id), x]));
        const picMap = new Map(pics.map((x) => [Number(x.id), x]));
        const batchMap = new Map(batches.map((x) => [Number(x.id), x]));
        const poMasterMap = new Map(poMasters.map((x) => [x.id, x]));
        const styleMap = new Map(styles.map((x) => [x.id, x]));
        const statusPoMap = new Map(statusPos.map((x) => [x.id, x]));

        // Latest transfer sums per PO (one query, not per-row)
        const latestTransfers = await prisma.$queryRawUnsafe<TransferLatestRow[]>(`
            SELECT wt.id_po, wt.to_warehouse, SUM(wt.jumlah) AS jml_mesin_tf
            FROM warehouse_transfer wt
            JOIN (
                SELECT id_po, MAX(created_at) AS max_created
                FROM warehouse_transfer
                GROUP BY id_po
            ) m ON m.id_po = wt.id_po AND m.max_created = wt.created_at
            WHERE wt.id_po IN (${poIds.join(",")})
            GROUP BY wt.id_po, wt.to_warehouse
        `);

        const latestTransferMap = new Map<number, TransferLatestRow[]>();
        for (const r of latestTransfers) {
            const arr = latestTransferMap.get(r.id_po) ?? [];
            arr.push(r);
            latestTransferMap.set(r.id_po, arr);
        }

        // Checklist counts (normal + mv400) + inspeksi counts
        const [checklistCounts, checklistMv400Counts, inspeksiCounts] = await Promise.all([
            prisma
                .$queryRawUnsafe<CountRow[]>(
                    `
                SELECT id_po, COUNT(DISTINCT no_mesin) AS jml
                FROM transaksi_checklist_staging
                WHERE id_po IN (${poIds.join(",")})
                GROUP BY id_po
            `,
                )
                .catch(() => []),
            prisma
                .$queryRawUnsafe<CountRow[]>(
                    `
                SELECT id_po, COUNT(DISTINCT no_mesin) AS jml
                FROM transaksi_checklist_stag_mv400
                WHERE id_po IN (${poIds.join(",")})
                GROUP BY id_po
            `,
                )
                .catch(() => []),
            prisma
                .$queryRawUnsafe<CountRow[]>(
                    `
                SELECT id_po, COUNT(DISTINCT no_mesin) AS jml
                FROM transaksi_inspeksi
                WHERE id_po IN (${poIds.join(",")})
                GROUP BY id_po
            `,
                )
                .catch(() => []),
        ]);

        const checklistMap = new Map(checklistCounts.map((r) => [r.id_po, toNumberSafe(r.jml)]));
        const checklistMv400Map = new Map(checklistMv400Counts.map((r) => [r.id_po, toNumberSafe(r.jml)]));
        const inspeksiMap = new Map(inspeksiCounts.map((r) => [r.id_po, toNumberSafe(r.jml)]));

        // stagingCount needs dynamic crt_{id} tables -> do per PO (can’t batch cleanly without dynamic SQL hell)
        const stagingCountMap = new Map<number, number>();
        for (const po of pos) {
            const model = po.model ? (modelMap.get(Number(po.model)) ?? null) : null;
            const col = snMesinColumnByModelName(model?.name ?? null);

            try {
                const rows = await prisma.$queryRawUnsafe<Array<{ jml: bigint | number }>>(`SELECT COUNT(*) AS jml FROM crt_${po.id} WHERE ${col} IS NOT NULL`);
                const v = rows[0]?.jml ?? 0;
                stagingCountMap.set(po.id, toNumberSafe(v));
            } catch {
                stagingCountMap.set(po.id, 0);
            }
        }

        const data = pos.map((po) => {
            const mesin = po.id_type_mesin ? (mesinMap.get(po.id_type_mesin) ?? null) : null;
            const model = po.model ? (modelMap.get(Number(po.model)) ?? null) : null;
            const machineType = (mesin?.type ?? "").trim();

            const transferRows = latestTransferMap.get(po.id) ?? [];
            // Laravel logic: if latest transfer destination equals current warehouse, transfer=0 else sum
            const total_transfer = transferRows.some((r) => r.to_warehouse === po.nama_gudang) ? 0 : transferRows.reduce((acc, r) => acc + toNumberSafe(r.jml_mesin_tf), 0);

            const jml_mesin_checklist = machineType === "MV-400" ? (checklistMv400Map.get(po.id) ?? 0) : (checklistMap.get(po.id) ?? 0);

            return {
                ...po,
                total_transfer,
                total_keluar: 0, // Laravel uses PurchaseOrderHistoryCopyFromDummy; not in prisma schema reliably -> keep 0 unless you confirm table exists.
                mesin,
                gudang: po.nama_gudang ? (gudangMap.get(po.nama_gudang) ?? null) : null,
                customer: po.customer ? (customerMap.get(po.customer) ?? null) : null,
                model,
                pic_staging: po.pic_staging ? (picMap.get(Number(po.pic_staging)) ?? null) : null,
                batch: po.batch ? (batchMap.get(po.batch) ?? null) : null,
                po_master: po.id_po_master ? (poMasterMap.get(po.id_po_master) ?? null) : null,
                style: po.style ? (styleMap.get(Number(po.style)) ?? null) : null,
                status_po_details: po.id_status_po ? (statusPoMap.get(po.id_status_po) ?? null) : null,
                copy_from_po: null, // can be filled if you confirm column + requirement
                sn_mesins: (() => {
                    try {
                        return po.sn_mesins ? JSON.parse(String(po.sn_mesins)) : [];
                    } catch {
                        return [];
                    }
                })(),
                jml_mesin_staging: stagingCountMap.get(po.id) ?? 0,
                jml_mesin_checklist,
                jml_mesin_preloading: inspeksiMap.get(po.id) ?? 0,
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
