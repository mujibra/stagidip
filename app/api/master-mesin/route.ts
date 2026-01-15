import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

// GET /api/master-mesin  (index)
export async function GET() {
    try {
        const machines = await prisma.mst_mesin.findMany();

        // Attach model detail for each mesin (like Laravel loop)
        const safeMachine = machines.map((machine) => ({
            ...machine,
            id: machine.id.toString(),
        }));

        return NextResponse.json({
            success: true,
            totalDatas: safeMachine.length,
            data: safeMachine,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

// POST /api/master-mesin  (store)
export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<{
            merek: string;
            model: number;
            type: string;
            // other fields if they exist in your prisma schema
        }>(req);

        const { merek, model, type, ...rest } = body;

        const numberModel = Number(model);

        const errors: Record<string, string[]> = {};
        if (!merek) errors.merek = ["Merek tidak boleh kosong !"];
        if (!model) errors.model = ["Model tidak boleh kosong !"];
        if (!type) errors.type = ["Type tidak boleh kosong"];

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(errors, { status: 400 });
        }

        const input = {
            merek,
            model: numberModel,
            type,
            status: "NEW_MODEL",
            ...rest,
        };

        try {
            const mesin = await prisma.mst_mesin.create({ data: input });

            return NextResponse.json({
                success: true,
                message: "Mesin created successfully.",
                data: {
                    ...mesin,
                    id: mesin.id.toString(),
                },
            });
        } catch (err: unknown) {
            // Unique constraint, etc
            const msg = err instanceof Error ? err.message : "Terjadi kesalahan pada database";

            if (msg.includes("Unique constraint failed")) {
                return NextResponse.json(
                    {
                        errorMessage: `Model Mesin ${type} sudah ada, Harap Isi Nama Model dengan nama lain`,
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json({ errorMessage: msg }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
