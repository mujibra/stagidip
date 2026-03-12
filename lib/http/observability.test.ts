import test from "node:test";
import assert from "node:assert/strict";

import { NextRequest } from "next/server";

import { createApiRequestContext } from "@/lib/http/observability";

test("createApiRequestContext reuses incoming request id header", () => {
    const req = new NextRequest("http://localhost/api/health", {
        method: "GET",
        headers: { "x-request-id": "req-abc" },
    });

    const ctx = createApiRequestContext(req, "api.health.GET");
    assert.equal(ctx.requestId, "req-abc");
});

test("createApiRequestContext emits structured completion logs", () => {
    const req = new NextRequest("http://localhost/api/purchaseOrder", {
        method: "POST",
    });

    const originalInfo = console.info;
    const entries: string[] = [];
    console.info = (...args: unknown[]) => {
        entries.push(String(args[0] ?? ""));
    };

    try {
        const ctx = createApiRequestContext(req, "api.purchaseOrder.POST");
        ctx.done("request.completed", { statusCode: 200 });
    } finally {
        console.info = originalInfo;
    }

    assert.equal(entries.length, 1);
    const payload = JSON.parse(entries[0] ?? "{}");
    assert.equal(typeof payload.timestamp, "string");
    assert.equal(payload.level, "info");
    assert.equal(payload.event, "request.completed");
    assert.equal(payload.scope, "api.purchaseOrder.POST");
    assert.equal(payload.method, "POST");
    assert.equal(payload.pathname, "/api/purchaseOrder");
    assert.equal(typeof payload.requestId, "string");
    assert.equal(payload.statusCode, 200);
    assert.equal(typeof payload.durationMs, "number");
});
