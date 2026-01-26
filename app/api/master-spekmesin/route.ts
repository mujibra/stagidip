import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterSpekMesinBody = {
    item?: string;
    description?: string;
};

export async function GET() {
    try {
        const records = await prisma.mst_spesifikasi_mesin.findMany({
            orderBy: { id: "asc" },
        });

        const grouped = new Map<string, typeof records>();

        records.forEach((record) => {
            const list = grouped.get(record.item) ?? [];
            list.push(record);
            grouped.set(record.item, list);
        });

        const data = Array.from(grouped.entries()).map(([item, items]) => ({
            item,
            items_data: items,
        }));

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<MasterSpekMesinBody>(req);
        const item = (body.item ?? "").trim();

        if (!item) {
            return validationError({ item: ["Item wajib diisi"] });
        }

        const created = await prisma.mst_spesifikasi_mesin.create({
            data: {
                item,
                description: body.description ?? "",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Spesifikasi Mesin inserted successfully.",
            data: toJsonSafe(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
