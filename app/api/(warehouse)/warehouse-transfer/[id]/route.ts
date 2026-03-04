import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
import {
    hasValidationErrors,
    mergeValidationBags,
    normalizeSnMesinsOptional,
    parseSnMesins,
    toDate,
    toNumber,
    validatePositiveId,
    WarehouseTransferBody,
} from "@/lib/http/warehouseTransferValidation";
import { isPrismaNotFoundError } from "@/lib/http/validation";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const rowPerPageParam = (await ctx.params).id;
        const rowPerPageErrors = validatePositiveId(rowPerPageParam, "rowPerPage", "Row per page wajib diisi");

        if (hasValidationErrors(rowPerPageErrors)) {
            return validationError(rowPerPageErrors);
        }

        const rowPerPage = Number(rowPerPageParam);
        const { skip, take } = getPagination(req.nextUrl.searchParams, { perPageOverride: rowPerPage });

        const transfers = await prisma.warehouse_transfer.findMany({
            orderBy: { id: "desc" },
            skip,
            take,
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
        const picIdsBigInt = picIds.map((id) => BigInt(id));

        const [purchaseOrders, warehouses, pics, customers] = await Promise.all([
            poIds.length ? prisma.tbl_po.findMany({ where: { id: { in: poIds } } }) : Promise.resolve([]),
            warehouseIds.length
                ? prisma.mst_gudang.findMany({ where: { id: { in: warehouseIds } } })
                : Promise.resolve([]),
            picIdsBigInt.length ? prisma.pic_mitra.findMany({ where: { id: { in: picIdsBigInt } } }) : Promise.resolve([]),
            customerIds.length
                ? prisma.mst_customer.findMany({ where: { id: { in: customerIds } } })
                : Promise.resolve([]),
        ]);

        const poMap = new Map(purchaseOrders.map((po) => [po.id, po]));
        const warehouseMap = new Map(warehouses.map((wh) => [wh.id, wh]));
        const picMap = new Map(pics.map((pic) => [Number(pic.id), pic]));
        const customerMap = new Map(customers.map((cust) => [cust.id, cust]));

        const data = transfers.map((transfer) => ({
            ...transfer,
            purchaseOrder: transfer.id_po ? poMap.get(transfer.id_po) ?? null : null,
            from_warehouse: transfer.from_warehouse ? warehouseMap.get(transfer.from_warehouse) ?? null : null,
            to_warehouse: transfer.to_warehouse ? warehouseMap.get(transfer.to_warehouse) ?? null : null,
            pic: transfer.pic ? picMap.get(Number(transfer.pic)) ?? null : null,
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

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idParam = (await ctx.params).id;
        const body = await parseBody<WarehouseTransferBody>(req);

        const errors = mergeValidationBags(validatePositiveId(idParam, "id", "ID transfer tidak valid"));
        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const id = Number(idParam);
        const data: Record<string, unknown> = {
            id_po: toNumber(body.id_po) ?? undefined,
            id_customer: toNumber(body.id_customer) ?? undefined,
            jumlah: toNumber(body.jumlah) ?? undefined,
            from_warehouse: toNumber(body.from_warehouse) ?? undefined,
            to_warehouse: toNumber(body.to_warehouse) ?? undefined,
            tgl_keluar: toDate(body.tgl_keluar) ?? undefined,
            tgl_masuk: toDate(body.tgl_masuk) ?? undefined,
            tgl_staging: toDate(body.tgl_staging) ?? undefined,
            pic: toNumber(body.pic) ?? undefined,
        };

        const snMesins = normalizeSnMesinsOptional(body.sn_mesins);
        if (snMesins !== undefined) {
            data.sn_mesins = snMesins;
        }

        const updated = await prisma.warehouse_transfer.update({
            where: { id },
            data,
        });

        return NextResponse.json({
            success: true,
            message: "Warehouse Transfer updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json(
                { success: false, type: "NOT_FOUND", message: "Data transfer antar gudang tidak ditemukan" },
                { status: 404 }
            );
        }
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const idParam = (await ctx.params).id;
        const errors = validatePositiveId(idParam, "id", "ID transfer tidak valid");

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const id = Number(idParam);
        const deleted = await prisma.warehouse_transfer.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Data Transfer Antar Gudang berhasil dihapus",
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json(
                { success: false, type: "NOT_FOUND", message: "Data transfer antar gudang tidak ditemukan" },
                { status: 404 }
            );
        }
        return serverError(error);
    }
}
