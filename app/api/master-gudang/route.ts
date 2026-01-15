import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type CreateGudangDTO = {
    gudang_desc?: string;
};

export async function GET() {
    try {
        const gudangs = await prisma.mst_gudang.findMany();

        return NextResponse.json({
            success: true,
            totalDatas: gudangs.length,
            data: gudangs.map((g) => ({ ...g, id: String(g.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateGudangDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.gudang_desc) errors.gudang_desc = ["Gudang wajib diisi"];
        if (Object.keys(errors).length) return validationError(errors);

        const created = await prisma.mst_gudang.create({
            data: {
                gudang_desc: body.gudang_desc!,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Gudang created successfully.",
            data: { ...created, id: String(created.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
