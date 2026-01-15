import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type CreateMesinDTO = {
    merek?: string;
    model?: number;
    type?: string;
    [key: string]: unknown;
};

export async function GET() {
    try {
        const machines = await prisma.mst_mesin.findMany();
        return NextResponse.json({
            success: true,
            totalDatas: machines.length,
            data: machines.map((m) => ({ ...m, id: String(m.id) })),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateMesinDTO>(req);
        const merek = (body.merek ?? "").trim();
        const model = body.model;
        const type = (body.type ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!merek) errors.merek = ["Merek tidak boleh kosong !"];
        if (!model) errors.model = ["Model tidak boleh kosong !"];
        if (!type) errors.type = ["Type tidak boleh kosong"];
        if (Object.keys(errors).length) return validationError(errors);

        const data = {
            merek,
            model: Number(model),
            type,
            status: "NEW_MODEL",
        };

        try {
            const mesin = await prisma.mst_mesin.create({ data });
            return NextResponse.json({
                success: true,
                message: "Mesin created successfully.",
                data: { ...mesin, id: String(mesin.id) },
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Terjadi kesalahan pada database";
            if (msg.includes("Unique constraint failed")) {
                return NextResponse.json({ success: false, message: `Model Mesin ${type} sudah ada, Harap Isi Nama Model dengan nama lain` }, { status: 400 });
            }
            return NextResponse.json({ success: false, message: msg }, { status: 400 });
        }
    } catch (error) {
        return serverError(error);
    }
}
