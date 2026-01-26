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

function normalizeSnMesins(value: unknown): string {
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

export async function GET() {
    try {
        const transfers = await prisma.warehouse_transfer.findMany({
            orderBy: { id: "desc" },
        });

        const poIds = Array.from(new Set(transfers.map((item) => item.id_po).filter((id) => id)));
        const customerIds = Array.from(new Set(transfers.map((item) => item.id_customer).filter((id) => id)));
        const warehouseIds = Array.from(
            new Set(transfers.flatMap((item) => [item.from_warehouse, item.to_warehouse]).filter((id) => id))
        );
        const picIds = Array.from(new Set(transfers.map((item) => item.pic).filter((id) => id)));

        const [purchaseOrders, masterPos, warehouses, pics, customers] = await Promise.all([
            poIds.length
                ? prisma.tbl_po.findMany({ where: { id: { in: poIds } } })
                : Promise.resolve([]),
            poIds.length
                ? prisma.tbl_po
                      .findMany({ where: { id: { in: poIds } }, select: { id: true, id_po_master: true } })
                      .then((rows) => Array.from(new Set(rows.map((row) => row.id_po_master).filter((id) => id))))
                      .then((masterIds) =>
                          masterIds.length ? prisma.mst_po.findMany({ where: { id: { in: masterIds } } }) : []
                      )
                : Promise.resolve([]),
            warehouseIds.length
                ? prisma.mst_gudang.findMany({ where: { id: { in: warehouseIds } } })
                : Promise.resolve([]),
            picIds.length ? prisma.pic_mitra.findMany({ where: { id: { in: picIds } } }) : Promise.resolve([]),
            customerIds.length
                ? prisma.mst_customer.findMany({ where: { id: { in: customerIds } } })
                : Promise.resolve([]),
        ]);

        const poMap = new Map(purchaseOrders.map((po) => [po.id, po]));
        const masterPoMap = new Map(masterPos.map((po) => [po.id, po]));
        const warehouseMap = new Map(warehouses.map((wh) => [wh.id, wh]));
        const picMap = new Map(pics.map((pic) => [Number(pic.id), pic]));
        const customerMap = new Map(customers.map((cust) => [cust.id, cust]));

        const data = transfers.map((transfer) => {
            const purchaseOrder = poMap.get(transfer.id_po ?? 0) ?? null;
            const masterPo = purchaseOrder?.id_po_master ? masterPoMap.get(purchaseOrder.id_po_master) ?? null : null;
            return {
                ...transfer,
                purchaseOrder: purchaseOrder
                    ? {
                          ...purchaseOrder,
                          po_master: masterPo,
                      }
                    : null,
                from_warehouse: transfer.from_warehouse ? warehouseMap.get(transfer.from_warehouse) ?? null : null,
                to_warehouse: transfer.to_warehouse ? warehouseMap.get(transfer.to_warehouse) ?? null : null,
                pic: transfer.pic ? picMap.get(transfer.pic) ?? null : null,
                customer: transfer.id_customer ? customerMap.get(transfer.id_customer) ?? null : null,
                sn_mesins: parseSnMesins(transfer.sn_mesins),
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

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<WarehouseTransferBody>(req);
        const idPo = toNumber(body.id_po);
        const jumlah = toNumber(body.jumlah);
        const toWarehouse = toNumber(body.to_warehouse);

        if (!idPo || !jumlah || !toWarehouse) {
            return validationError({
                id_po: !idPo ? ["PO wajib dipilih"] : [],
                jumlah: !jumlah ? ["Jumlah mesin wajib diisi"] : [],
                to_warehouse: !toWarehouse ? ["Gudang tujuan wajib dipilih"] : [],
            });
        }

        const purchaseOrder = await prisma.tbl_po.findUnique({ where: { id: idPo } });
        if (!purchaseOrder) {
            return NextResponse.json({ success: false, message: "Data PO tidak ditemukan" }, { status: 400 });
        }

        if (jumlah > purchaseOrder.jumlah) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Transfer Jumlah Mesin tidak boleh melebihi dari total mesin di gudang",
                },
                { status: 400 }
            );
        }

        const created = await prisma.warehouse_transfer.create({
            data: {
                id_po: idPo,
                id_customer: toNumber(body.id_customer) ?? 0,
                jumlah,
                sn_mesins: normalizeSnMesins(body.sn_mesins),
                from_warehouse: toNumber(body.from_warehouse) ?? 0,
                to_warehouse: toWarehouse,
                tgl_keluar: toDate(body.tgl_keluar) ?? undefined,
                tgl_masuk: toDate(body.tgl_masuk) ?? undefined,
                tgl_staging: toDate(body.tgl_staging) ?? undefined,
                pic: toNumber(body.pic) ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Transfer Warehouse created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
