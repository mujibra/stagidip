import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { serializeId } from "@/lib/serialize";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type UpdateCustomerDTO = {
    bank_desc?: string;
    address?: string | null;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const customer = await prisma.mst_customer.findUnique({ where: { id: toNumber(id)! } });
        if (!customer) return notFoundError("Customer not found", { data: [] });

        return NextResponse.json({
            success: true,
            message: "Customer details",
            data: serializeId(customer),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Customer not found", { data: [] });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<UpdateCustomerDTO>(req);

        const errors = validateRequiredName(body.bank_desc, "bank_desc", "Nama Customer tidak boleh kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const updated = await prisma.mst_customer.update({
            where: { id: toNumber(id)! },
            data: {
                bank_desc: body.bank_desc!.trim(),
                address: body.address ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Customer updated successfully.",
            data: serializeId(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Customer not found", { data: [] });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const deleted = await prisma.mst_customer.delete({ where: { id: toNumber(id)! } });

        return NextResponse.json({
            success: true,
            message: "Customer deleted successfully.",
            data: serializeId(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Customer not found", { data: [] });
        return serverError(error);
    }
}
