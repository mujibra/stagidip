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
