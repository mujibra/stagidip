import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function yyyymm(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}

function monthNameFromYYYYMM(v: string) {
    const [y, m] = v.split("-").map(Number);
    const dt = new Date(y, (m ?? 1) - 1, 1);
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(dt);
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ month_from: string; month_to: string }> }
) {
    try {
        const { month_from, month_to } = await params;

        // Build list_month similar to Laravel (last 5 months + next month)
        const list_month: string[] = [];
        const now = new Date();

        for (let i = 5; i > 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            list_month.push(yyyymm(d));
        }
        // push next month after the 5th (same idea as Laravel)
        const last = list_month[list_month.length - 1];
        const [ly, lm] = last.split("-").map(Number);
        list_month.push(yyyymm(new Date(ly, lm, 1)));

        // Get banks that exist in tbl_po
        let banksSql = `
            SELECT DISTINCT mc.id, mc.bank_desc
            FROM tbl_po po
            JOIN mst_customer mc ON po.customer = mc.id
            WHERE po.deleted_at IS NULL
        `;
        if (month_from !== "null" && month_to !== "null") {
            banksSql += ` AND DATE_FORMAT(STR_TO_DATE(po.tgl_po,'%Y-%m-%d'), '%Y-%m') BETWEEN '${month_from}' AND '${month_to}'`;
        }

        const banks = (await prisma.$queryRawUnsafe<{ id: number; bank_desc: string }[]>(banksSql)) ?? [];

        // Aggregate totals by customer+month in one query
        let aggSql = `
            SELECT
                        po.customer AS id_customer,
                        DATE_FORMAT(STR_TO_DATE(po.tgl_po,'%Y-%m-%d'), '%Y-%m') AS periode,
                        SUM(po.jumlah) AS total_mesin
                    FROM tbl_po po
                    WHERE po.deleted_at IS NULL
                        AND po.tgl_po IS NOT NULL
                `;
        if (month_from !== "null" && month_to !== "null") {
            aggSql += ` AND DATE_FORMAT(STR_TO_DATE(po.tgl_po,'%Y-%m-%d'), '%Y-%m') BETWEEN '${month_from}' AND '${month_to}'`;
        }
        aggSql += `
            GROUP BY po.customer, periode
        `;

        const agg = (await prisma.$queryRawUnsafe<{ id_customer: number; periode: string; total_mesin: number }[]>(aggSql)) ?? [];
        const aggMap = new Map(agg.map((r) => [`${r.id_customer}|${r.periode}`, Number(r.total_mesin ?? 0)]));

        const datas_per_month: Array<{
            periode: string;
            id_bank: number;
            bank: string;
            bulan: string;
            total_mesin: number;
        }> = [];

        for (const periode of list_month) {
            for (const bank of banks) {
                const key = `${bank.id}|${periode}`;
                const total = aggMap.get(key) ?? 0;

                datas_per_month.push({
                    periode,
                    id_bank: bank.id,
                    bank: bank.bank_desc,
                    bulan: monthNameFromYYYYMM(periode),
                    total_mesin: total,
                });
            }
        }

        return NextResponse.json({
            success: true,
            data: toJsonSafe(datas_per_month),
        });
    } catch (e) {
        return serverError(e);
    }
}
