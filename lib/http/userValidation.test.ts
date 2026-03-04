import test from "node:test";
import assert from "node:assert/strict";

import {
    hasAnyErrors,
    toBigIntId,
    toNullableInt,
    validateUpdateUserPayload,
    validateUserRouteParams,
} from "@/lib/http/userValidation";

test("user id/int parsers validate positive integer semantics", () => {
    assert.equal(toBigIntId("10"), 10n);
    assert.equal(toBigIntId("0"), null);
    assert.equal(toBigIntId("x"), null);

    assert.equal(toNullableInt("5"), 5);
    assert.equal(toNullableInt(""), null);
    assert.equal(toNullableInt("1.5"), null);
});

test("user route param validation collects errors", () => {
    const errors = validateUserRouteParams("0", "");
    assert.equal(hasAnyErrors(errors), true);
    assert.deepEqual(errors.id, ["Invalid user id"]);
    assert.deepEqual(errors.user_login, ["Invalid user login id"]);
});

test("update payload validation requires role", () => {
    const invalid = validateUpdateUserPayload({ roles: "" });
    const valid = validateUpdateUserPayload({ roles: "ADMIN" });

    assert.equal(hasAnyErrors(invalid), true);
    assert.deepEqual(invalid.roles, ["Roles wajib dipilih"]);
    assert.equal(Object.keys(valid).length, 0);
});
