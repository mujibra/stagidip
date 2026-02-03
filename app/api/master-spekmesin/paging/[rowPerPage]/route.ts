import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ rowPerPage: string }> }) {
    try {
        const rowPerPage = Number((await ctx.params).rowPerPage);
        const page = Number(req.nextUrl.searchParams.get("page") ?? "1");

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const data = await prisma.mst_spesifikasi_mesin.findMany({
            skip: (page - 1) * rowPerPage,
            take: rowPerPage,
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

