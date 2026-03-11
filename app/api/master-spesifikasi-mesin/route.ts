import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

// GET /api/master-spesifikasi-mesin?page=1&perPage=10
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take } = getPagination(searchParams);

        const [data, total] = await Promise.all([
            prisma.mst_spesifikasi_mesin.findMany({
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.mst_spesifikasi_mesin.count(),
        ]);

        const safeData = data.map((d) => ({
            ...d,
            id: String(d.id),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: total,
            data: safeData,
        });
    } catch (error) {
        return serverError(error);
    }
}

// POST /api/master-spesifikasi-mesin
export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{ item?: string; description?: string }>(req);
        const errors = validateRequiredName(body.item, "item", "Item tidak boleh kosong");
        if (hasValidationErrors(errors)) return validationError(errors);

        const spek = await prisma.mst_spesifikasi_mesin.create({
            data: {
                item: body.item!.trim(),
                description: body.description?.trim() || "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Spesifikasi Mesin inserted successfully.",
            data: serializeId(spek),
        });
    } catch (error) {
        return serverError(error);
    }
}
