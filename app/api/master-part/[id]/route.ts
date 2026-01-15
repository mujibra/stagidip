import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { parseBody } from "@/lib/parseBody";

type UpdatePartDTO = {
    part_desc?: string;
    status?: number;
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const body = await parseBody<UpdatePartDTO>(req);

        if (!body.part_desc && body.status === undefined) {
            return validationError({
                _form: ["Tidak ada data yang diupdate"],
            });
        }

        const updated = await prisma.mst_part_number.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({
            success: true,
            message: `PartNumber ${updated.part_no} updated successfully.`,
            data: {
                ...updated,
                id: updated.id.toString(),
            },
        });
    } catch (error) {
        return serverError(error);
    }
}
