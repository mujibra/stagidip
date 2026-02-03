import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteParams = {
    params: Promise<{ idMesin: string }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
    const numericId = Number((await params).idMesin);

    const mesin = await prisma.mst_mesin.findUnique({
        where: { id: numericId },
    });

    if (!mesin) {
        return NextResponse.json(
            {
                success: false,
                message: "Data tidak ditemukan",
                data: [],
            },
            { status: 400 }
        );
    }

    const model = await prisma.models.findUnique({
        where: { id: mesin.model as number },
    });

    const listCopyFrom = await prisma.mst_mesin.findMany({
        where: {
            model: Number(model?.id),
            status_template_prestaging: 1,
        },
    });

    return NextResponse.json({
        success: true,
        data: {
            ...mesin,
            id: String(mesin.id),
            model,
        },
        list_copy_from: listCopyFrom.map((m) => ({ ...m, id: String(m.id) })),
    });
}
