import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

function formatDateSearch(value: string) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    const year = parsed.getFullYear();
    return `${year}-${month}-${day}`;
}

async function enrichStatusDeliveries(records: Array<Record<string, unknown>>) {
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

export async function GET(req: NextRequest, ctx: { params: Promise<{ rowPerPage: string; user_login: string }> }) {
    try {
        const rowPerPage = Number((await ctx.params).rowPerPage);
        const searchTermRaw = req.nextUrl.searchParams.get("dataSearch");
        const searchTerm = searchTermRaw ? formatDateSearch(searchTermRaw) : null;

        const user = await prisma.users.findUnique({ where: { id: BigInt((await ctx.params).user_login) } });
        const isGuest = user?.roles === "GUEST_BANK";

        let allowedPoIds: number[] | null = null;
        if (isGuest && user?.id_customer) {
            const pos = await prisma.tbl_po.findMany({ where: { customer: user.id_customer } });
            allowedPoIds = pos.map((po) => po.id);
        }

        const { skip, take } = getPagination(req.nextUrl.searchParams, { perPageOverride: rowPerPage });

        const records = await prisma.transaksi_status_delivery.findMany({
            where: {
                ...(allowedPoIds ? { id_po: { in: allowedPoIds } } : {}),
            },
            orderBy: { id: "desc" },
            ...(searchTerm
                ? {}
                : {
                      skip,
                      take,
                  }),
        });

        let data = await enrichStatusDeliveries(records as Array<Record<string, unknown>>);

        if (searchTerm) {
            const termLower = searchTerm.toLowerCase();
            data = data.filter((row) => {
                const sn = String(row.detailPo?.sn_mesins ?? "").toLowerCase();
                const noPo = String(row.detailPo?.no_po ?? "").toLowerCase();
                const updatedAt = (row as { tgl_keluar?: Date | null }).tgl_keluar
                    ? String((row as { tgl_keluar?: Date | null }).tgl_keluar).toLowerCase()
                    : "";
                const receivedAt = (row as { tgl_received?: Date | null }).tgl_received
                    ? String((row as { tgl_received?: Date | null }).tgl_received).toLowerCase()
                    : "";

                return sn.includes(termLower) || noPo.includes(termLower) || updatedAt.includes(termLower) || receivedAt.includes(termLower);
            });

            return NextResponse.json({
                success: true,
                totalDatas: data.length,
                data: {
                    data: toJsonSafe(data),
                },
            });
        }

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
