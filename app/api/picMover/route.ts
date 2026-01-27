import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type PicMoverBody = {
    gudang?: string;
    pic_mover?: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<PicMoverBody>(req);
        const gudang = (body.gudang ?? "").trim();
        const pic_mover = (body.pic_mover ?? "").trim();

        const errors: Record<string, string[]> = {};
        if (!gudang) errors.gudang = ["Gudang wajib diisi"];
        if (!pic_mover) errors.pic_mover = ["PIC mover wajib diisi"];

        if (Object.keys(errors).length) {
            return validationError(errors);
        }

        const created = await prisma.pic_mover.create({
            data: {
                gudang,
                pic_mover,
            },
        });

        return NextResponse.json({
            success: true,
            message: "PIC Mover created successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
