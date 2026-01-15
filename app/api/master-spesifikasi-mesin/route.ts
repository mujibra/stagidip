import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";

// GET /api/master-spesifikasi-mesin?page=1&perPage=10
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") ?? 1);
        const perPage = Number(searchParams.get("perPage") ?? 10);

        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            prisma.mst_spesifikasi_mesin.findMany({
                skip,
                take: perPage,
                orderBy: { id: "desc" },
            }),
            prisma.mst_spesifikasi_mesin.count(),
        ]);

        const safeData = data.map((d) => ({
            ...d,
            id: d.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: total,
            data: safeData,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

// POST /api/master-spesifikasi-mesin
export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{
            item: string;
            description?: string;
        }>(req);

        const { item, description } = body;

        const errors: Record<string, string[]> = {};
        if (!item) errors.item = ["Item tidak boleh kosong"];

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(errors, { status: 400 });
        }

        let spek;

        if (description) {
            spek = await prisma.mst_spesifikasi_mesin.create({
                data: {
                    item,
                    description,
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: "Spesifikasi Mesin inserted successfully.",
            data: {
                ...spek,
                id: spek?.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
