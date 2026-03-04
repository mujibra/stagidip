import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, validationError, serverError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const batch = await prisma.bacth_po.findUnique({ where: { id: toNumber(id)! } });
        if (!batch) return notFoundError("Data batch tidak ditemukan", { data: "" });

        return NextResponse.json({ success: true, message: "Detail data batch", data: serializeId(batch) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data batch tidak ditemukan", { data: "" });
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<{ name?: string }>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Batch tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const idNum = toNumber(id)!;
        const name = body.name!.trim();
        const exists = await prisma.bacth_po.findFirst({ where: { name, NOT: { id: idNum } } });
        if (exists) return badRequestError("Nama Batch sudah ada, harap masukkan Nama Batch lain", { data: "" });

        const updated = await prisma.bacth_po.update({ where: { id: idNum }, data: { name } });

        return NextResponse.json({ success: true, message: "Bacth berhasil di update", data: serializeId(updated) });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data batch tidak ditemukan", { data: "" });
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idErrors = validateMasterIdParam(id);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idNum = toNumber(id)!;
        const used = await prisma.tbl_po.findFirst({ where: { batch: idNum }, select: { id: true } });
        if (used) {
            const batch = await prisma.bacth_po.findUnique({ where: { id: idNum }, select: { name: true } });
            return badRequestError(`${batch?.name ?? "Batch"} Gagal di hapus`);
        }

        const deleted = await prisma.bacth_po.delete({ where: { id: idNum } });

        return NextResponse.json({ success: true, message: "Data berhasil di hapus", data: serializeId(deleted) });
    } catch (error) {
        return serverError(error);
    }
}
