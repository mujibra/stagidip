import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";

type Row = Awaited<ReturnType<typeof prisma.mst_spesifikasi_mesin_fnew.findMany>>[number];

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") ?? 1);
        const perPage = Number(searchParams.get("perPage") ?? 10);

        const skip = (page - 1) * perPage;

        const rows = await prisma.mst_spesifikasi_mesin_fnew.findMany({
            skip,
            take: perPage,
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
                id: r.id.toString(),
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

        const errors: Record<string, string[]> = {};
        if (!body.item_id) errors.item_id = ["Item ID wajib diisi"];
        if (!body.item_code) errors.item_code = ["Item Code wajib diisi"];
        if (!body.description) errors.description = ["Description wajib diisi"];

        if (Object.keys(errors).length > 0) {
            return validationError(errors);
        }

        const childExists = await prisma.mst_type_spesifikasi_msn.findFirst({
            where: {
                id: body.item_id,
                val: body.item_code,
            },
        });

        if (!childExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Child Item was Not Found.",
                    data: [],
                },
                { status: 400 }
            );
        }

        const created = await prisma.mst_spesifikasi_mesin_fnew.create({
            data: {
                item_id: body.item_id!,
                item_code: body.item_code!,
                description: body.description!,
            },
        });

        return NextResponse.json({
            success: true,
            message: "List of Machine Specification inserted successfully.",
            data: {
                ...created,
                id: created.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
