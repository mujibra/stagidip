import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type WsInfoBody = {
    ws_id?: string;
    ws_name?: string;
};

export async function POST(req: NextRequest, ctx: { params: Promise<{ snNumber: string; model: string }> }) {
    try {
        const body = await parseBody<WsInfoBody>(req);
        const ws_id = (body.ws_id ?? "").trim();
        const ws_name = (body.ws_name ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!ws_id) errors.ws_id = ["WS ID wajib diisi"];
        if (!ws_name) errors.ws_name = ["WS Name wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const serial_number = (await ctx.params).snNumber;
        const modelValue = Number((await ctx.params).model);

        const exists = await prisma.mst_ws_info.count({ where: { serial_number } });
        if (exists > 0) {
            return NextResponse.json({
                success: false,
                message: `WS Information with SerialNumber = ${serial_number} was exists.`,
            });
        }

        await prisma.mst_ws_info.create({
            data: {
                serial_number,
                model: Number.isNaN(modelValue) ? null : modelValue,
                ws_id,
                ws_name,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Information WS inserted successfully.",
        });
    } catch (error) {
        return serverError(error);
    }
}
