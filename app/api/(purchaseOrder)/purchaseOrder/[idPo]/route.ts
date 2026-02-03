import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

type UpdatePoBody = Record<string, unknown>;

export async function PUT(req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const idPo = toNumber((await context.params).idPo);
        if (!idPo) return NextResponse.json({ success: false }, { status: 400 });

        const body = await parseBody<UpdatePoBody>(req);

        const updated = await prisma.tbl_po.update({
            where: { id: idPo },
            data: body as never,
        });

        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const idPo = toNumber((await context.params).idPo);
        if (!idPo) return NextResponse.json({ success: false }, { status: 400 });

        // Laravel does soft delete behavior via deleted_at in many tables; keep consistent
        const updated = await prisma.tbl_po.update({
            where: { id: idPo },
            data: { deleted_at: new Date() },
        });

        // Optionally drop crt_{idPo}? Laravel does not necessarily drop it here.
        return NextResponse.json({ success: true, data: toJsonSafe(updated) });
    } catch (error) {
        return serverError(error);
    }
}
