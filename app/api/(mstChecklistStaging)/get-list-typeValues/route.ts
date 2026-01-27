import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { serializeMany } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const rows = await prisma.mst_type_value_checklist.findMany({
            orderBy: { id: "desc" },
        });

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: serializeMany(rows),
        });
    } catch (error) {
        return serverError(error);
    }
}
