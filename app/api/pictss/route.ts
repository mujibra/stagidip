import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId, serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type CreatePicTssDTO = {
    name?: string;
};

export async function GET() {
    try {
        const list = await prisma.pic_tss.findMany({
            where: { deleted_at: null },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: list.length,
            data: serializeMany(list),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreatePicTssDTO>(req);
        const name = (body.name ?? "").trim();

        if (!name) {
            return validationError({ name: ["Pic TSS tidak boleh kosong"] });
        }

        const created = await prisma.pic_tss.create({
            data: {
                name,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Pic TSS baru berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
