import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/master-spesifikasi-mesin/by-item/:item
export async function GET(_: Request, { params }: { params: { item: string } }) {
    const datas = await prisma.mst_spesifikasi_mesin.findMany({
        where: { item: params.item },
    });

    return NextResponse.json({
        success: true,
        totalDatas: datas.length,
        data: datas.map((d) => ({
            ...d,
            id: d.id.toString(),
        })),
    });
}
