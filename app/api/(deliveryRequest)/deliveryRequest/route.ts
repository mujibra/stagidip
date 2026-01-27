import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

type DeliveryRequestBody = {
    delivery_request_no?: number | string;
    tanggal_request?: string;
    category?: string;
    task?: string;
    no_mesin?: number | string;
    sn_mesin?: string;
    id_po?: number | string;
    purpose?: string;
    contact_person?: string;
    contact_no?: string;
    address?: string;
    request_by?: number | string;
    status_approval?: string;
    approve_by?: number | string;
};

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// Mirrors Laravel DeliveryRequestController@store
export async function POST(req: Request) {
    try {
        const body = await parseBody<DeliveryRequestBody>(req);

        const no_mesin = toInt(body.no_mesin);
        const id_po = toInt(body.id_po);
        const request_by = toInt(body.request_by);
        if (!no_mesin || !id_po || !request_by || !body.sn_mesin || !body.category || !body.task) {
            return validationError({
                no_mesin: !no_mesin ? ["no_mesin is required"] : [],
                id_po: !id_po ? ["id_po is required"] : [],
                request_by: !request_by ? ["request_by is required"] : [],
                sn_mesin: !body.sn_mesin ? ["sn_mesin is required"] : [],
                category: !body.category ? ["category is required"] : [],
                task: !body.task ? ["task is required"] : [],
            });
        }

        // Reject if existing DELIVERY request for the same PO + machine
        const checkExist = await prisma.delivery_request.findFirst({
            where: {
                id_po,
                no_mesin,
                task: "DELIVERY",
            },
        });
        if (checkExist) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Delivery Request with SN Number ${body.sn_mesin} is rejected, Please do withdrawal to do next transaction`,
                },
                { status: 400 }
            );
        }

        // delivery_request_no = max + 1
        const maxRow = await prisma.delivery_request.aggregate({
            _max: { delivery_request_no: true },
        });
        const nextNo = (maxRow._max.delivery_request_no ?? 0) + 1;

        const created = await prisma.delivery_request.create({
            data: {
                delivery_request_no: nextNo,
                tanggal_request: new Date().toISOString(),
                category: body.category ?? null,
                task: body.task ?? null,
                no_mesin,
                sn_mesin: body.sn_mesin ?? null,
                id_po,
                purpose: body.purpose ?? null,
                contact_person: body.contact_person ?? null,
                contact_no: body.contact_no ?? null,
                address: body.address ?? null,
                request_by,
                status_approval: body.status_approval ?? null,
                approve_by: toInt(body.approve_by),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Delivery Request created successfully.",
            data: toJsonSafe(created),
        });
    } catch (e) {
        return serverError(e);
    }
}
