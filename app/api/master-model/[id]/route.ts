import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type UpdateModelDTO = { name?: string };

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const model = await prisma.models.findUnique({ where: { id: idNum } });
        if (!model) return notFoundError("Detail data model tidak ditemukan", { data: "" });

        return NextResponse.json({
            success: true,
            message: "Detail data model",
            data: { ...model, id: String(model.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const body = await parseBody<UpdateModelDTO>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Model tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const name = body.name!.trim();
        const model = await prisma.models.findUnique({ where: { id: idNum }, select: { id: true, name: true } });
        if (!model) return notFoundError("Data not found");

        const usedInPo = await prisma.tbl_po.findFirst({ where: { model: idNum }, select: { id: true } });
        if (usedInPo) {
            return badRequestError(`Type ${model.name} Gagal di update, Type ini sedang dipakai di Transaksi Staging Registration`);
        }

        const updated = await prisma.models.update({ where: { id: idNum }, data: { name } });

        return NextResponse.json({
            success: true,
            message: "Data model berhasil diupdate",
            data: { ...updated, id: String(updated.id) },
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data not found");
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const model = await prisma.models.findUnique({ where: { id: idNum }, select: { id: true, name: true } });
        if (!model) return notFoundError("Data not found");

        const usedInPo = await prisma.tbl_po.findFirst({ where: { model: idNum }, select: { id: true } });
        if (usedInPo) {
            return badRequestError(`Type ${model.name} Gagal di hapus, Type ini masih terpakai di Transaksi Staging Registration`);
        }

        const usedInMasterMesin = await prisma.mst_mesin.findFirst({ where: { model: idNum }, select: { id: true } });
        if (usedInMasterMesin) {
            return badRequestError(`${model.name} Gagal di hapus, Type ini masih terpilih di Model Mesin`);
        }

        const deleted = await prisma.models.delete({ where: { id: idNum } });

        return NextResponse.json({
            success: true,
            message: "Data model berhasil dihapus",
            data: { ...deleted, id: String(deleted.id) },
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data not found");
        return serverError(error);
    }
}
