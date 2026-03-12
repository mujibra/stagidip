import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

type CreateCustomerDTO = {
    bank_desc?: string;
    address?: string | null;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [customers, total] = await Promise.all([
            prisma.mst_customer.findMany({
                skip,
                take,
                orderBy: { created_at: "desc" },
            }),
            prisma.mst_customer.count(),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            totalPages: Math.ceil(total / perPage),
            page,
            perPage,
            data: serializeMany(customers),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateCustomerDTO>(req);

        const errors = validateRequiredName(body.bank_desc, "bank_desc", "Nama Customer tidak boleh kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const created = await prisma.mst_customer.create({
            data: {
                bank_desc: body.bank_desc!.trim(),
                address: body.address ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Customer created successfully.",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
