import test from "node:test";
import assert from "node:assert/strict";

import {
    mergeErrors,
    parseUserRoleFilter,
    parseUserStatusFilter,
    resolvePicApprovalRole,
    resolvePicMitraRole,
    validateUserLoginParam,
} from "@/lib/http/userQueryValidation";

test("resolvePicApprovalRole validates known type", () => {
    assert.equal(resolvePicApprovalRole("dip").role, "OPERATOR_DIP");
    assert.deepEqual(resolvePicApprovalRole("x").errors.type, ["type tidak valid"]);
});

test("resolvePicMitraRole validates known type", () => {
    assert.equal(resolvePicMitraRole("staging").role, "OPERATOR_DIP");
    assert.deepEqual(resolvePicMitraRole("x").errors.type, ["type tidak valid"]);
});

test("validateUserLoginParam enforces positive integer", () => {
    assert.deepEqual(validateUserLoginParam("10"), {});
    assert.deepEqual(validateUserLoginParam("0").id_user_login, ["id_user_login tidak valid"]);
});

test("user list query filters validate role/status", () => {
    assert.equal(parseUserStatusFilter("1").status, 1);
    assert.deepEqual(parseUserStatusFilter("2").errors.status, ["status filter tidak valid"]);

    assert.equal(parseUserRoleFilter("admin").role, "ADMIN");
    assert.deepEqual(parseUserRoleFilter("hacker").errors.roles, ["roles filter tidak valid"]);

    const merged = mergeErrors(parseUserStatusFilter("2").errors, parseUserRoleFilter("hacker").errors);
    assert.deepEqual(Object.keys(merged).sort(), ["roles", "status"]);
});
