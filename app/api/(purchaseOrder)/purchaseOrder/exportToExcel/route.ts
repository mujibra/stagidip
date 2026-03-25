import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

export async function GET() {
    try {
        const rows = await prisma.tbl_po.findMany({
            where: { deleted_at: null },
            select: { id: true, no_po: true, id_po_master: true, jumlah: true, status_mesin: true, created_at: true },
            orderBy: { id: "desc" },
            take: 1000,
        });

        const header = ["id", "no_po", "id_po_master", "jumlah", "status_mesin", "created_at"];
        const lines = rows.map((row) => [row.id, row.no_po ?? "", row.id_po_master ?? "", row.jumlah, row.status_mesin ?? "", row.created_at?.toISOString?.() ?? ""].join(","));
        const csv = [header.join(","), ...lines].join("\n");

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": 'attachment; filename="purchase-order-export.csv"',
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
