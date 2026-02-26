import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterPoBody = {
    no_po_master?: string;
    tgl_po?: string;
    id_customer?: string;
    status_po?: string;
};

function toDate(value: unknown): Date | null {
    if (!value) return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}

function parseCustomerIds(values: Array<string | null | undefined>): number[] {
    return Array.from(
        new Set(
            values
                .map((id) => Number(id))
                .filter((id): id is number => Number.isInteger(id) && id > 0),
        ),
    );
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const idPoMaster = Number((await ctx.params).idPoMaster);

        const masterPos = await prisma.mst_po.findMany({
            where: { id: idPoMaster, deleted_at: null },
        });

        if (!masterPos.length) {
            return NextResponse.json({
                success: false,
                message: "Data tidak ditemukan",
                data: [],
            });
        }

        const customerIds = parseCustomerIds(masterPos.map((po) => po.id_customer));
        const customers = customerIds.length
            ? await prisma.mst_customer.findMany({ where: { id: { in: customerIds } } })
            : [];
        const customerMap = new Map(customers.map((c) => [String(c.id), c]));

        const data = masterPos.map((po) => ({
            ...po,
            customer: po.id_customer ? customerMap.get(po.id_customer) ?? null : null,
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

export async function PUT(req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const idPoMaster = Number((await ctx.params).idPoMaster);
        const body = await parseBody<MasterPoBody>(req);

        const no_po_master = (body.no_po_master ?? "").trim();
        const id_customer = (body.id_customer ?? "").trim();

        if (!no_po_master || !id_customer) {
            return validationError({
                no_po_master: !no_po_master ? ["Nomor PO tidak boleh kosong"] : [],
                id_customer: !id_customer ? ["Customer wajib dipilih"] : [],
            });
        }

        const masterPo = await prisma.mst_po.findUnique({ where: { id: idPoMaster } });
        if (!masterPo) {
            return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
        }

        const hasTransactions = await prisma.tbl_po.findFirst({
            where: { id_po_master: idPoMaster },
            select: { id: true },
        });

        if (hasTransactions && masterPo.no_po_master !== no_po_master) {
            return NextResponse.json(
                {
                    success: false,
                    message: `PO ${masterPo.no_po_master} Gagal di Edit, karena sudah terpakai di Transaksi Staging Registration`,
                },
                { status: 400 }
            );
        }

        try {
            const tglPo = toDate(body.tgl_po);

            await prisma.mst_po.update({
                where: { id: idPoMaster },
                data: {
                    no_po_master,
                    id_customer,
                    status_po: body.status_po ?? null,
                    tgl_po: tglPo ?? undefined,
                },
            });

            return NextResponse.json({
                success: true,
                message: "PO Master was Updated.",
                data: toJsonSafe(masterPo),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            if (message.includes("Unique constraint failed") || message.includes("P2002")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "No PO Sudah ada, harap mengisi dengan No PO yang lain",
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json({ success: false, data: err }, { status: 400 });
        }
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const idPoMaster = Number((await ctx.params).idPoMaster);

        const hasTransactions = await prisma.tbl_po.findFirst({
            where: { id_po_master: idPoMaster },
            select: { id: true },
        });

        if (hasTransactions) {
            const masterPo = await prisma.mst_po.findUnique({ where: { id: idPoMaster } });
            return NextResponse.json(
                {
                    success: true,
                    message: `PO ${masterPo?.no_po_master ?? ""} Gagal di hapus, karena sudah terpakai di Transaksi PO Registration`,
                },
                { status: 400 }
            );
        }

        const deleted = await prisma.mst_po.update({
            where: { id: idPoMaster },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: `PO Master ${deleted.no_po_master} has been deleted.`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
