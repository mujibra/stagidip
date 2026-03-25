import { NextRequest, NextResponse } from "next/server";

import { parseBody } from "@/lib/parseBody";
import { prisma } from "@/lib/prisma";
import { notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getMachineColumns, getPoTableName, getTableColumns, tableExists, toPositiveInt } from "@/lib/services/purchaseOrderTable";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string; rowNum: string }> }) {
    try {
        const { idPo, rowNum } = await context.params;
        const idPoNum = toPositiveInt(idPo);
        const rowNumNum = toPositiveInt(rowNum);

        if (!idPoNum || !rowNumNum) {
            return validationError({ id: ["idPo atau rowNum tidak valid"] });
        }

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) {
            return notFoundError("Table purchase order tidak ditemukan");
        }

        const columns = (await getTableColumns(tableName)).map((item) => item.COLUMN_NAME);
        const machineColumns = getMachineColumns(columns);

        if (!machineColumns.length) {
            return notFoundError("Kolom SN mesin tidak ditemukan");
        }

        const selectCols = machineColumns.join(", ");
        const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
            `SELECT id, ${selectCols} FROM ${tableName} WHERE id = ? LIMIT 1`,
            rowNumNum,
        );

        if (!rows.length) return notFoundError("Data baris tidak ditemukan");

        return NextResponse.json({ success: true, data: toJsonSafe(rows[0]) });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ idPo: string; rowNum: string }> }) {
    try {
        const { idPo, rowNum } = await context.params;
        const idPoNum = toPositiveInt(idPo);
        const rowNumNum = toPositiveInt(rowNum);

        if (!idPoNum || !rowNumNum) {
            return validationError({ id: ["idPo atau rowNum tidak valid"] });
        }

        const body = await parseBody<{ snMesin?: string }>(req);
        const snMesin = body.snMesin?.trim();
        if (!snMesin) {
            return validationError({ snMesin: ["snMesin tidak boleh kosong"] });
        }

        const tableName = getPoTableName(idPoNum);
        if (!(await tableExists(tableName))) {
            return notFoundError("Table purchase order tidak ditemukan");
        }

        const columns = (await getTableColumns(tableName)).map((item) => item.COLUMN_NAME);
        const machineColumns = getMachineColumns(columns);
        if (!machineColumns.length) {
            return notFoundError("Kolom SN mesin tidak ditemukan");
        }

        const targetColumn = machineColumns[0];
        await prisma.$executeRawUnsafe(`UPDATE ${tableName} SET ${targetColumn} = ? WHERE id = ?`, snMesin, rowNumNum);

        const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
            `SELECT id, ${targetColumn} FROM ${tableName} WHERE id = ? LIMIT 1`,
            rowNumNum,
        );

        if (!rows.length) return notFoundError("Data baris tidak ditemukan");

        return NextResponse.json({ success: true, message: "SN mesin berhasil diupdate", data: toJsonSafe(rows[0]) });
    } catch (error) {
        return serverError(error);
    }
}
