import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const gudangs = await prisma.mst_gudang.findMany();

        return NextResponse.json({
            success: true,
            totalDatas: gudangs.length,
            data: gudangs,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching gudangs.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.gudang_desc) {
            return NextResponse.json({ gudang_desc: ["gudang_desc is required"] }, { status: 400 });
        }

        const gudang = await prisma.mst_gudang.create({
            data: body,
        });

        return NextResponse.json({
            success: true,
            message: "Gudang created successfully.",
            data: gudang,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching gudangs.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
