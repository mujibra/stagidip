import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type CreateGudangDTO = {
    gudang_desc?: string;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [gudangs, total] = await Promise.all([
            prisma.mst_gudang.findMany({ skip, take }),
            prisma.mst_gudang.count(),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: gudangs.map((g) => ({ ...g, id: String(g.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateGudangDTO>(req);

        const errors = validateRequiredName(body.gudang_desc, "gudang_desc", "Gudang wajib diisi");
        if (hasValidationErrors(errors)) return validationError(errors);

        const created = await prisma.mst_gudang.create({
            data: {
                gudang_desc: body.gudang_desc!.trim(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Gudang created successfully.",
            data: { ...created, id: String(created.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
