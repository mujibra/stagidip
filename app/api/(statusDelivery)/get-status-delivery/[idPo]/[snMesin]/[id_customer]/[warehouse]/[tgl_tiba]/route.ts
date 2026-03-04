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

async function enrich(records: Array<Record<string, unknown>>) {
    const poIds = Array.from(new Set(records.map((row) => row.id_po).filter((id): id is number => Boolean(id))));
    const purchaseOrders = poIds.length ? await prisma.tbl_po.findMany({ where: { id: { in: poIds } } }) : [];
    const poMasterIds = Array.from(
        new Set(purchaseOrders.map((po) => po.id_po_master).filter((id): id is number => Boolean(id)))
    );
    const [masterPos, customers, gudangs] = await Promise.all([
        poMasterIds.length ? prisma.mst_po.findMany({ where: { id: { in: poMasterIds } } }) : [],
        purchaseOrders.length
            ? prisma.mst_customer.findMany({
                  where: { id: { in: purchaseOrders.map((po) => po.customer).filter((id): id is number => Boolean(id)) } },
              })
            : [],
        purchaseOrders.length
            ? prisma.mst_gudang.findMany({
                  where: { id: { in: purchaseOrders.map((po) => po.nama_gudang).filter((id): id is number => Boolean(id)) } },
              })
            : [],
    ]);

    const poMap = new Map(purchaseOrders.map((po) => [po.id, po]));
    const masterPoMap = new Map(masterPos.map((po) => [po.id, po]));
    const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
    const gudangMap = new Map(gudangs.map((gudang) => [gudang.id, gudang]));

    const detailRecords = records.length
        ? await prisma.transaksi_status_deliv_detail.findMany({
              where: { id_header: { in: records.map((row) => row.id as number) } },
          })
        : [];

    const detailByHeader = new Map<number, typeof detailRecords>();
    detailRecords.forEach((detail) => {
        const list = detailByHeader.get(detail.id_header) ?? [];
        list.push(detail);
        detailByHeader.set(detail.id_header, list);
    });

    return records.map((record) => {
        const po = poMap.get(record.id_po as number);
        const details = detailByHeader.get(record.id as number) ?? [];
        const tglKeluar = details.find((detail) => detail.status === "LOADING")?.updated_at ?? null;
        const tglTiba = details.find((detail) => detail.status === "TIBA")?.updated_at ?? null;

        const detailPo = po
            ? {
                  ...po,
                  po_master: po.id_po_master ? masterPoMap.get(po.id_po_master) ?? null : null,
                  customer: po.customer ? customerMap.get(po.customer) ?? null : null,
                  gudang: po.nama_gudang ? gudangMap.get(po.nama_gudang) ?? null : null,
              }
            : null;

        return {
            ...record,
            detailPo,
            tgl_keluar: tglKeluar,
            tgl_received: tglTiba,
        };
    });
}

export async function GET(
    _req: NextRequest,
    ctx: { params: Promise<{ idPo: string; snMesin: string; id_customer: string; warehouse: string; tgl_tiba: string }> }
) {
    try {
        const params = await ctx.params;

        const idPoParsed = parseNullablePositiveIntParam(params.idPo, "idPo");
        const idCustomerParsed = parseNullablePositiveIntParam(params.id_customer, "id_customer");
        const warehouseParsed = parseNullablePositiveIntParam(params.warehouse, "warehouse");
        const tglTibaParsed = parseNullableDateRangeParam(params.tgl_tiba, "tgl_tiba");

        const errors: ValidationBag = mergeValidationBags(
            idPoParsed.errors,
            idCustomerParsed.errors,
            warehouseParsed.errors,
            tglTibaParsed.errors
        );

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = idPoParsed.value;
        const snMesin = parseNullableParam(params.snMesin);
        const idCustomer = idCustomerParsed.value;
        const warehouse = warehouseParsed.value;

        let allowedPoIds: number[] | null = null;
        if (idCustomer || warehouse) {
            const poWhere: Record<string, unknown> = {};
            if (idCustomer) poWhere.customer = idCustomer;
            if (warehouse) poWhere.nama_gudang = warehouse;
            const pos = await prisma.tbl_po.findMany({ where: poWhere });
            allowedPoIds = pos.map((po) => po.id);
        }

        const where: Record<string, unknown> = {
            obsolete: null,
        };

        if (idPo) {
            where.id_po = idPo;
        }
        if (snMesin) {
            where.sn_mesin = snMesin;
        }
        if (allowedPoIds) {
            where.id_po = { in: allowedPoIds };
        }
        if (tglTibaParsed.range) {
            where.tgl_perkiraan_tiba = { gte: tglTibaParsed.range.start, lt: tglTibaParsed.range.end };
        }

        const records = await prisma.transaksi_status_delivery.findMany({
            where,
            orderBy: { id: "desc" },
        });

        const data = await enrich(records as Array<Record<string, unknown>>);

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
