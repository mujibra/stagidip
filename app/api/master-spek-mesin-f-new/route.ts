import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";
import { mergeValidationBags, hasValidationErrors, validatePositiveId } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const { skip, take } = getPagination(searchParams);

        const rows = await prisma.mst_spesifikasi_mesin_fnew.findMany({
            skip,
            take,
        });

        const typeIds = [...new Set(rows.map((r) => r.item_id))];

        const types = await prisma.mst_type_spesifikasi_msn.findMany({
            where: { id: { in: typeIds } },
        });

        const typeMap = new Map(types.map((t) => [t.id, t]));

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: rows.map((r) => ({
                ...r,
                id: String(r.id),
                type: typeMap.get(r.item_id) ?? null,
            })),
        });
    } catch (error) {
        return serverError(error);
    }
}

type CreateSpekMesinDTO = {
    item_id?: number;
    item_code?: string;
    description?: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateSpekMesinDTO>(req);

        const errors = mergeValidationBags(
            validatePositiveId(body.item_id, "item_id", "Item ID wajib diisi"),
            validateRequiredName(body.item_code, "item_code", "Item Code wajib diisi"),
            validateRequiredName(body.description, "description", "Description wajib diisi")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const item_code = body.item_code!.trim();
        const description = body.description!.trim();

        const childExists = await prisma.mst_type_spesifikasi_msn.findFirst({
            where: {
                id: body.item_id,
                val: item_code,
            },
        });

        if (!childExists) return notFoundError("Child Item was Not Found.", { data: [] });

        const created = await prisma.mst_spesifikasi_mesin_fnew.create({
            data: {
                item_id: body.item_id!,
                item_code,
                description,
            },
        });

        return NextResponse.json({
            success: true,
            message: "List of Machine Specification inserted successfully.",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
