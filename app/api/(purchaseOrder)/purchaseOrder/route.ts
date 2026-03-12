import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverErrorWithRequestId, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { getPagination } from "@/lib/http/pagination";
import { createApiRequestContext } from "@/lib/http/observability";
import {
    normalizeCopyFromIdPo,
    normalizeSnMesins,
    PurchaseOrderCreateBody,
    validatePurchaseOrderCreatePayload,
} from "@/lib/http/purchaseOrderValidation";

export const runtime = "nodejs";

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function GET(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.purchaseOrder.GET");

    try {
        const { searchParams } = new URL(req.url);
        const { skip, take, page, perPage } = getPagination(searchParams);

        const [rows, total] = await Promise.all([
            prisma.tbl_po.findMany({
                skip,
                take,
                orderBy: { id: "desc" },
            }),
            prisma.tbl_po.count(),
        ]);

        requestContext.done("request.completed", { statusCode: 200, totalDatas: total, page, perPage });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                totalDatas: total,
                totalPages: Math.ceil(total / perPage),
                page,
                perPage,
                data: toJsonSafe(rows),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("purchase_order.list_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}

export async function POST(req: NextRequest) {
    const requestContext = createApiRequestContext(req, "api.purchaseOrder.POST");

    try {
        const body = await parseBody<PurchaseOrderCreateBody>(req);
        const payloadErrors = validatePurchaseOrderCreatePayload(body);

        if (hasValidationErrors(payloadErrors)) {
            requestContext.warn("purchase_order.validation_failed", { reason: "payload_invalid" });
            return validationError(payloadErrors);
        }

        const jumlah = toNumber(body.jumlah)!;
        const idTypeMesin = toNumber(body.id_type_mesin)!;
        const model = toNumber(body.model)!;
        const customer = toNumber(body.customer);

        const [hasPartMesin, hasPart] = await Promise.all([
            prisma.mst_part_number.findFirst({ where: { id_mesin: idTypeMesin, types: "PART_MESIN", deleted_at: null } }).then(Boolean),
            prisma.mst_part_number.findFirst({ where: { id_mesin: idTypeMesin, types: "MESIN", deleted_at: null } }).then(Boolean),
        ]);

        if (!hasPartMesin || !hasPart) {
            const mstMesin = await prisma.mst_mesin.findFirst({ where: { id: idTypeMesin } });
            requestContext.warn("purchase_order.validation_failed", { reason: "missing_part_number_registration", idTypeMesin });
            return validationError({
                id_type_mesin: [`Silahkan untuk melakukan Registrasi Part Number untuk mesin ${mstMesin?.type ?? ""}`],
            });
        }

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
            idTypeMesin,
        );

        if (existsPair.length === 0) {
            requestContext.warn("purchase_order.validation_failed", { reason: "invalid_model_type_pair", idTypeMesin, model });
            return validationError({
                model: ["Staging Registration PO was Error !! Please check Types and Models."],
            });
        }

        const snMesins = normalizeSnMesins(body.sn_mesins);

        const createdPo = await prisma.tbl_po.create({
            data: {
                ...body,
                jumlah,
                id_type_mesin: idTypeMesin,
                model,
                customer: customer ?? undefined,
                sn_mesins: snMesins,
                copy_from_id_po: normalizeCopyFromIdPo(body.copy_from_id_po),
            } as never,
        });

        const idStaging = createdPo.id;
        const tableName = `crt_${idStaging}`;

        const parts = await prisma.mst_part_number.findMany({
            where: { id_mesin: idTypeMesin, status: 1, deleted_at: null },
            select: { part_column: true },
        });

        const partColumns = parts.map((p) => p.part_column).filter((c): c is string => typeof c === "string" && c.length > 0);

        if (partColumns.length === 0) {
            requestContext.warn("purchase_order.validation_failed", { reason: "missing_part_columns", idTypeMesin });
            return validationError({ id_type_mesin: ["No part columns found for this machine"] });
        }

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

        for (let i = 0; i < partColumns.length; i += 1) {
            const col = partColumns[i];
            await prisma.$executeRawUnsafe(`ALTER TABLE ${tableName} ADD CONSTRAINT serial_unix_${i} UNIQUE (${col})`);
        }

        const insertCols = partColumns.join(",");
        const placeholders = partColumns.map(() => "NULL").join(",");
        const insertSql = `INSERT INTO ${tableName} (${insertCols}) VALUES (${placeholders})`;

        for (let i = 0; i < jumlah; i += 1) {
            await prisma.$executeRawUnsafe(insertSql);
        }

        requestContext.done("request.completed", { statusCode: 200, createdPoId: createdPo.id, jumlah });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                message: "Staging Registration PO created successfully",
                data: toJsonSafe(createdPo),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("purchase_order.create_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
