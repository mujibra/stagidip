import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

type SettingPreStagingBody = {
    types?: string;
    description?: string;
};

export async function getSettingPreStagingByRowPerPage(req: NextRequest, idParam: string) {
    try {
        const rowPerPage = Number(idParam);

        if (!rowPerPage || rowPerPage < 1) {
            return validationError({ rowPerPage: ["Row per page wajib diisi"] });
        }

        const { skip, take } = getPagination(req.nextUrl.searchParams, { perPageOverride: rowPerPage });

        const data = await prisma.setting_prestaging.findMany({
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

export async function updateSettingPreStaging(req: NextRequest, idParam: string) {
    try {
        const id = Number(idParam);
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

export async function deleteSettingPreStaging(idParam: string) {
    try {
        const id = Number(idParam);
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
