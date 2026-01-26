import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

// Mirrors Laravel DeliveryRequestController@getAllDeliveryRequest
export async function GET() {
    try {
        const rows = await prisma.delivery_request.findMany({
            orderBy: { id: "desc" },
        });

        return NextResponse.json({ success: true, totalDatas: rows.length, data: toJsonSafe(rows) });
    } catch (e) {
        return serverError(e);
    }
}
