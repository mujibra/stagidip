import { NextRequest, NextResponse } from "next/server";

import { parseBody } from "@/lib/parseBody";
import { prisma } from "@/lib/prisma";
import { serverError, validationError, notFoundError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPoTableName, getTableColumns, tableExists, toPositiveInt } from "@/lib/services/purchaseOrderTable";

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

        const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
            `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,
            rowNumNum,
        );

        if (!rows.length) {
            return notFoundError("Data baris tidak ditemukan");
        }

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

        const body = await parseBody<Record<string, unknown>>(req);
        const tableName = getPoTableName(idPoNum);

        if (!(await tableExists(tableName))) {
            return notFoundError("Table purchase order tidak ditemukan");
        }

        const columns = (await getTableColumns(tableName)).map((item) => item.COLUMN_NAME);
        const updatableColumns = Object.entries(body).filter(([key]) => key !== "id" && columns.includes(key));

        if (!updatableColumns.length) {
            return validationError({ body: ["Tidak ada field valid untuk diupdate"] });
        }

        const setClause = updatableColumns.map(([key]) => `${key} = ?`).join(", ");
        const values = updatableColumns.map(([, value]) => value);

        await prisma.$executeRawUnsafe(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`, ...values, rowNumNum);

        const updatedRows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
            `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,
            rowNumNum,
        );

        if (!updatedRows.length) {
            return notFoundError("Data baris tidak ditemukan");
        }

        return NextResponse.json({ success: true, message: "Baris berhasil diupdate", data: toJsonSafe(updatedRows[0]) });
    } catch (error) {
        return serverError(error);
    }
}
