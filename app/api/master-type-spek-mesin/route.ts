import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

type Row = Awaited<ReturnType<typeof prisma.mst_type_spesifikasi_msn.findMany>>[number];

export async function GET() {
    try {
        const rows = await prisma.mst_type_spesifikasi_msn.findMany();

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            datas: rows.map((r) => ({
                ...r,
                id: r.id.toString(),
            })),
        });
    } catch (error) {
        return serverError(error);
    }
}
