import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeMany } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
export const runtime = "nodejs";

// GET /api/master-spesifikasi-mesin/by-item/:item?page=1&perPage=10
export async function GET(req: NextRequest, { params }: { params: Promise<{ item: string }> }) {
    const { searchParams } = new URL(req.url);
    const { skip, take, page, perPage } = getPagination(searchParams);
    const item = (await params).item;

    const [datas, total] = await Promise.all([
        prisma.mst_spesifikasi_mesin.findMany({
            where: { item },
            skip,
            take,
            orderBy: { id: "desc" },
        }),
        prisma.mst_spesifikasi_mesin.count({ where: { item } }),
    ]);

    return NextResponse.json({
        success: true,
        totalDatas: total,
        totalPages: Math.ceil(total / perPage),
        page,
        perPage,
        data: serializeMany(datas),
    });
}
