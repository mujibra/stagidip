import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, mergeValidationBags, ValidationBag } from "@/lib/http/validation";
import {
    parseNullableDateRangeParam,
    parseNullableParam,
    parseNullablePositiveIntParam,
} from "@/lib/http/filterParamValidation";

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

export async function GET(_req: NextRequest, ctx: { params: Promise<{ idPo: string; snMesin: string; from_warehouse: string; tgl_keluar: string }> }) {
    try {
        const params = await ctx.params;

        const idPoParsed = parseNullablePositiveIntParam(params.idPo, "idPo");
        const fromWarehouseParsed = parseNullablePositiveIntParam(params.from_warehouse, "from_warehouse");
        const tglKeluarParsed = parseNullableDateRangeParam(params.tgl_keluar, "tgl_keluar");

        const errors: ValidationBag = mergeValidationBags(
            idPoParsed.errors,
            fromWarehouseParsed.errors,
            tglKeluarParsed.errors
        );

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = idPoParsed.value;
        const snMesin = parseNullableParam(params.snMesin);
        const fromWarehouse = fromWarehouseParsed.value;

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
        if (tglKeluarParsed.range) {
            where.tgl_keluar = { gte: tglKeluarParsed.range.start, lt: tglKeluarParsed.range.end };
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
