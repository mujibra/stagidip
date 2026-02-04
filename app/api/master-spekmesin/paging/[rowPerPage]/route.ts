import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ rowPerPage: string }> }) {
    try {
        const rowPerPage = Number((await ctx.params).rowPerPage);

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const { skip, take } = getPagination(req.nextUrl.searchParams, { perPageOverride: rowPerPage });

        const data = await prisma.mst_spesifikasi_mesin.findMany({
            skip,
            take,
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
