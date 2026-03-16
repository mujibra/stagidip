import { randomUUID } from "node:crypto";

import type { NextRequest } from "next/server";

const REQUEST_ID_HEADERS = ["x-correlation-id", "x-request-id"] as const;

type LogLevel = "info" | "warn" | "error";

type RequestLogContext = {
    requestId: string;
    scope: string;
    method: string;
    pathname: string;
};

function normalizeRequestId(raw: string | null): string | null {
    if (!raw) return null;
    const value = raw.trim();
    if (!value) return null;
    if (value.length > 128) return value.slice(0, 128);
    return value;
}

function resolveRequestId(req: NextRequest): string {
    for (const header of REQUEST_ID_HEADERS) {
        const candidate = normalizeRequestId(req.headers.get(header));
        if (candidate) return candidate;
    }
    return randomUUID();
}

function nowIso(): string {
    return new Date().toISOString();
}

function log(level: LogLevel, event: string, context: RequestLogContext, data?: Record<string, unknown>) {
    const payload = {
        timestamp: nowIso(),
        level,
        event,
        ...context,
        ...(data ?? {}),
    };

    const output = JSON.stringify(payload);
    if (level === "error") {
        console.error(output);
        return;
    }

    if (level === "warn") {
        console.warn(output);
        return;
    }

    console.info(output);
}

function serializeError(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
        const err = error as Error & { code?: string };
        return {
            errorName: err.name,
            errorCode: err.code,
            errorMessage: err.message,
        };
    }

    return {
        errorName: "UnknownError",
        errorMessage: String(error),
    };
}

export function createApiRequestContext(req: NextRequest, scope: string) {
    const startedAt = Date.now();
    const context: RequestLogContext = {
        requestId: resolveRequestId(req),
        scope,
        method: req.method,
        pathname: req.nextUrl.pathname,
    };

    return {
        requestId: context.requestId,
        info(event: string, data?: Record<string, unknown>) {
            log("info", event, context, data);
        },
        warn(event: string, data?: Record<string, unknown>) {
            log("warn", event, context, data);
        },
        error(event: string, error: unknown, data?: Record<string, unknown>) {
            log("error", event, context, {
                ...serializeError(error),
                ...(data ?? {}),
            });
        },
        done(event = "request.completed", data?: Record<string, unknown>) {
            log("info", event, context, {
                durationMs: Date.now() - startedAt,
                ...(data ?? {}),
            });
        },
    };
}
