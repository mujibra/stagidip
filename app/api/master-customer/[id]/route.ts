import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

type UpdateCustomerDTO = {
    bank_desc?: string;
    address?: string | null;
};

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const customer = await prisma.mst_customer.findUnique({ where: { id } });
        if (!customer) {
            return NextResponse.json({ success: false, message: "Customer not found", data: [] }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Customer details",
            data: serializeId(customer),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<UpdateCustomerDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.bank_desc) errors.bank_desc = ["Nama Customer tidak boleh kosong"];

        if (Object.keys(errors).length) return validationError(errors);

        const updated = await prisma.mst_customer.update({
            where: { id },
            data: {
                bank_desc: body.bank_desc!,
                address: body.address ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Customer updated successfully.",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);

        const existing = await prisma.mst_customer.findUnique({
            where: { id },
            select: { id: true, bank_desc: true },
        });

        if (!existing) {
            return NextResponse.json({ success: false, message: "Customer not found", data: [] }, { status: 404 });
        }

        // Keep existing behavior: direct delete.
        // If you want Laravel-style "block delete if referenced" behavior, we can add it in the next phase.
        const deleted = await prisma.mst_customer.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Customer deleted successfully.",
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
