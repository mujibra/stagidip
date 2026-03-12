import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [list, total] = await Promise.all([
            prisma.pic_mitra.findMany({ skip, take, orderBy: { created_at: "desc" } }),
            prisma.pic_mitra.count(),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: list.map((x) => ({ ...x, id: String(x.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{ name?: string }>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Pic mitra tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const now = new Date();
        const created = await prisma.pic_mitra.create({ data: { name: body.name!.trim(), created_at: now, updated_at: now } });

        return NextResponse.json({
            success: true,
            message: "Pic mitra baru berhasil ditambahkan",
            data: { ...created, id: String(created.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
