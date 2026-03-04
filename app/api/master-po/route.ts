import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toDate, toNumber } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterPoBody = {
    no_po_master?: string;
    tgl_po?: string;
    id_customer?: string;
    status_po?: string;
};

function parseCustomerIds(values: Array<string | null | undefined>): number[] {
    return Array.from(new Set(values.map((id) => toNumber(id)).filter((id): id is number => Number.isInteger(id) && id > 0)));
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

        const errors = validateRequiredName(body.no_po_master, "no_po_master", "No Po tidak boleh Kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const created = await prisma.mst_po.create({
            data: {
                no_po_master: body.no_po_master!.trim(),
                tgl_po: toDate(body.tgl_po) ?? undefined,
                id_customer: body.id_customer ?? null,
                status_po: body.status_po ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "PO Master created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return badRequestError("PO Number was Exist");
        }

        return serverError(error);
    }
}
