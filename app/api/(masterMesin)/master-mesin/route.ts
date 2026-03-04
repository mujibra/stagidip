import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, mergeValidationBags, toNumber, validatePositiveId } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type CreateMesinDTO = {
    merek?: string;
    model?: number;
    type?: string;
};

export async function GET() {
    try {
        const machines = await prisma.mst_mesin.findMany();
        return NextResponse.json({
            success: true,
            totalDatas: machines.length,
            data: machines.map((m) => ({ ...m, id: String(m.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateMesinDTO>(req);

        const errors = mergeValidationBags(
            validateRequiredName(body.merek, "merek", "Merek tidak boleh kosong !"),
            validatePositiveId(body.model, "model", "Model tidak boleh kosong !"),
            validateRequiredName(body.type, "type", "Type tidak boleh kosong")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const type = body.type!.trim();
        const data = {
            merek: body.merek!.trim(),
            model: toNumber(body.model)!,
            type,
            status: "NEW_MODEL" as const,
        };

        const mesin = await prisma.mst_mesin.create({ data });
        return NextResponse.json({
            success: true,
            message: "Mesin created successfully.",
            data: { ...mesin, id: String(mesin.id) },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return badRequestError("Model Mesin sudah ada, Harap Isi Nama Model dengan nama lain");
        }
        if (error instanceof Error && error.message.includes("Unique constraint failed")) {
            return badRequestError("Model Mesin sudah ada, Harap Isi Nama Model dengan nama lain");
        }
        return serverError(error);
    }
}
