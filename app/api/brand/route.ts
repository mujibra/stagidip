import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequestError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [brands, total] = await Promise.all([
            prisma.brand.findMany({
                skip,
                take,
                orderBy: { created_at: "desc" },
            }),
            prisma.brand.count(),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: serializeMany(brands),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const name = form.get("name");

        const nameErrors = validateRequiredName(name, "name", "Brand tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const normalizedName = String(name).trim();
        const existed = await prisma.brand.findFirst({ where: { name: normalizedName } });
        if (existed) return badRequestError("Brand sudah ada, tidak boleh sama");

        const brand = await prisma.brand.create({ data: { name: normalizedName } });

        return NextResponse.json({
            success: true,
            message: "Brand baru berhasil di tambahkan",
            data: serializeId(brand),
        });
    } catch (error) {
        return serverError(error);
    }
}
