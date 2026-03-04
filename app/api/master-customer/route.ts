import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateCustomerDTO = {
    bank_desc?: string;
    address?: string | null;
};

export async function GET() {
    try {
        const customers = await prisma.mst_customer.findMany({
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: customers.length,
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
