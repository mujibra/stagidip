import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type UpdateNotesBody = {
    note_description?: string;
};

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ idPo: string; idMesin: string }> }
) {
    try {
        const idPo = toNumber((await context.params).idPo);
        const idMesin = toNumber((await context.params).idMesin);
        const body = await parseBody<UpdateNotesBody>(req);
        const note = body.note_description ?? "";

        if (!idPo || !idMesin) {
            return NextResponse.json(
                { success: false, message: "Notes  machine SN is failed." },
                { status: 400 }
            );
        }

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
