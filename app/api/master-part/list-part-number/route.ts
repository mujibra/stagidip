import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

function mapPartDescAlias(partDesc: string): string {
    switch (partDesc) {
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
            return partDesc;
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const idMesinRaw = searchParams.get("idMesin");
        const partDescRaw = searchParams.get("partDesc");

        const idMesin = Number(idMesinRaw);
        if (!idMesinRaw || Number.isNaN(idMesin)) {
            return validationError({ idMesin: ["idMesin wajib diisi"] });
        }
        if (!partDescRaw) {
            return validationError({ partDesc: ["partDesc wajib diisi"] });
        }

        const part_desc = mapPartDescAlias(String(partDescRaw));

        const list = await prisma.mst_part_number.findMany({
            where: { id_mesin: idMesin, part_desc },
            select: { id: true, part_no: true, part_desc: true },
        });

        return NextResponse.json({
            success: true,
            totalDatas: list.length,
            data: serializeMany(list),
        });
    } catch (error) {
        return serverError(error);
    }
}
