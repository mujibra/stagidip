import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
    params: Promise<{ idType: string }>;
};

// GET /api/master-mesin/new-models/:idType
export async function GET(_req: Request, { params }: RouteParams) {
    const { idType } = await params;

    const datas = await prisma.mst_mesin.findMany({
        where: {
            model: Number(idType),
            status: "NEW_MODEL",
        },
    });

    return NextResponse.json({
        success: true,
        totalDatas: datas.length,
        data: datas.map((m) => ({ ...m, id: m.id.toString() })),
    });
}
