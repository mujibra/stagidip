import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

type ParentRow = Awaited<ReturnType<typeof prisma.mst_parent_type_spesifikasi_msn.findMany>>[number];

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

            const { type_atm, ...clean } = row;

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

        const errors: Record<string, string[]> = {};
        if (!body.parent) errors.parent = ["Parent wajib diisi"];
        if (!body.type_atm) errors.type_atm = ["Type ATM wajib diisi"];

        if (Object.keys(errors).length > 0) {
            return validationError(errors);
        }

        const created = await prisma.mst_parent_type_spesifikasi_msn.create({
            data: {
                parent: body.parent!,
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
