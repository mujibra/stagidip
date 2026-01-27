import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

// Mirrors DashboardController@getData3TopByCustomer
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const yearRaw = url.searchParams.get("year") ?? "";
        const year = yearRaw && /^\d{4}$/.test(yearRaw) ? yearRaw : "";

        // tgl_po is string in DB; assume 'YYYY-MM-DD' stored. Use STR_TO_DATE for safety.
        const sql = `
            SELECT
                cust.id,
                cust.bank_desc,
                CAST(SUM(po.jumlah) AS SIGNED) AS total_mesin_per_customer
            FROM mst_customer cust
            JOIN tbl_po po ON po.customer = cust.id
            WHERE po.deleted_at IS NULL
                ${year ? `AND YEAR(STR_TO_DATE(po.tgl_po, '%Y-%m-%d')) = ${year}` : ""}
            GROUP BY cust.id, cust.bank_desc
            HAVING total_mesin_per_customer IS NOT NULL
            ORDER BY total_mesin_per_customer DESC
            LIMIT 3
        `;

        type TopCustomerRow = {
            id: number;
            bank_desc: string;
            total_mesin_per_customer: number;
        };

        const rows = (await prisma.$queryRawUnsafe<TopCustomerRow[]>(sql)) ?? [];
        console.log("🚀 ~ GET ~ rows:", rows);

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: toJsonSafe(rows),
        });
    } catch (e) {
        return serverError(e);
    }
}
