import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { serializeMany } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { idParent: string } }) {
    try {
        const idParent = Number(params.idParent);

        const datas = await prisma.mst_type_spesifikasi_msn.findMany({
            where: { id_parent: idParent },
        });

        return NextResponse.json({
            success: true,
            totalDatas: datas.length,
            data: serializeMany(datas),
        });
    } catch (error) {
        return serverError(error);
    }
}
