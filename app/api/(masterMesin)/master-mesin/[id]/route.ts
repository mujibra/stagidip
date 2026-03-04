import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, mergeValidationBags, toNumber, validatePositiveId } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type UpdateMesinDTO = {
    merek?: string;
    model?: number;
    type?: string;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validatePositiveId(id, "id", "id tidak valid");
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const mesin = await prisma.mst_mesin.findUnique({ where: { id: idNum } });
        if (!mesin) return notFoundError("Data tidak ditemukan", { data: [] });

        const model = await prisma.models.findUnique({ where: { id: Number(mesin.model) } });

        return NextResponse.json({
            success: true,
            data: { ...mesin, id: String(mesin.id), model },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const body = await parseBody<UpdateMesinDTO & Record<string, unknown>>(req);

        const errors = mergeValidationBags(
            validatePositiveId(id, "id", "id tidak valid"),
            validateRequiredName(body.merek, "merek", "Merek tidak boleh kosong !"),
            validatePositiveId(body.model, "model", "Model tidak boleh kosong !"),
            validateRequiredName(body.type, "type", "Type tidak boleh kosong")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const rest = { ...body } as Record<string, unknown>;
        delete rest.merek;
        delete rest.model;
        delete rest.type;

        const updated = await prisma.mst_mesin.update({
            where: { id: toNumber(id)! },
            data: {
                merek: body.merek!.trim(),
                model: toNumber(body.model)!,
                type: body.type!.trim(),
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

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validatePositiveId(id, "id", "id tidak valid");
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const usedInPo = await prisma.tbl_po.findFirst({ where: { id_type_mesin: idNum }, select: { id: true } });
        if (usedInPo) {
            const mesin = await prisma.mst_mesin.findUnique({ where: { id: idNum }, select: { type: true } });
            return badRequestError(
                `Type Mesin ${mesin?.type ?? ""} Gagal di hapus, karena sudah terpakai di Transaksi Staging Registration`
            );
        }

        const existing = await prisma.mst_mesin.findUnique({ where: { id: idNum } });
        if (!existing) return notFoundError("Data gagal dihapus");

        await prisma.mst_mesin.delete({ where: { id: idNum } });
        await prisma.mst_divisi.deleteMany({ where: { id_mesin: idNum } });
        await prisma.mst_checklist_staging.deleteMany({ where: { id_mesin: idNum } });

        return NextResponse.json({
            success: true,
            message: "Data berhasil dihapus",
            data: { ...existing, id: String(existing.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
