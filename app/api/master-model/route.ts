import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";

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
        const errors = validateRequiredName(body.name, "name", "Nama Model tidak boleh kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const name = body.name!.trim();
        const exists = await prisma.models.findFirst({ where: { name } });
        if (exists) {
            return badRequestError(`SN Mesin ${name} sudah ada, Harap Isi Nama Type dengan nama lain`, {
                errorCode: "23000",
            });
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
