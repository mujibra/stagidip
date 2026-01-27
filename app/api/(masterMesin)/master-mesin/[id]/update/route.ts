import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type UpdateMesinDTO = {
    merek?: string;
    model?: number;
    type?: string;
};

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const id = Number(ctx.params.id);
        const body = await parseBody<UpdateMesinDTO & Record<string, unknown>>(req);

        const merek = String(body.merek ?? "").trim();
        const model = body.model;
        const type = String(body.type ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!merek) errors.merek = ["Merek tidak boleh kosong !"];
        if (!model) errors.model = ["Model tidak boleh kosong !"];
        if (!type) errors.type = ["Type tidak boleh kosong"];
        if (Object.keys(errors).length) return validationError(errors);

        const { merek: _m, model: _mo, type: _t, ...rest } = body;

        try {
            const updated = await prisma.mst_mesin.update({
                where: { id },
                data: {
                    merek,
                    model: Number(model),
                    type,
                    ...rest,
                },
            });

            return NextResponse.json({
                success: true,
                message: "Data berhasil diupdate",
                data: { ...updated, id: String(updated.id) },
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Terjadi kesalahan pada database";
            if (msg.includes("Unique constraint failed")) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Model Mesin ${type} sudah ada, Harap Isi Nama Model dengan nama lain`,
                    },
                    { status: 400 }
                );
            }
            return NextResponse.json({ success: false, message: msg }, { status: 400 });
        }
    } catch (error) {
        return serverError(error);
    }
}
