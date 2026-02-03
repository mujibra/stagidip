import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateMstInspeksiBody = {
    general_desc?: string;
    type_atm?: string;
    in_out_info?: string;
};

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

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

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = toNumber((await context.params).id);
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        const [models, inspeksi] = await Promise.all([
            prisma.models.findMany({
                where: { id: { notIn: [BigInt(1), BigInt(3)] } },
            }),
            prisma.mst_inspeksi.findFirst({ where: { id } }),
        ]);

        if (!inspeksi) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        const modelMap = new Map(models.map((model) => [model.name, model.id]));
        const data = {
            ...inspeksi,
            in_out_info: parseJson(inspeksi.in_out_info),
            type_atm: mapTypes(inspeksi.type_atm ?? "", modelMap),
        };

        return NextResponse.json({
            success: true,
            message: "Success to show data inspeksi",
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = toNumber((await context.params).id);
        const body = await parseBody<UpdateMstInspeksiBody>(req);
        const generalDesc = (body.general_desc ?? "").trim();
        const typeAtm = (body.type_atm ?? "").trim();
        const inOutInfo = body.in_out_info ?? "";

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        if (!generalDesc || !typeAtm || !inOutInfo) {
            return NextResponse.json(
                {
                    success: false,
                    message: {
                        general_desc: generalDesc ? [] : ["general_desc is required"],
                        type_atm: typeAtm ? [] : ["type_atm is required"],
                        in_out_info: inOutInfo ? [] : ["in_out_info is required"],
                    },
                },
                { status: 422 }
            );
        }

        const exists = await prisma.mst_inspeksi.findFirst({ where: { id } });
        if (!exists) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        await prisma.mst_inspeksi.update({
            where: { id },
            data: {
                general_desc: generalDesc,
                orderby_atms: id,
                orderby_crms: id,
                orderby_cskios: id,
                model_mesin: null,
                type_atm: typeAtm,
                in_out_info: inOutInfo,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Mst Inspeksi updated successfully.",
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = toNumber((await context.params).id);
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        const exists = await prisma.mst_inspeksi.findFirst({ where: { id } });
        if (!exists) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        await prisma.mst_inspeksi.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: "Mst Inspeksi deleted successfully.",
        });
    } catch (error) {
        return serverError(error);
    }
}
