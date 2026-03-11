import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DB_CHECK_TIMEOUT_MS = 3000;

function hasRequiredDbEnv() {
    const required = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    return required.every((key) => Boolean(process.env[key]));
}

async function runDbHealthCheck() {
    const { prisma } = await import("@/lib/prisma");

    await Promise.race([
        prisma.$queryRaw`SELECT 1`,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Database health check timed out")), DB_CHECK_TIMEOUT_MS);
        }),
    ]);
}

function healthResponse(body: Record<string, unknown>, status: number) {
    return NextResponse.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}

export async function GET() {
    const startedAt = Date.now();

    if (!hasRequiredDbEnv()) {
        return healthResponse(
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
            200
        );
    }

    try {
        await runDbHealthCheck();

        return healthResponse(
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
            200
        );
    } catch {
        return healthResponse(
            {
                status: "error",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                checks: {
                    db: {
                        status: "error",
                        message: "Database connectivity check failed",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            503
        );
    }
}
