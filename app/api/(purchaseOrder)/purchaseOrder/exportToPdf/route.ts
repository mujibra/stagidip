import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

export async function GET() {
    try {
        const total = await prisma.tbl_po.count({ where: { deleted_at: null } });
        const summary = [`Purchase Order Export`, `Generated: ${new Date().toISOString()}`, `Total Records: ${total}`].join("\n");

        return new NextResponse(summary, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="purchase-order-export.pdf"',
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
