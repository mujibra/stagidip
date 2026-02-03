import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateInfoBody = {
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

        const inspeksi = await prisma.mst_inspeksi.findFirst({ where: { id } });

        if (!inspeksi) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Success to show data inspeksi",
            data: toJsonSafe(parseJson(inspeksi.in_out_info)),
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
        const body = await parseBody<UpdateInfoBody>(req);
        const info = body.in_out_info ?? "";

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Mst Inspeksi not found." },
                { status: 404 }
            );
        }

        if (!info) {
            return NextResponse.json(
                {
                    success: false,
                    message: {
                        in_out_info: ["in_out_info is required"],
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
            data: { in_out_info: info },
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

        await prisma.mst_inspeksi.update({
            where: { id },
            data: { in_out_info: "{\"label\":\"\",\"option\": []}" },
        });

        return NextResponse.json({
            success: true,
            message: "Mst Inspeksi delete successfully.",
        });
    } catch (error) {
        return serverError(error);
    }
}
