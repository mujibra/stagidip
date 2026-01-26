import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const datas = await prisma.pic_marketing.findMany({
            where: { deleted_at: null },
            orderBy: { id: "desc" },
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
