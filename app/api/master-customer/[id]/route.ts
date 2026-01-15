import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
    params: Promise<{ id: string }>;
};

interface CustomerUpdateInput {
    bank_desc: string;
    address?: string | null;
}

export async function GET(_req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);
    try {
        const customer = await prisma.mst_customer.findUnique({
            where: { id: numericId },
        });

        if (!customer) {
            return NextResponse.json({ success: false, message: "Customer not found", data: [] }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Customer details",
            data: customer,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown server error.";
        return NextResponse.json({ success: false, message: "Error fetching customer.", error: message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    const body: CustomerUpdateInput = await req.json();

    if (!body.bank_desc) {
        return NextResponse.json({ success: false, message: "bank_desc cannot be empty." }, { status: 400 });
    }

    try {
        const updated = await prisma.mst_customer.update({
            where: { id: numericId },
            data: {
                bank_desc: body.bank_desc,
                address: body.address ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Customer updated successfully.",
            data: updated,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown server error.";
        return NextResponse.json({ success: false, message: "Failed to update customer.", error: message }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
    const { id } = await params; // params is a Promise now
    const numericId = Number(id);

    try {
        const customer = await prisma.mst_customer.findUnique({ where: { id: numericId } });

        if (!customer) {
            return NextResponse.json({ success: false, message: "Customer not found." }, { status: 404 });
        }

        await prisma.mst_customer.delete({ where: { id: numericId } });

        return NextResponse.json({
            success: true,
            message: "Customer deleted successfully.",
            data: customer,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown server error.";
        return NextResponse.json({ success: false, message: "Error deleting customer.", error: message }, { status: 500 });
    }
}
