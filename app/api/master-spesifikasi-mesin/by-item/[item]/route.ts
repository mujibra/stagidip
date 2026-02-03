import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeMany } from "@/lib/serialize";
export const runtime = "nodejs";

// GET /api/master-spesifikasi-mesin/by-item/:item
export async function GET(_: Request, { params }: { params: Promise<{ item: string }> }) {
    const datas = await prisma.mst_spesifikasi_mesin.findMany({
        where: { item: (await params).item },
    });

    return NextResponse.json({
        success: true,
        totalDatas: datas.length,
        data: serializeMany(datas),
    });
}
