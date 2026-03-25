import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateBacthDTO = { name?: string };
type BatchUpdateItem = { id?: number | string; name?: string };

function toBatchId(value: number | string | undefined) {
    const id = typeof value === "number" ? value : Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET() {
    try {
        const bacths = await prisma.bacth_po.findMany();

        return NextResponse.json({
            success: true,
            message: "Data semua bacth",
            totalDatas: bacths.length,
            data: serializeMany(bacths),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateBacthDTO>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Batch tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const name = body.name!.trim();
        const exists = await prisma.bacth_po.findFirst({ where: { name } });
        if (exists) return badRequestError("Nama Batch sudah ada, harap masukkan Nama Batch lain", { data: "" });

        const created = await prisma.bacth_po.create({ data: { name } });

        return NextResponse.json({
            success: true,
            message: "Bacth baru berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await parseBody<{ items?: BatchUpdateItem[] }>(req);
        const items = Array.isArray(body.items) ? body.items : [];

        if (!items.length) {
            return validationError({ items: ["items wajib diisi minimal 1 data"] });
        }

        const results = await Promise.all(
            items.map(async (item) => {
                const id = toBatchId(item.id);
                const name = item.name?.trim();

                if (!id) {
                    return {
                        id: item.id ?? null,
                        success: false,
                        message: "ID batch tidak valid",
                    };
                }

                if (!name) {
                    return {
                        id,
                        success: false,
                        message: "Nama Batch tidak boleh kosong",
                    };
                }

                const duplicate = await prisma.bacth_po.findFirst({
                    where: { name, NOT: { id } },
                    select: { id: true },
                });

                if (duplicate) {
                    return {
                        id,
                        success: false,
                        message: "Nama Batch sudah digunakan",
                    };
                }

                const existing = await prisma.bacth_po.findUnique({ where: { id }, select: { id: true } });
                if (!existing) {
                    return {
                        id,
                        success: false,
                        message: "Data batch tidak ditemukan",
                    };
                }

                const updated = await prisma.bacth_po.update({ where: { id }, data: { name } });

                return {
                    id,
                    success: true,
                    message: "Batch berhasil diupdate",
                    data: serializeId(updated),
                };
            }),
        );

        const total = results.length;
        const updated = results.filter((item) => item.success).length;
        const failed = total - updated;
        const progressPercentage = Number(((updated / total) * 100).toFixed(2));

        return NextResponse.json({
            success: failed === 0,
            message: "Batch update selesai",
            total,
            updated,
            failed,
            progressPercentage,
            results,
        });
    } catch (error) {
        return serverError(error);
    }
}
