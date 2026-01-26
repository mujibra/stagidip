import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const divisi = await prisma.mst_divisi.findMany({
            orderBy: { id: "desc" },
        });

        const mesinIds = Array.from(new Set(divisi.map((item) => item.id_mesin)));
        const mesin = mesinIds.length
            ? await prisma.mst_mesin.findMany({
                  where: { id: { in: mesinIds } },
              })
            : [];

        const mesinMap = new Map(mesin.map((item) => [item.id, item]));

        const data = divisi.map((item) => ({
            ...item,
            mesin: mesinMap.get(item.id_mesin) ?? null,
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
