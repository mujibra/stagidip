import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateMstInspeksiBody = {
    general_desc?: string;
    type_atm?: string;
};

function parseJson(value: string | null) {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function mapTypes(typeValue: string, modelMap: Map<string, bigint>) {
    const rawTypes = typeValue.split(",").map((t) => t.trim()).filter(Boolean);
    return rawTypes.map((type) => ({
        id: modelMap.get(type) ?? null,
        type_atm: type,
    }));
}

export async function GET() {
    try {
        const [models, inspeksi] = await Promise.all([
            prisma.models.findMany({
                where: { id: { notIn: [BigInt(1), BigInt(3)] } },
            }),
            prisma.mst_inspeksi.findMany({
                orderBy: { id: "asc" },
            }),
        ]);

        const modelMap = new Map(models.map((model) => [model.name, model.id]));

        const data = inspeksi.map((item) => ({
            ...item,
            in_out_info: parseJson(item.in_out_info),
            type_atm: mapTypes(item.type_atm ?? "", modelMap),
        }));

        return NextResponse.json({
            success: true,
            message: "Success to show data inspeksi",
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateMstInspeksiBody>(req);
        const generalDesc = (body.general_desc ?? "").trim();
        const typeAtm = (body.type_atm ?? "").trim();

        if (!generalDesc || !typeAtm) {
            return NextResponse.json(
                {
                    success: false,
                    message: {
                        general_desc: generalDesc ? [] : ["general_desc is required"],
                        type_atm: typeAtm ? [] : ["type_atm is required"],
                    },
                },
                { status: 422 }
            );
        }

        const created = await prisma.mst_inspeksi.create({
            data: {
                general_desc: generalDesc,
                orderby_atms: null,
                orderby_crms: null,
                orderby_cskios: null,
                model_mesin: null,
                type_atm: typeAtm,
                in_out_info: null,
            },
        });

        await prisma.mst_inspeksi.update({
            where: { id: created.id },
            data: {
                orderby_atms: created.id,
                orderby_crms: created.id,
                orderby_cskios: created.id,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Mst Inspeksi added successfully.",
        });
    } catch (error) {
        return serverError(error);
    }
}
