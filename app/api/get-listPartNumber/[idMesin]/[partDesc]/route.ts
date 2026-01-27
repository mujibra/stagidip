import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { toJsonSafe } from "@/lib/serialize";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

function normalizePartDesc(value: string) {
    switch (value) {
        case "CDU10_FM B_D":
            return "CDU10_FM B/D";
        case "P_S":
            return "P/S";
        case "BRM20 MAIN B_D":
            return "BRM20 MAIN B/D";
        case "BRM20 RBU B_D":
            return "BRM20 RBU B/D";
        case "BRM50_RBU IO B_D":
            return "BRM50_RBU IO B/D";
        default:
            return value;
    }
}

export async function GET(
    _req: NextRequest,
    context: { params: { idMesin: string; partDesc: string } }
) {
    try {
        const idMesin = Number(context.params.idMesin);
        const partDesc = normalizePartDesc(context.params.partDesc);

        const list = await prisma.mst_part_number.findMany({
            where: {
                id_mesin: idMesin,
                part_desc: partDesc,
            },
            select: {
                id: true,
                part_no: true,
                part_desc: true,
            },
        });

        return NextResponse.json({
            success: true,
            totalDatas: list.length,
            data: toJsonSafe(list),
        });
    } catch (error) {
        return serverError(error);
    }
}
