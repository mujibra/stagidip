import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId, serializeMany } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const mesinId = searchParams.get("mesinId");
        const status = searchParams.get("status");
        const type = searchParams.get("type");
        const search = searchParams.get("search") ?? "";
        const page = Number(searchParams.get("page") ?? 1);
        const perPage = Number(searchParams.get("perPage") ?? 10);

        const where: Record<string, unknown> = {};

        if (mesinId) where.id_mesin = Number(mesinId);
        if (type) where.types = type;
        if (status) where.status = status === "ACTIVE" ? 1 : 0;
        if (search) where.part_desc = { contains: search };

        const [data, total] = await Promise.all([
            prisma.mst_part_number.findMany({
                where,
                skip: (page - 1) * perPage,
                take: perPage,
                orderBy: [{ id_mesin: "asc" }, { format: "desc" }, { position: "asc" }],
            }),
            prisma.mst_part_number.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            data: serializeMany(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

type CreatePartDTO = {
    id_mesin: number;
    part_no?: string;
    part_desc?: string;
    status: number;
    types: "MESIN" | "PART_MESIN";
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreatePartDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.id_mesin) errors.id_mesin = ["Mesin wajib diisi"];
        if (body.status === undefined) errors.status = ["Status wajib diisi"];
        if (!body.types) errors.types = ["Type wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        // MESIN logic (1 active only)
        if (body.types === "MESIN" && body.status === 1) {
            const exists = await prisma.mst_part_number.findFirst({
                where: {
                    id_mesin: body.id_mesin,
                    status: 1,
                    types: "MESIN",
                },
            });

            if (exists) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Hanya boleh 1 PartNumber Mesin aktif",
                    },
                    { status: 400 }
                );
            }
        }

        const created = await prisma.mst_part_number.create({
            data: body,
        });

        return NextResponse.json({
            success: true,
            message: `Part Number ${created.part_no} created successfully.`,
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
