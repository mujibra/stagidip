import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /bacth (index)
export async function GET() {
    try {
        const bacths = await prisma.bacth_po.findMany();

        const safeBacth = bacths.map((bacth) => ({
            ...bacth,
            id: bacth.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            message: "Data semua bacth",
            data: safeBacth,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error fetching batch data",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

// POST /bacth (store)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.name) {
            return NextResponse.json({ name: ["Batch tidak boleh kosong"] }, { status: 400 });
        }

        // Check duplicate first
        const exists = await prisma.bacth_po.findFirst({
            where: { name: body.name },
        });

        if (exists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Nama Batch sudah ada, harap masukkan Nama Batch lain",
                    data: "",
                },
                { status: 400 }
            );
        }

        const bacth = await prisma.bacth_po.create({
            data: { name: body.name },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Bacth baru berhasil ditambahkan",
                data: bacth,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error add new batch",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
