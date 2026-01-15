import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export async function GET(_: Request, { params }: { params: { idParent: string } }) {
    try {
        const idParent = Number(params.idParent);

        const datas = await prisma.mst_spesifikasi_mesin_fnew.findMany({
            where: { item_id: idParent },
        });

        return NextResponse.json({
            success: true,
            totalDatas: datas.length,
            data: datas.map((d) => ({
                ...d,
                id: d.id.toString(),
            })),
        });
    } catch (error) {
        return serverError(error);
    }
}
