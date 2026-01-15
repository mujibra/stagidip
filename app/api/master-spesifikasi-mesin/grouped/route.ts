import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type SpesifikasiMesinRow = Awaited<ReturnType<typeof prisma.mst_spesifikasi_mesin.findMany>>[number];

type SpesifikasiMesinDTO = Omit<SpesifikasiMesinRow, "id"> & { id: string };

export async function GET() {
    try {
        const rows = await prisma.mst_spesifikasi_mesin.findMany({ orderBy: { item: "asc" } });

        const grouped = rows.reduce<Record<string, SpesifikasiMesinDTO[]>>((acc, row) => {
            const key = row.item;
            if (!acc[key]) acc[key] = [];
            acc[key].push({ ...row, id: String(row.id) });
            return acc;
        }, {});

        const result = Object.entries(grouped).map(([item, items_data]) => ({ item, items_data }));

        return NextResponse.json({ success: true, totalDatas: result.length, data: result });
    } catch (error) {
        return serverError(error);
    }
}
