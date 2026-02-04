import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type PicMoverBody = {
    gudang?: string;
    pic_mover?: string;
};

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const rowPerPage = Number((await ctx.params).id);

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const { skip, take } = getPagination(req.nextUrl.searchParams, { perPageOverride: rowPerPage });

        const data = await prisma.pic_mover.findMany({
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

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const body = await parseBody<PicMoverBody>(req);
        const gudang = (body.gudang ?? "").trim();
        const pic_mover = (body.pic_mover ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!gudang) errors.gudang = ["Gudang wajib diisi"];
        if (!pic_mover) errors.pic_mover = ["PIC mover wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        await prisma.pic_mover.update({
            where: { id },
            data: { gudang, pic_mover },
        });

        const updated = await prisma.pic_mover.findUnique({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "PIC Mover updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await ctx.params).id);
        const deleted = await prisma.pic_mover.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `Data PIC Mover ${deleted.gudang}-${deleted.pic_mover} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
