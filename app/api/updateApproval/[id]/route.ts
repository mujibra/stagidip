import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// Mirrors Laravel DeliveryRequestController@updateApproval
export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const deliveryId = toInt(id);
        if (!deliveryId) return validationError({ id: ["Invalid id"] });

        const body = await parseBody<Record<string, unknown>>(req);

        const status_approval = typeof body.status_approval === "string" ? body.status_approval : undefined;
        const approve_by = toInt(body.approve_by);

        const updated = await prisma.delivery_request.update({
            where: { id: deliveryId },
            data: {
                status_approval,
                approve_by: approve_by ?? undefined,
            },
        });

        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (e) {
        return serverError(e);
    }
}
