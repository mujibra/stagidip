import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

export async function GET() {
    try {
        const list = await prisma.pic_mitra.findMany({ orderBy: { created_at: "desc" } });

        return NextResponse.json({
            success: true,
            totalDatas: list.length,
            data: list.map((x) => ({ ...x, id: String(x.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{ name?: string }>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Pic mitra tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const now = new Date();
        const created = await prisma.pic_mitra.create({ data: { name: body.name!.trim(), created_at: now, updated_at: now } });

        return NextResponse.json({
            success: true,
            message: "Pic mitra baru berhasil ditambahkan",
            data: { ...created, id: String(created.id) },
        });
    } catch (error) {
        return serverError(error);
    }
}
