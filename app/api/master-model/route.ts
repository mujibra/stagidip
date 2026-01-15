import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type CreateModelDTO = { name?: string };

export async function GET() {
    try {
        const models = await prisma.models.findMany({
            where: { NOT: { id: { in: [1, 3] } } },
        });

        return NextResponse.json({
            success: true,
            totalDatas: models.length,
            data: models.map((m) => ({ ...m, id: String(m.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateModelDTO>(req);
        const name = (body.name ?? "").trim();

        if (!name) return validationError({ name: ["Nama Model tidak boleh kosong"] });

        const exists = await prisma.models.findFirst({ where: { name } });
        if (exists) {
            return NextResponse.json(
                {
                    success: false,
                    errorCode: "23000",
                    message: `SN Mesin ${name} sudah ada, Harap Isi Nama Type dengan nama lain`,
                },
                { status: 400 }
            );
        }

        const created = await prisma.models.create({ data: { name } });

        return NextResponse.json({
            success: true,
            message: "Model baru berhasil ditambahkan",
            data: { ...created, id: String(created.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
