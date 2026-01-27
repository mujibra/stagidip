import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: { types: string } }) {
    try {
        const types = ctx.params.types;

        if (!types) {
            return NextResponse.json(
                {
                    success: false,
                    message: "get data list types not found",
                    data: [],
                },
                { status: 400 }
            );
        }

        const data = await prisma.setting_prestaging.findMany({
            where: { types },
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
