import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type SpesifikasiMesinRow = Awaited<ReturnType<typeof prisma.mst_spesifikasi_mesin.findMany>>[number];

type SpesifikasiMesinDTO = Omit<SpesifikasiMesinRow, "id"> & {
    id: string;
};

export async function GET() {
    const rows = await prisma.mst_spesifikasi_mesin.findMany({
        orderBy: { item: "asc" },
    });

    const grouped = rows.reduce<Record<string, SpesifikasiMesinDTO[]>>((acc, row) => {
        const key = row.item;

        if (!acc[key]) acc[key] = [];

        acc[key].push({
            ...row,
            id: row.id.toString(),
        });

        return acc;
    }, {});

    const result: {
        item: string;
        items_data: SpesifikasiMesinDTO[];
    }[] = Object.entries(grouped).map(([item, items_data]) => ({
        item,
        items_data,
    }));

    return NextResponse.json({
        success: true,
        totalDatas: result.length,
        data: result,
    });
}
