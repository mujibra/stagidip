import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

const SN_COL_CANDIDATES = ["ATM_MESIN", "CRM_MESIN", "TCR_MESIN", "CS_KIOS_MESIN", "VBK_MESIN", "NEW_MESIN"] as const;

type ColumnRow = { Field: string };

function safeInt(v: string | null) {
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// Mirrors DashboardController@getDataProjectStatus
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const month = safeInt(url.searchParams.get("month"));
        const year = safeInt(url.searchParams.get("year"));

        const customers = await prisma.mst_customer.findMany({
            select: { id: true, bank_desc: true },
        });

        type CustomerStatus = {
            id: number;
            bank_desc: string;
            jumlah: number;
            total_mesin: number;
            persentase: number;
        };
        const out: CustomerStatus[] = [];

        for (const cust of customers) {
            // Build PO list with month/year filters (tgl_staging is string)
            // We use raw SQL to mimic Laravel's whereYear/whereMonth behavior on string.
            const whereParts: string[] = ["deleted_at IS NULL", "customer = ?", "tgl_staging IS NOT NULL"];
            const params: (string | number)[] = [cust.id];

            if (year && month) {
                whereParts.push("YEAR(STR_TO_DATE(tgl_staging, '%Y-%m-%d')) = ?");
                whereParts.push("MONTH(STR_TO_DATE(tgl_staging, '%Y-%m-%d')) = ?");
                params.push(year, month);
            } else if (year) {
                whereParts.push("YEAR(STR_TO_DATE(tgl_staging, '%Y-%m-%d')) = ?");
                params.push(year);
            } else if (month) {
                whereParts.push("MONTH(STR_TO_DATE(tgl_staging, '%Y-%m-%d')) = ?");
                params.push(month);
            }

            const poSql = `
        SELECT id, jumlah
        FROM tbl_po
        WHERE ${whereParts.join(" AND ")}
      `;
            const poRows = (await prisma.$queryRawUnsafe<{ id: number; jumlah: number }[]>(poSql, ...params)) ?? [];

            const totalMesin = poRows.reduce((acc, r) => acc + Number(r.jumlah ?? 0), 0);

            let installedCount = 0;

            for (const po of poRows) {
                const tableName = `crt_${po.id}`;

                // detect which SN column exists in crt_{id}
                const cols = (await prisma.$queryRawUnsafe<ColumnRow[]>(`SHOW COLUMNS FROM ${tableName}`)) ?? [];
                const colSet = new Set(cols.map((c) => c.Field));

                const snCol = SN_COL_CANDIDATES.find((c) => colSet.has(c));
                if (!snCol) continue;

                // Pull all SNs for the PO (1..jumlah). Laravel loops row-by-row; we don't.
                const sns = (await prisma.$queryRawUnsafe<{ sn: string | null }[]>(`SELECT ${snCol} AS sn FROM ${tableName} WHERE id BETWEEN 1 AND ? AND ${snCol} IS NOT NULL`, po.jumlah)) ?? [];

                const snList = sns.map((x) => x.sn).filter((s): s is string => !!s);
                if (snList.length === 0) continue;

                const cnt = await prisma.mst_ws_info.count({
                    where: { serial_number: { in: snList }, installation_date: { not: null } },
                });

                installedCount += cnt;
            }

            const persentase = totalMesin !== 0 ? (installedCount * 100) / totalMesin : 0;

            out.push({
                id: cust.id,
                bank_desc: cust.bank_desc,
                jumlah: installedCount,
                total_mesin: totalMesin,
                persentase,
            });
        }

        return NextResponse.json({
            datas_per_customer: toJsonSafe(out),
        });
    } catch (e) {
        return serverError(e);
    }
}
