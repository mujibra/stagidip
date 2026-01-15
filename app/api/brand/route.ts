import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: {
                created_at: "desc",
            },
        });

        const safeBrands = brands.map((brand) => ({
            ...brand,
            id: brand.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: safeBrands.length,
            data: safeBrands,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while fetching brands.",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        let name = "";

        const form = await req.formData();
        name = String(form.get("name") || "");

        if (!name) {
            return NextResponse.json({ name: ["Brand tidak boleh kosong"] }, { status: 400 });
        }

        const existed = await prisma.brand.findFirst({
            where: { name },
        });

        if (existed) {
            return NextResponse.json({ name: ["Brand sudah ada, tidak boleh sama"] }, { status: 400 });
        }

        const brand = await prisma.brand.create({
            data: { name },
        });

        return NextResponse.json({
            success: true,
            message: "Brand baru berhasil di tambahkan",
            data: {
                ...brand,
                id: brand.id.toString(),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Brand gagal ditambahkan",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
