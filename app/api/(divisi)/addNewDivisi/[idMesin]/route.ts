import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateDivisiBody = {
    name?: string;
};

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ idMesin: string }> }
) {
    try {
        const body = await parseBody<CreateDivisiBody>(req);
        const name = (body.name ?? "").trim();
        const idMesin = toNumber((await context.params).idMesin);

        const errors: Record<string, string[]> = {};
        if (!name) errors.name = ["Nama Divisi tidak boleh kosong."];
        if (!idMesin) errors.id_mesin = ["Model Wajib dipilih."];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const exists = await prisma.mst_mesin.findFirst({
            where: { id: idMesin ?? 0 },
        });

        if (!exists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Division was created Errors. the model is Not Found",
                },
                { status: 400 }
            );
        }

        const created = await prisma.mst_divisi.create({
            data: {
                name,
                id_mesin: idMesin ?? 0,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Division was created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
