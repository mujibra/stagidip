import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId, serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateBacthDTO = { name?: string };

export async function GET() {
    try {
        const bacths = await prisma.bacth_po.findMany();

        return NextResponse.json({
            success: true,
            message: "Data semua bacth",
            totalDatas: bacths.length,
            data: serializeMany(bacths),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateBacthDTO>(req);
        const nameErrors = validateRequiredName(body.name, "name", "Batch tidak boleh kosong");
        if (hasValidationErrors(nameErrors)) return validationError(nameErrors);

        const name = body.name!.trim();
        const exists = await prisma.bacth_po.findFirst({ where: { name } });
        if (exists) return badRequestError("Nama Batch sudah ada, harap masukkan Nama Batch lain", { data: "" });

        const created = await prisma.bacth_po.create({ data: { name } });

        return NextResponse.json({
            success: true,
            message: "Bacth baru berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
