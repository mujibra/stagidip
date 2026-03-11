import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
import {
    hasValidationErrors,
    mergeValidationBags,
    normalizeSnMesins,
    parseSnMesins,
    toDate,
    toNumber,
    validatePositiveId,
    WarehouseTransferBody,
} from "@/lib/http/warehouseTransferValidation";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [transfers, total] = await Promise.all([
            prisma.warehouse_transfer.findMany({
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.warehouse_transfer.count(),
        ]);

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

        const [purchaseOrders, masterPos, warehouses, pics, customers] = await Promise.all([
            poIds.length
                ? prisma.tbl_po.findMany({ where: { id: { in: poIds } } })
                : Promise.resolve([]),
            poIds.length
                ? prisma.tbl_po
                      .findMany({ where: { id: { in: poIds } }, select: { id: true, id_po_master: true } })
                      .then((rows) =>
                          Array.from(
                              new Set(rows.map((row) => row.id_po_master).filter((id): id is number => typeof id === "number"))
                          )
                      )
                      .then((masterIds) =>
                          masterIds.length ? prisma.mst_po.findMany({ where: { id: { in: masterIds } } }) : []
                      )
                : Promise.resolve([]),
            warehouseIds.length
                ? prisma.mst_gudang.findMany({ where: { id: { in: warehouseIds } } })
                : Promise.resolve([]),
            picIdsBigInt.length ? prisma.pic_mitra.findMany({ where: { id: { in: picIdsBigInt } } }) : Promise.resolve([]),
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
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
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

        const errors = mergeValidationBags(
            validatePositiveId(body.id_po, "id_po", "PO wajib dipilih"),
            validatePositiveId(body.jumlah, "jumlah", "Jumlah mesin wajib diisi"),
            validatePositiveId(body.to_warehouse, "to_warehouse", "Gudang tujuan wajib dipilih")
        );

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const purchaseOrder = await prisma.tbl_po.findUnique({ where: { id: idPo! } });
        if (!purchaseOrder) {
            return validationError({ id_po: ["Data PO tidak ditemukan"] });
        }

        if (jumlah! > purchaseOrder.jumlah) {
            return validationError({
                jumlah: ["Transfer jumlah mesin tidak boleh melebihi total mesin di gudang"],
            });
        }

        const created = await prisma.warehouse_transfer.create({
            data: {
                id_po: idPo!,
                id_customer: toNumber(body.id_customer) ?? 0,
                jumlah: jumlah!,
                sn_mesins: normalizeSnMesins(body.sn_mesins),
                from_warehouse: toNumber(body.from_warehouse) ?? 0,
                to_warehouse: toWarehouse!,
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
