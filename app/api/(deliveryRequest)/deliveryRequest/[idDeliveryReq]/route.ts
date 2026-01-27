import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

type Body = Record<string, unknown>;

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

export async function PUT(req: Request, ctx: { params: Promise<{ idDeliveryReq: string }> }) {
    try {
        const { idDeliveryReq } = await ctx.params;
        const id = toInt(idDeliveryReq);
        if (!id) {
            return validationError({ idDeliveryReq: ["Invalid id"] });
        }

        const body = await parseBody<Body>(req);

        const updated = await prisma.delivery_request.update({
            where: { id },
            data: {
                delivery_request_no: toInt(body.delivery_request_no),
                tanggal_request: (body.tanggal_request as string | undefined) ?? undefined,
                category: (body.category as string | undefined) ?? undefined,
                task: (body.task as string | undefined) ?? undefined,
                no_mesin: toInt(body.no_mesin) ?? undefined,
                sn_mesin: (body.sn_mesin as string | undefined) ?? undefined,
                id_po: toInt(body.id_po) ?? undefined,
                purpose: (body.purpose as string | undefined) ?? undefined,
                contact_person: (body.contact_person as string | undefined) ?? undefined,
                contact_no: (body.contact_no as string | undefined) ?? undefined,
                address: (body.address as string | undefined) ?? undefined,
                request_by: toInt(body.request_by) ?? undefined,
                status_approval: (body.status_approval as string | undefined) ?? undefined,
                approve_by: toInt(body.approve_by) ?? undefined,
            },
        });

        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (e) {
        return serverError(e);
    }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ idDeliveryReq: string }> }) {
    try {
        const { idDeliveryReq } = await ctx.params;
        const id = toInt(idDeliveryReq);
        if (!id) {
            return validationError({ idDeliveryReq: ["Invalid id"] });
        }

        await prisma.delivery_request.delete({ where: { id } });
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch (e) {
        return serverError(e);
    }
}
