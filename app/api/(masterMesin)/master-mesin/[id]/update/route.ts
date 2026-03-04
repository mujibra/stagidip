import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, mergeValidationBags, toNumber, validatePositiveId } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type UpdateMesinDTO = {
    merek?: string;
    model?: number;
    type?: string;
};

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const body = await parseBody<UpdateMesinDTO & Record<string, unknown>>(req);

        const errors = mergeValidationBags(
            validateMasterIdParam(id),
            validateRequiredName(body.merek, "merek", "Merek tidak boleh kosong !"),
            validatePositiveId(body.model, "model", "Model tidak boleh kosong !"),
            validateRequiredName(body.type, "type", "Type tidak boleh kosong")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const merek = String(body.merek).trim();
        const model = toNumber(body.model)!;
        const type = String(body.type).trim();

        const rest = { ...body } as Record<string, unknown>;
        delete rest.merek;
        delete rest.model;
        delete rest.type;

        const updated = await prisma.mst_mesin.update({
            where: { id: toNumber(id)! },
            data: {
                merek,
                model,
                type,
                ...rest,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data berhasil diupdate",
            data: { ...updated, id: String(updated.id) },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return badRequestError("Model Mesin sudah ada, Harap Isi Nama Model dengan nama lain");
        }
        if (error instanceof Error && error.message.includes("Unique constraint failed")) {
            return badRequestError("Model Mesin sudah ada, Harap Isi Nama Model dengan nama lain");
        }
        if (isPrismaNotFoundError(error)) return notFoundError("Data tidak ditemukan");
        return serverError(error);
    }
}
