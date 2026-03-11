import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type CreateStyleDTO = {
    name?: string;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [styles, total] = await Promise.all([
            prisma.mst_style.findMany({
                where: { deleted_at: null },
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.mst_style.count({ where: { deleted_at: null } }),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: serializeMany(styles),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateStyleDTO>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Style tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const created = await prisma.mst_style.create({
            data: {
                name: body.name!.trim(),
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Style baru berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
