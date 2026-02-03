import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const idPo = toNumber((await context.params).idPo);
        const idMesin = toNumber((await context.params).idMesin);

        if (!idPo || !idMesin) {
            return NextResponse.json(
                { success: false, data: null },
                { status: 400 }
            );
        }

        const sql = `select NOTES as notes from crt_${idPo} where id = ${idMesin}`;
        const rows =
            (await prisma.$queryRawUnsafe<{ notes: string | null }[]>(sql)) ?? [];

        return NextResponse.json({
            success: true,
            data: rows[0]?.notes ?? null,
        });
    } catch (error) {
        return serverError(error);
    }
}
