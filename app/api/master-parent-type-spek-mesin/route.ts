import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";
import { hasValidationErrors, mergeValidationBags } from "@/lib/http/validation";
import { validateRequiredArray, validateRequiredName } from "@/lib/http/masterDataValidation";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type TypeAtmItem = {
    type: string;
    [key: string]: unknown;
};

export async function GET() {
    try {
        const rows = await prisma.mst_parent_type_spesifikasi_msn.findMany();

        const data = rows.map((row) => {
            if (!row.type_atm) {
                return {
                    ...row,
                    id: String(row.id),
                };
            }

            const parsed = JSON.parse(row.type_atm) as TypeAtmItem[];

            const data_type = parsed.map(({ type, ...rest }) => ({
                name: type,
                ...rest,
            }));

            const clean = { ...row };
            delete clean.type_atm;

            return {
                ...clean,
                id: String(row.id),
                data_type,
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data,
        });
    } catch (error) {
        return serverError(error);
    }
}

type CreateParentTypeDTO = {
    parent?: string;
    type_atm?: unknown[];
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateParentTypeDTO>(req);

        const errors = mergeValidationBags(
            validateRequiredName(body.parent, "parent", "Parent wajib diisi"),
            validateRequiredArray(body.type_atm, "type_atm", "Type ATM wajib diisi")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const created = await prisma.mst_parent_type_spesifikasi_msn.create({
            data: {
                parent: body.parent!.trim(),
                type_atm: JSON.stringify(body.type_atm),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Insert Parent Type Specification Machine created successfully.",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
