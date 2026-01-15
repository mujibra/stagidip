import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeMany } from "@/lib/serialize";
export const runtime = "nodejs";

type RouteParams = {
    params: Promise<{ modelId: string }>;
};

// GET /api/master-mesin/model/:modelId
export async function GET(_req: Request, { params }: RouteParams) {
    const { modelId } = await params;

    const list = await prisma.mst_mesin.findMany({
        where: { model: Number(modelId) }, // or string if your schema says so
    });

    if (!list || list.length === 0) {
        return NextResponse.json(
            {
                success: false,
                message: "Data tidak ditemukan",
                data: [],
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            totalDatas: list.length,
            data: serializeMany(list),
        },
        { status: 200 }
    );
}
