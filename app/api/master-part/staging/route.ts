import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const mesinId = Number(searchParams.get("mesinId"));
        const customerId = Number(searchParams.get("customerId"));

        const [parts, mesin, customer] = await Promise.all([
            prisma.mst_part_number.findMany({ where: { id_mesin: mesinId } }),
            prisma.mst_mesin.findUnique({ where: { id: mesinId } }),
            prisma.mst_customer.findUnique({ where: { id: customerId } }),
        ]);

        const data = parts.map((p) => ({
            ...p,
            mesin_type: mesin?.type,
            bank_desc: customer?.bank_desc,
            scan_barcode: "",
        }));

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data,
        });
    } catch (error) {
        return serverError(error);
    }
}
