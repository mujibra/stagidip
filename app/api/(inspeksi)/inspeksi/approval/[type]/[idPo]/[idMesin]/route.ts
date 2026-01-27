import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function sanitizeUser<T extends Record<string, unknown>>(user: T) {
    const cleaned = { ...user };
    delete cleaned.reset_code;
    delete cleaned.email_verified_at;
    delete cleaned.reset_code_expired_at;
    delete cleaned.created_at;
    delete cleaned.updated_at;
    return cleaned;
}

export async function GET(
    _req: NextRequest,
    context: { params: { type: string; idPo: string; idMesin: string } }
) {
    try {
        const type = context.params.type.toUpperCase();
        const idPo = toNumber(context.params.idPo);
        const idMesin = toNumber(context.params.idMesin);

        if (!idPo || !idMesin) {
            return NextResponse.json(
                { success: false, data: [] },
                { status: 400 }
            );
        }

        const approval = await prisma.transaksi_inspeksi_approval.findFirst({
            where: { id_po: idPo, no_mesin: idMesin },
        });

        if (!approval) {
            return NextResponse.json(
                { success: false, data: [] },
                { status: 400 }
            );
        }

        let userId: number | null = null;
        if (type === "MOVER") userId = approval.approval_by_mover ?? null;
        else if (type === "TSS") userId = approval.approval_by_tss ?? null;
        else userId = approval.approval_by_datindo ?? null;

        if (!userId) {
            return NextResponse.json({ success: true, data: [] });
        }

        const users = await prisma.users.findMany({
            where: { id: BigInt(userId) },
        });

        const data = users.map((user) => sanitizeUser(user));

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
