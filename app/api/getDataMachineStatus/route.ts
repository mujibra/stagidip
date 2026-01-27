import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function formatYMD(d: Date) {
    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    return `${y}-${m}-${day}`;
}

function startOfMonth(year: number, month: number) {
    return new Date(year, month - 1, 1);
}

function endOfMonth(year: number, month: number) {
    return new Date(year, month, 0);
}

// Mirrors DashboardController@getDataMachineStatus
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);

        const now = new Date();
        const month = Number(url.searchParams.get("month") ?? pad2(now.getMonth() + 1));
        const year = Number(url.searchParams.get("year") ?? String(now.getFullYear()));

        const start = startOfMonth(year, month);
        let end = endOfMonth(year, month);

        // If current month/year, end at today.
        if (year === now.getFullYear() && month === now.getMonth() + 1) end = now;

        const startStr = formatYMD(start);
        const endStr = formatYMD(end);

        const baseSql = `
            SELECT
                DATE(STR_TO_DATE(tgl_staging, '%Y-%m-%d')) AS tanggal,
                SUM(jumlah) AS jml
            FROM tbl_po
            WHERE deleted_at IS NULL
                AND tgl_staging IS NOT NULL
                AND STR_TO_DATE(tgl_staging, '%Y-%m-%d') <= CURDATE()
                AND STR_TO_DATE(tgl_staging, '%Y-%m-%d') BETWEEN '${startStr}' AND '${endStr}'
                AND status_mesin = ?
            GROUP BY tanggal
            ORDER BY tanggal
        `;

        const newRows = (await prisma.$queryRawUnsafe<{ tanggal: string; jml: number }[]>(baseSql, "New Machine")) ?? [];

        const oldRows = (await prisma.$queryRawUnsafe<{ tanggal: string; jml: number }[]>(baseSql, "Old Machine")) ?? [];

        const mapNew = new Map(newRows.map((r) => [String(r.tanggal), Number(r.jml ?? 0)]));
        const mapOld = new Map(oldRows.map((r) => [String(r.tanggal), Number(r.jml ?? 0)]));

        type MachineStatus = { tanggal: string; jumlah: string };
        const data_range = { new_machine: [] as MachineStatus[], old_machine: [] as MachineStatus[] };

        // Build full date range
        const cursor = new Date(start);
        while (cursor <= end) {
            const t = formatYMD(cursor);

            data_range.new_machine.push({ tanggal: t, jumlah: String(mapNew.get(t) ?? 0) });
            data_range.old_machine.push({ tanggal: t, jumlah: String(mapOld.get(t) ?? 0) });

            cursor.setDate(cursor.getDate() + 1);
        }

        return NextResponse.json({ data_range: toJsonSafe(data_range) });
    } catch (e) {
        return serverError(e);
    }
}
