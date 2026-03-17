import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type SettingPreStagingBody = {
    types?: string;
    description?: string;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [data, total] = await Promise.all([
            prisma.setting_prestaging.findMany({
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.setting_prestaging.count(),
        ]);

        const safeData = data.map((d) => ({
            ...d,
            id: String(d.id),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: safeData,
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<SettingPreStagingBody>(req);
        const types = (body.types ?? "").trim();
        const description = (body.description ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!types) errors.types = ["Types wajib diisi"];
        if (!description) errors.description = ["Description wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const created = await prisma.setting_prestaging.create({
            data: {
                types,
                description,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Setting PreStaging created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
