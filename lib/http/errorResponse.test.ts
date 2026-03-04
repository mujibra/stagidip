import test from "node:test";
import assert from "node:assert/strict";

import { badRequestError, notFoundError, validationError } from "@/lib/http/errorResponse";

test("validationError returns typed 400 envelope", async () => {
    const response = validationError({ id: ["id tidak valid"] });
    assert.equal(response.status, 400);

    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.type, "VALIDATION_ERROR");
    assert.deepEqual(body.errors, { id: ["id tidak valid"] });
});

test("badRequestError returns typed 400 envelope", async () => {
    const response = badRequestError("duplicate value", { data: "" });
    assert.equal(response.status, 400);

    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.type, "BAD_REQUEST");
    assert.equal(body.message, "duplicate value");
    assert.equal(body.data, "");
});

test("notFoundError returns typed 404 envelope", async () => {
    const response = notFoundError("not found", { data: [] });
    assert.equal(response.status, 404);

    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.type, "NOT_FOUND");
    assert.equal(body.message, "not found");
    assert.deepEqual(body.data, []);
});
