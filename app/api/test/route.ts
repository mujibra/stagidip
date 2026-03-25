import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
    const startedAt = Date.now();

    try {
        await prisma.$queryRawUnsafe("SELECT 1");

        return NextResponse.json({
            success: true,
            message: "API is healthy",
            route: "/test",
            database: "connected",
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startedAt,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "API is unhealthy",
                route: "/test",
                database: "disconnected",
                timestamp: new Date().toISOString(),
                durationMs: Date.now() - startedAt,
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
