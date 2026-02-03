import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function parseSnMesins(value: string | null): string[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function parseDateRange(dateValue: string) {
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return null;
    const start = new Date(parsed);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ idPo: string; snMesin: string; from_warehouse: string; tgl_keluar: string }> }) {
    try {
        const idPo = (await ctx.params).idPo !== "null" ? Number((await ctx.params).idPo) : null;
        const snMesin = (await ctx.params).snMesin !== "null" ? (await ctx.params).snMesin : null;
        const fromWarehouse = (await ctx.params).from_warehouse !== "null" ? Number((await ctx.params).from_warehouse) : null;
        const tglKeluarValue = (await ctx.params).tgl_keluar !== "null" ? (await ctx.params).tgl_keluar : null;

        const where: Record<string, unknown> = {};

        if (idPo) {
            where.id_po = idPo;
        }
        if (snMesin) {
            where.sn_mesins = { contains: snMesin };
        }
        if (fromWarehouse) {
            where.from_warehouse = fromWarehouse;
        }
        if (tglKeluarValue) {
            const range = parseDateRange(tglKeluarValue);
            if (range) {
                where.tgl_keluar = { gte: range.start, lt: range.end };
            }
        }

        const transfers = await prisma.warehouse_transfer.findMany({
            where,
            orderBy: { id: "desc" },
        });

        const poIds = Array.from(new Set(transfers.map((item) => item.id_po).filter((id): id is number => typeof id === "number")));
        const customerIds = Array.from(
            new Set(transfers.map((item) => item.id_customer).filter((id): id is number => typeof id === "number"))
        );
        const warehouseIds = Array.from(
            new Set(
                transfers
                    .flatMap((item) => [item.from_warehouse, item.to_warehouse])
                    .filter((id): id is number => typeof id === "number")
            )
        );
        const picIds = Array.from(new Set(transfers.map((item) => item.pic).filter((id): id is number => typeof id === "number")));

        const [purchaseOrders, warehouses, pics, customers] = await Promise.all([
            poIds.length ? prisma.tbl_po.findMany({ where: { id: { in: poIds } } }) : Promise.resolve([]),
            warehouseIds.length
                ? prisma.mst_gudang.findMany({ where: { id: { in: warehouseIds } } })
                : Promise.resolve([]),
            picIds.length ? prisma.pic_mover.findMany({ where: { id: { in: picIds } } }) : Promise.resolve([]),
            customerIds.length
                ? prisma.mst_customer.findMany({ where: { id: { in: customerIds } } })
                : Promise.resolve([]),
        ]);

        const poMap = new Map(purchaseOrders.map((po) => [po.id, po]));
        const warehouseMap = new Map(warehouses.map((wh) => [wh.id, wh]));
        const picMap = new Map(pics.map((pic) => [pic.id, pic]));
        const customerMap = new Map(customers.map((cust) => [cust.id, cust]));

        const data = transfers.map((transfer) => ({
            ...transfer,
            purchaseOrder: transfer.id_po ? poMap.get(transfer.id_po) ?? null : null,
            pic: transfer.pic ? picMap.get(transfer.pic) ?? null : null,
            from_warehouse: transfer.from_warehouse ? warehouseMap.get(transfer.from_warehouse) ?? null : null,
            to_warehouse: transfer.to_warehouse ? warehouseMap.get(transfer.to_warehouse) ?? null : null,
            customer: transfer.id_customer ? customerMap.get(transfer.id_customer) ?? null : null,
            sn_mesins: parseSnMesins(transfer.sn_mesins),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
