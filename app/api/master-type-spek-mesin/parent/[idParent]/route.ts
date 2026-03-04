import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ idParent: string }> }) {
    try {
        const { idParent } = await params;
        const idErrors = validateMasterIdParam(idParent);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const body = await parseBody<{ val?: string; label?: string }>(req);

        const errors = {
            ...validateRequiredName(body.val, "val", "Val tidak boleh kosong"),
            ...validateRequiredName(body.label, "label", "Label tidak boleh kosong"),
        };

        if (hasValidationErrors(errors)) return validationError(errors);

        const idParentNum = toNumber(idParent)!;
        const parentExists = await prisma.mst_parent_type_spesifikasi_msn.findUnique({ where: { id: idParentNum } });

        if (!parentExists) return notFoundError("Insert Child Type Specification Machine was Error !!");

        const created = await prisma.mst_type_spesifikasi_msn.create({
            data: {
                id_parent: idParentNum,
                val: body.val!.trim(),
                label: body.label!.trim(),
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
