import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type WsInfoBody = {
    ws_id?: string;
    ws_name?: string;
    serial_number?: string;
    model?: string | number;
    ticket?: string;
    installation_date?: string;
};

function toDate(value: unknown): Date | null {
    if (!value) return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET() {
    try {
        const rows = await prisma.mst_ws_info.findMany({
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: toJsonSafe(rows),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
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

        const serial_number = (body.serial_number ?? "").trim();
        if (serial_number) {
            const exists = await prisma.mst_ws_info.count({ where: { serial_number } });
            if (exists > 0) {
                return NextResponse.json({
                    success: false,
                    message: `WS Information with SerialNumber = ${serial_number} was exists.`,
                });
            }
        }

        await prisma.mst_ws_info.create({
            data: {
                ws_id,
                ws_name,
                serial_number: serial_number || null,
                model: body.model !== undefined && body.model !== null && body.model !== "" ? Number(body.model) : null,
                ticket: body.ticket ?? null,
                installation_date: toDate(body.installation_date) ?? undefined,
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
