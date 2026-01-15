import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const models = await prisma.models.findMany({
            where: {
                NOT: {
                    id: {
                        in: [1, 3],
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            totalDatas: models.length,
            data: models,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching models.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name) {
            return NextResponse.json({ name: ["Nama Model tidak boleh kosong"] }, { status: 400 });
        }

        const exists = await prisma.models.findFirst({
            where: { name: body.name },
        });

        if (exists) {
            return NextResponse.json(
                {
                    errorCode: "23000",
                    message: "SN Mesin " + body.name + " sudah ada, Harap Isi Nama Type dengan nama lain",
                },
                { status: 400 }
            );
        }

        const newModel = await prisma.models.create({
            data: body,
        });

        return NextResponse.json({
            success: true,
            message: "Model baru berhasil ditambahkan",
            data: newModel,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching models.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
