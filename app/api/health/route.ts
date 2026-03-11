import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function hasRequiredDbEnv() {
    const required = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    return required.every((key) => Boolean(process.env[key]));
}

export async function GET() {
    const startedAt = Date.now();

    if (!hasRequiredDbEnv()) {
        return NextResponse.json(
            {
                status: "degraded",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                checks: {
                    db: {
                        status: "skipped",
                        message: "Missing one or more DB_* environment variables",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            { status: 200 }
        );
    }

    try {
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json(
            {
                status: "ok",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                checks: {
                    db: {
                        status: "ok",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            { status: 200 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown DB error";

        return NextResponse.json(
            {
                status: "error",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                checks: {
                    db: {
                        status: "error",
                        message,
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            { status: 503 }
        );
    }
}
