import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { getPagination } from "@/lib/http/pagination";
export const runtime = "nodejs";

type SpesifikasiMesinRow = Awaited<ReturnType<typeof prisma.mst_spesifikasi_mesin.findMany>>[number];

type SpesifikasiMesinDTO = Omit<SpesifikasiMesinRow, "id"> & { id: string };

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { page, perPage } = getPagination(searchParams);

        const rows = await prisma.mst_spesifikasi_mesin.findMany({ orderBy: { item: "asc" } });

        const grouped = rows.reduce<Record<string, SpesifikasiMesinDTO[]>>((acc, row) => {
            const key = row.item;
            if (!acc[key]) acc[key] = [];
            acc[key].push({ ...row, id: String(row.id) });
            return acc;
        }, {});

        const allGroups = Object.entries(grouped).map(([item, items_data]) => ({ item, items_data }));
        const total = allGroups.length;
        const start = (page - 1) * perPage;
        const data = allGroups.slice(start, start + perPage);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data,
        });
    } catch (error) {
        return serverError(error);
    }
}
