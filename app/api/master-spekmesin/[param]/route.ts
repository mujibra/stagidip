import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type MasterSpekMesinBody = {
    item?: string;
    description?: string;
};

export async function GET(req: NextRequest, ctx: { params: Promise<{ param: string }> }) {
    try {
        const rowPerPage = Number((await ctx.params).param);

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

export async function PUT(req: NextRequest, ctx: { params: Promise<{ param: string }> }) {
    try {
        const id = Number((await ctx.params).param);
        const body = await parseBody<MasterSpekMesinBody>(req);
        const item = (body.item ?? "").trim();

        if (!item) {
            return validationError({ item: ["Item wajib diisi"] });
        }

        await prisma.mst_spesifikasi_mesin.update({
            where: { id },
            data: {
                item,
                description: body.description ?? "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Spesifikasi Mesin berhasil diupdate",
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ param: string }> }) {
    try {
        const id = Number((await ctx.params).param);
        const deleted = await prisma.mst_spesifikasi_mesin.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `Data Spesifikasi Mesin ${deleted.item}-${deleted.description} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
