import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdatePartDTO = {
    id_mesin?: number;
    part_no?: string | null;
    part_desc?: string | null;
    part_column?: string | null;
    status?: number;
    types?: "MESIN" | "PART_MESIN";
    format?: string | null;
    position?: number | null;
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id);
        const body = await parseBody<UpdatePartDTO>(req);

        if (Number.isNaN(id)) {
            return validationError({ id: ["Invalid id"] });
        }

        const hasAnyField =
            body.id_mesin !== undefined ||
            body.part_no !== undefined ||
            body.part_desc !== undefined ||
            body.part_column !== undefined ||
            body.status !== undefined ||
            body.types !== undefined ||
            body.format !== undefined ||
            body.position !== undefined;

        if (!hasAnyField) {
            return validationError({ _form: ["Tidak ada data yang diupdate"] });
        }

        // If activating MESIN, enforce "only 1 active"
        if (body.types === "MESIN" && body.status === 1 && body.id_mesin) {
            const exists = await prisma.mst_part_number.findFirst({
                where: {
                    id_mesin: body.id_mesin,
                    types: "MESIN",
                    status: 1,
                    NOT: { id },
                },
                select: { id: true },
            });

            if (exists) {
                const mesin = await prisma.mst_mesin.findUnique({
                    where: { id: body.id_mesin },
                    select: { type: true },
                });

                return NextResponse.json(
                    {
                        success: false,
                        message: `PartNumber Mesin dengan Type ${mesin?.type ?? ""} hanya boleh 1 yang aktif`,
                    },
                    { status: 400 },
                );
            }
        }

        const data: Prisma.mst_part_numberUpdateInput = {};
        if (body.id_mesin !== undefined) data.id_mesin = body.id_mesin;
        if (body.part_no !== undefined) data.part_no = body.part_no ?? null;
        if (body.part_desc !== undefined) data.part_desc = body.part_desc ?? null;
        if (body.part_column !== undefined && body.part_column !== null) data.part_column = body.part_column;
        if (body.status !== undefined) data.status = body.status;
        if (body.types !== undefined) data.types = body.types;
        if (body.format !== undefined) data.format = body.format ?? null;
        if (body.position !== undefined) data.position = body.position ?? null;

        const updated = await prisma.mst_part_number.update({
            where: { id },
            data,
        });

        return NextResponse.json({
            success: true,
            message: `PartNumber ${updated.part_no ?? ""} - ${updated.part_desc ?? ""} updated successfully.`,
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id);
        if (Number.isNaN(id)) return validationError({ id: ["Invalid id"] });

        const deleted = await prisma.mst_part_number.delete({ where: { id } });

        return NextResponse.json(
            {
                success: true,
                message: `Data PartNumber ${deleted.part_no ?? ""}-${deleted.part_desc ?? ""} berhasil dihapus`,
                data: serializeId(deleted),
            },
            { status: 200 },
        );
    } catch (error) {
        return serverError(error);
    }
}
