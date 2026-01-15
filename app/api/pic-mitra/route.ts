import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

// GET /api/pic-mitra
export async function GET() {
    try {
        const list = await prisma.pic_mitra.findMany({
            orderBy: { created_at: "desc" },
        });

        const safe = list.map((x) => ({
            ...x,
            id: x.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: safe.length,
            data: safe,
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

// POST /api/pic-mitra
export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{ name: string }>(req);
        const { name } = body;

        if (!name) {
            return NextResponse.json({ name: ["Pic mitra tidak boleh kosong"] }, { status: 400 });
        }

        const now = new Date();

        const created = await prisma.pic_mitra.create({
            data: {
                name,
                created_at: now,
                updated_at: now,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Pic mitra baru berhasil ditambahkan",
            data: {
                ...created,
                id: created.id.toString(),
            },
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
