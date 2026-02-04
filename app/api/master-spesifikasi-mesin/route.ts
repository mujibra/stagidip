import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
export const runtime = "nodejs";

// GET /api/master-spesifikasi-mesin?page=1&perPage=10
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take } = getPagination(searchParams);

        const [data, total] = await Promise.all([
            prisma.mst_spesifikasi_mesin.findMany({
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.mst_spesifikasi_mesin.count(),
        ]);

        const safeData = data.map((d) => ({
            ...d,
            id: String(d.id),
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
            data: serializeId(spek!),
        });
    } catch (error) {
        return serverError(error);
    }
}
