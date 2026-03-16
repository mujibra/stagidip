import { NextRequest, NextResponse } from "next/server";

import { createApiRequestContext } from "@/lib/http/observability";

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

function healthResponse(body: Record<string, unknown>, status: number, requestId: string) {
    return NextResponse.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",
            "X-Request-ID": requestId,
        },
    });
}

export async function GET(req: NextRequest) {
    const ctx = createApiRequestContext(req, "api.health.GET");
    const startedAt = Date.now();

    if (!hasRequiredDbEnv()) {
        ctx.warn("health.db.skipped_missing_env");
        ctx.done("request.completed", { statusCode: 200, healthStatus: "degraded" });
        return healthResponse(
            {
                status: "degraded",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                requestId: ctx.requestId,
                checks: {
                    db: {
                        status: "skipped",
                        message: "Missing one or more DB_* environment variables",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            200,
            ctx.requestId
        );
    }

    try {
        await runDbHealthCheck();
        ctx.done("request.completed", { statusCode: 200, healthStatus: "ok" });
        return healthResponse(
            {
                status: "ok",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                requestId: ctx.requestId,
                checks: {
                    db: {
                        status: "ok",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            200,
            ctx.requestId
        );
    } catch (error) {
        ctx.error("health.db.check_failed", error);
        ctx.done("request.completed", { statusCode: 503, healthStatus: "error" });
        return healthResponse(
            {
                status: "error",
                service: "stagidip-api",
                timestamp: new Date().toISOString(),
                requestId: ctx.requestId,
                checks: {
                    db: {
                        status: "error",
                        message: "Database connectivity check failed",
                    },
                },
                responseTimeMs: Date.now() - startedAt,
            },
            503,
            ctx.requestId
        );
    }
}
