import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type SettingPreStagingBody = {
    types?: string;
    description?: string;
};

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const rowPerPage = Number(ctx.params.id);
        const page = Number(req.nextUrl.searchParams.get("page") ?? "1");

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const data = await prisma.setting_prestaging.findMany({
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

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<SettingPreStagingBody>(req);
        const types = (body.types ?? "").trim();
        const description = (body.description ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!types) errors.types = ["Types wajib diisi"];
        if (!description) errors.description = ["Description wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        await prisma.setting_prestaging.update({
            where: { id },
            data: { types, description },
        });

        const updated = await prisma.setting_prestaging.findUnique({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Setting Pre Staging updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const deleted = await prisma.setting_prestaging.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `Data ${deleted.types}-${deleted.description} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
