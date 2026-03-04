import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { normalizeNoteDescription, validatePoMesinParams } from "@/lib/http/purchaseOrderRuntimeValidation";

export const runtime = "nodejs";

type UpdateNotesBody = {
    note_description?: string;
};

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const params = await context.params;
        const errors = validatePoMesinParams(params.idPo, params.idMesin);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = toNumber(params.idPo)!;
        const idMesin = toNumber(params.idMesin)!;
        const body = await parseBody<UpdateNotesBody>(req);
        const note = normalizeNoteDescription(body.note_description);

        const sql = `update crt_${idPo} set NOTES = ? where id = ?`;
        await prisma.$executeRawUnsafe(sql, note, idMesin);

        return NextResponse.json({
            success: true,
            message: "Notes machine SN is successfully updated",
        });
    } catch (error) {
        return serverError(error);
    }
}
