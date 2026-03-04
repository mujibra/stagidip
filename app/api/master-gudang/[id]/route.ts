import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
export const runtime = "nodejs";

type UpdateGudangDTO = {
    gudang_desc?: string;
    alamat?: string | null;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const gudang = await prisma.mst_gudang.findUnique({ where: { id: toNumber(id)! } });
        if (!gudang) return notFoundError("Data gudang tidak ditemukan", { data: [] });

        return NextResponse.json({
            success: true,
            data: { ...gudang, id: String(gudang.id) },
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data gudang tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<UpdateGudangDTO>(req);

        const errors = validateRequiredName(body.gudang_desc, "gudang_desc", "Gudang tidak boleh kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const updated = await prisma.mst_gudang.update({
            where: { id: toNumber(id)! },
            data: {
                gudang_desc: body.gudang_desc!.trim(),
                alamat: body.alamat ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil di update",
            data: { ...updated, id: String(updated.id) },
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data gudang tidak ditemukan", { data: [] });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const existsPo = await prisma.tbl_po.findFirst({
            where: { nama_gudang: idNum },
            select: { id: true },
        });

        if (existsPo) {
            const gudang = await prisma.mst_gudang.findUnique({ where: { id: idNum }, select: { gudang_desc: true } });
            return badRequestError(`Gudang ${gudang?.gudang_desc ?? ""} Gagal di hapus`);
        }

        const deleted = await prisma.mst_gudang.delete({ where: { id: idNum } });

        return NextResponse.json({
            success: true,
            message: "Data Gudang berhasil dihapus",
            data: { ...deleted, id: String(deleted.id) },
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data gudang tidak ditemukan", { data: [] });
        return serverError(error);
    }
}
