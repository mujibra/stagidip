import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const customers = await prisma.mst_customer.findMany({
            orderBy: { created_at: "desc" },
        });

        const safeCustomers = customers.map((c) => ({
            ...c,
            id: c.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: safeCustomers.length,
            data: safeCustomers,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching customers.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.bank_desc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "bank description is required",
                },
                { status: 400 }
            );
        }

        const newCustomer = await prisma.mst_customer.create({
            data: {
                bank_desc: body.bank_desc,
                address: body.address || null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Customer created succesfully",
            data: {
                ...newCustomer,
                id: newCustomer.id.toString(),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error creating customer",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 400 }
        );
    }
}
