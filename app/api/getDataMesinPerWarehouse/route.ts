import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

// Mirrors DashboardController@getDataMesinPerWarehouse
type MesinPerWarehouseRow = {
    gudang_id: number;
    gudang_name: string;
    jumlah: number;
};

export async function GET() {
    try {
        const sql = `
            SELECT
                gdg.id AS gudang_id,
                gdg.gudang_desc AS gudang_name,
                (COALESCE(po.jml_mesin, 0) + COALESCE(wout.jml_keluar, 0) + COALESCE(win.jml_masuk, 0)) AS jumlah
            FROM mst_gudang gdg
            LEFT JOIN (
                SELECT nama_gudang, SUM(jumlah) AS jml_mesin
                FROM tbl_po
                WHERE deleted_at IS NULL
                GROUP BY nama_gudang
            ) po ON po.nama_gudang = gdg.id
            LEFT JOIN (
                SELECT from_warehouse, -SUM(jumlah) AS jml_keluar
                FROM warehouse_transfer
                GROUP BY from_warehouse
            ) wout ON wout.from_warehouse = gdg.id
            LEFT JOIN (
                SELECT to_warehouse, SUM(jumlah) AS jml_masuk
                FROM warehouse_transfer
                GROUP BY to_warehouse
            ) win ON win.to_warehouse = gdg.id
        `;

        const rows = (await prisma.$queryRawUnsafe<MesinPerWarehouseRow[]>(sql)) ?? [];

        return NextResponse.json({
            success: true,
            totalDatas: rows.length,
            data: toJsonSafe(rows),
        });
    } catch (e) {
        return serverError(e);
    }
}
