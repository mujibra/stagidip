import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type PurchaseOrderCreateBody = {
    jumlah?: number | string;
    id_type_mesin?: number | string;
    model?: number | string;
    customer?: number | string;
    sn_mesins?: string; // Laravel uses JSON string sometimes
    copy_from_id_po?: string | number | null;
    // plus other tbl_po fields (we pass-through safely)
    [k: string]: unknown;
};

function toNumber(v: unknown): number | null {
    const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
    return Number.isFinite(n) ? n : null;
}

function cleanJsonString(v: string): string {
    // Laravel: str_replace("\\", "", input)
    return v.replace(/\\\\/g, "");
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<PurchaseOrderCreateBody>(req);

        const jumlah = toNumber(body.jumlah);
        const id_type_mesin = toNumber(body.id_type_mesin);
        const model = toNumber(body.model);
        const customer = toNumber(body.customer);

        if (!jumlah || jumlah <= 0) {
            return NextResponse.json({ success: false, message: "jumlah is required" }, { status: 400 });
        }
        if (!id_type_mesin || !model) {
            return NextResponse.json({ success: false, message: "id_type_mesin and model are required" }, { status: 400 });
        }

        // Check master part prereq (Laravel checks types PART_MESIN and MESIN exist)
        const [hasPartMesin, hasPart] = await Promise.all([
            prisma.mst_part_number.findFirst({ where: { id_mesin: id_type_mesin, types: "PART_MESIN", deleted_at: null } }).then(Boolean),
            prisma.mst_part_number.findFirst({ where: { id_mesin: id_type_mesin, types: "MESIN", deleted_at: null } }).then(Boolean),
        ]);

        if (!hasPartMesin || !hasPart) {
            const mstMesin = await prisma.mst_mesin.findFirst({ where: { id: id_type_mesin } });
            return NextResponse.json(
                {
                    success: false,
                    message: `Silahkan untuk melakukan Registrasi Part Number untuk mesin ${mstMesin?.type ?? ""}`,
                },
                { status: 400 },
            );
        }

        // Validate type-model pairing (Laravel raw query)
        const existsPair = await prisma.$queryRawUnsafe<Array<{ id_types: number }>>(
            `
            SELECT x.id_types
            FROM (
                SELECT m.id AS id_types, m.name AS types, mm.id AS id_model, mm.type AS models
                FROM models m, mst_mesin mm
                WHERE mm.model = m.id
            ) x
            WHERE x.id_types = ? AND x.id_model = ?
        `,
            model,
            id_type_mesin,
        );

        if (existsPair.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Staging Registration PO was Error !! Please check Types and Models.",
                },
                { status: 400 },
            );
        }

        // Normalize sn_mesins like Laravel
        const sn_mesins = typeof body.sn_mesins === "string" ? (body.sn_mesins === "[]" ? null : cleanJsonString(body.sn_mesins)) : null;

        // Create PO first
        const createdPo = await prisma.tbl_po.create({
            data: {
                ...body,
                jumlah,
                id_type_mesin,
                model,
                customer: customer ?? undefined,
                sn_mesins,
                copy_from_id_po: body.copy_from_id_po === "null" || body.copy_from_id_po === null ? null : (toNumber(body.copy_from_id_po) ?? null),
            } as never, // prisma typing depends on your generated client; this matches your project style when fields are many.
        });

        const idStaging = createdPo.id;
        const tableName = `crt_${idStaging}`;

        // Get active part columns
        const parts = await prisma.mst_part_number.findMany({
            where: { id_mesin: id_type_mesin, status: 1, deleted_at: null },
            select: { part_column: true },
        });

        const partColumns = parts.map((p) => p.part_column).filter((c): c is string => typeof c === "string" && c.length > 0);

        if (partColumns.length === 0) {
            return NextResponse.json({ success: false, message: "No part columns found for this machine" }, { status: 400 });
        }

        // Build CREATE TABLE like Laravel
        const mesinType = await prisma.models.findFirst({ where: { id: model }, select: { name: true } });
        const isBca = customer === 3;
        const isAtmOrCrm = (mesinType?.name ?? "") === "ATM" || (mesinType?.name ?? "") === "CRM";

        const mesinCols = new Set(["ATM_MESIN", "CRM_MESIN", "TCR_MESIN", "CS_KIOS_MESIN", "VBK_MESIN", "NEW_MESIN"]);

        const columnDefs: string[] = ["id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY"];
        for (const c of partColumns) {
            if (!mesinCols.has(c)) {
                if (isAtmOrCrm && isBca) {
                    columnDefs.push(`${c} varchar(50)`, `${c}_PN varchar(50)`, `${c}_PM varchar(100)`, `${c}_PARTNAME varchar(100)`);
                } else {
                    columnDefs.push(`${c} varchar(50)`, `${c}_PN varchar(50)`, `${c}_PM varchar(100)`);
                }
            } else {
                columnDefs.push(`${c} varchar(50)`);
            }
        }

        columnDefs.push("NO_BARIS_MESIN int(5)", "NOTES varchar(250)", "TIME_STAGING varchar(25)", "TIME_PRELOADING varchar(25)", "TIME_CHECKLIST varchar(25)", "STATUS_MESIN varchar(25)");

        await prisma.$executeRawUnsafe(`CREATE TABLE ${tableName} (${columnDefs.join(",")})`);

        // Add unique constraints (Laravel does for each column)
        for (let i = 0; i < partColumns.length; i += 1) {
            const col = partColumns[i];
            await prisma.$executeRawUnsafe(`ALTER TABLE ${tableName} ADD CONSTRAINT serial_unix_${i} UNIQUE (${col})`);
        }

        // Insert jumlah rows (empty)
        // We only insert the part columns, same as Laravel.
        const insertCols = partColumns.join(",");
        const placeholders = partColumns.map(() => "NULL").join(",");
        const insertSql = `INSERT INTO ${tableName} (${insertCols}) VALUES (${placeholders})`;

        for (let i = 0; i < jumlah; i += 1) {
            await prisma.$executeRawUnsafe(insertSql);
        }

        return NextResponse.json({
            success: true,
            message: "Staging Registration PO created successfully",
            data: toJsonSafe(createdPo),
        });
    } catch (error) {
        return serverError(error);
    }
}
