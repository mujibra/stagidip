import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: { idParent: string } }) {
    try {
        const idParent = Number(params.idParent);
        const body = await parseBody<{ val?: string; label?: string }>(req);

        const errors: Record<string, string[]> = {};
        if (!body.val) errors.val = ["Val tidak boleh kosong"];
        if (!body.label) errors.label = ["Label tidak boleh kosong"];

        if (Object.keys(errors).length > 0) {
            return validationError(errors);
        }

        const parentExists = await prisma.mst_parent_type_spesifikasi_msn.findUnique({
            where: { id: idParent },
        });

        if (!parentExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Insert Child Type Specification Machine was Error !!",
                },
                { status: 400 }
            );
        }

        const created = await prisma.mst_type_spesifikasi_msn.create({
            data: {
                id_parent: idParent,
                val: body.val!,
                label: body.label!,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Insert Child Type Specification Machine created successfully.",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
