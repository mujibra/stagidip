import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const pic = await prisma.pic_mitra.findUnique({ where: { id: toNumber(id)! } });
        if (!pic) return notFoundError("Data picmitra tidak ditemukan", { data: "" });

        return NextResponse.json({ success: true, message: "Detail data picmitra", data: { ...pic, id: String(pic.id) } });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data picmitra tidak ditemukan", { data: "" });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<{ name?: string }>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Pic mitra tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const updated = await prisma.pic_mitra.update({
            where: { id: toNumber(id)! },
            data: { name: body.name!.trim(), updated_at: new Date() },
        });

        return NextResponse.json({ success: true, message: "Data pic mitra berhasil diupdate", data: { ...updated, id: String(updated.id) } });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data picmitra tidak ditemukan", { data: "" });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const used = await prisma.tbl_po.findFirst({ where: { pic_staging: idNum }, select: { id: true } });
        if (used) {
            const pic = await prisma.pic_mitra.findUnique({ where: { id: idNum }, select: { name: true } });
            return badRequestError(`PIC ${pic?.name ?? ""} Gagal di hapus`);
        }

        const deleted = await prisma.pic_mitra.delete({ where: { id: idNum } });
        return NextResponse.json({ success: true, message: "Data pic mitra berhasil dihapus", data: { ...deleted, id: String(deleted.id) } });
    } catch (error) {
        return serverError(error);
    }
}
