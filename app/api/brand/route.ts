import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId, serializeMany } from "@/lib/serialize";
export const runtime = "nodejs";

export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: brands.length,
            data: serializeMany(brands),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const name = String(form.get("name") || "").trim();

        const errors: Record<string, string[]> = {};
        if (!name) errors.name = ["Brand tidak boleh kosong"];

        if (Object.keys(errors).length) return validationError(errors);

        const existed = await prisma.brand.findFirst({ where: { name } });
        if (existed) {
            return validationError({ name: ["Brand sudah ada, tidak boleh sama"] });
        }

        const brand = await prisma.brand.create({ data: { name } });

        return NextResponse.json({
            success: true,
            message: "Brand baru berhasil di tambahkan",
            data: serializeId(brand),
        });
    } catch (error) {
        return serverError(error);
    }
}
