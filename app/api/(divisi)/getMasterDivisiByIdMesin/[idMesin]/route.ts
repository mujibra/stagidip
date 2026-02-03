import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ idMesin: string }> }
) {
    try {
        const idMesin = toNumber((await context.params).idMesin);
        if (!idMesin) {
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                data: [],
            });
        }

        const divisi = await prisma.mst_divisi.findMany({
            where: { id_mesin: idMesin },
            orderBy: { id: "asc" },
        });

        const mesin = await prisma.mst_mesin.findFirst({ where: { id: idMesin } });
        const model = mesin
            ? await prisma.models.findFirst({
                  where: { id: BigInt(mesin.model) },
              })
            : null;

        const data = divisi.map((item) => ({
            ...item,
            models: mesin
                ? {
                      ...mesin,
                      types: model ?? null,
                  }
                : null,
        }));

        return NextResponse.json({
            success: true,
            totalDatas: divisi.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
