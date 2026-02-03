import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type RouteParams = {
    params: Promise<{ idType: string }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
    const idType = Number((await params).idType);

    const datas = await prisma.mst_mesin.findMany({
        where: {
            model: idType,
            status: "NEW_MODEL",
        },
    });

    return NextResponse.json({
        success: true,
        totalDatas: datas.length,
        data: serializeMany(datas),
    });
}
