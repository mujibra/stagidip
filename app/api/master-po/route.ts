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
    return Array.from(new Set(values.map((id) => Number(id)).filter((id): id is number => Number.isInteger(id) && id > 0)));
}

export async function GET() {
    try {
        const masterPos = await prisma.mst_po.findMany({
            where: { deleted_at: null },
            orderBy: { id: "desc" },
        });

        const customerIds = parseCustomerIds(masterPos.map((po) => po.id_customer));

        const customers = customerIds.length ? await prisma.mst_customer.findMany({ where: { id: { in: customerIds } } }) : [];
        const customerMap = new Map(customers.map((c) => [String(c.id), c]));

        const data = masterPos.map((po) => ({
            ...po,
            customer: po.id_customer ? (customerMap.get(po.id_customer) ?? null) : null,
        }));

        return NextResponse.json({
            success: true,
            totalDatas: masterPos.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<MasterPoBody>(req);
        const no_po_master = (body.no_po_master ?? "").trim();

        if (!no_po_master) {
            return validationError({ no_po_master: ["No Po tidak boleh Kosong"] });
        }

        const tglPo = toDate(body.tgl_po);

        try {
            const created = await prisma.mst_po.create({
                data: {
                    no_po_master,
                    tgl_po: tglPo ?? undefined,
                    id_customer: body.id_customer ?? null,
                    status_po: body.status_po ?? null,
                },
            });

            return NextResponse.json({
                success: true,
                message: "PO Master created successfully.",
                data: toJsonSafe(created),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            if (message.includes("Unique constraint failed") || message.includes("P2002")) {
                return validationError({ no_po_master: ["Nomor PO sudah digunakan"] });
            }
            return NextResponse.json({ errorMessage: message }, { status: 400 });
        }
    } catch (error) {
        return serverError(error);
    }
}
