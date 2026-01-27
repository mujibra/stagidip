import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type WarehouseTransferBody = {
    id_po?: string | number;
    id_customer?: string | number;
    jumlah?: string | number;
    sn_mesins?: string | string[];
    from_warehouse?: string | number;
    to_warehouse?: string | number;
    tgl_keluar?: string;
    tgl_masuk?: string;
    tgl_staging?: string;
    pic?: string | number;
};

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

function toDate(value: unknown): Date | null {
    if (!value) return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeSnMesins(value: unknown): string | undefined {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) {
        return JSON.stringify(value);
    }
    if (typeof value === "string") {
        return value;
    }
    if (value) {
        return JSON.stringify(value);
    }
    return "[]";
}

function parseSnMesins(value: string | null): string[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const rowPerPage = Number(ctx.params.id);
        const page = Number(req.nextUrl.searchParams.get("page") ?? "1");

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const transfers = await prisma.warehouse_transfer.findMany({
            orderBy: { id: "desc" },
            skip: (page - 1) * rowPerPage,
            take: rowPerPage,
        });

        const poIds = Array.from(new Set(transfers.map((item) => item.id_po).filter((id) => id)));
        const customerIds = Array.from(new Set(transfers.map((item) => item.id_customer).filter((id) => id)));
        const warehouseIds = Array.from(
            new Set(transfers.flatMap((item) => [item.from_warehouse, item.to_warehouse]).filter((id) => id))
        );
        const picIds = Array.from(new Set(transfers.map((item) => item.pic).filter((id) => id)));

        const [purchaseOrders, warehouses, pics, customers] = await Promise.all([
            poIds.length ? prisma.tbl_po.findMany({ where: { id: { in: poIds } } }) : Promise.resolve([]),
            warehouseIds.length
                ? prisma.mst_gudang.findMany({ where: { id: { in: warehouseIds } } })
                : Promise.resolve([]),
            picIds.length ? prisma.pic_mitra.findMany({ where: { id: { in: picIds } } }) : Promise.resolve([]),
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
            pic: transfer.pic ? picMap.get(transfer.pic) ?? null : null,
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

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<WarehouseTransferBody>(req);

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

        const snMesins = normalizeSnMesins(body.sn_mesins);
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
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const deleted = await prisma.warehouse_transfer.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Data Transfer Antar Gudang berhasil dihapus",
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
