import test from "node:test";
import assert from "node:assert/strict";

import {
    hasValidationErrors,
    isPrismaNotFoundError,
    mergeValidationBags,
    toDate,
    toNumber,
    validatePositiveId,
} from "@/lib/http/validation";

test("core numeric/date parsing helpers work", () => {
    assert.equal(toNumber("10"), 10);
    assert.equal(toNumber(""), null);
    assert.equal(toDate("2026-01-01")?.toISOString().startsWith("2026-01-01"), true);
    assert.equal(toDate("bad-date"), null);
});

test("validation bag composition and detection", () => {
    const errors = mergeValidationBags(
        validatePositiveId("0", "id", "ID invalid"),
        validatePositiveId("3", "page", "Page invalid")
    );

    assert.equal(hasValidationErrors(errors), true);
    assert.deepEqual(errors.id, ["ID invalid"]);
    assert.equal(errors.page, undefined);
});

test("isPrismaNotFoundError detects P2025 safely", () => {
    assert.equal(isPrismaNotFoundError({ code: "P2025" }), true);
    assert.equal(isPrismaNotFoundError({ code: "P2002" }), false);
    assert.equal(isPrismaNotFoundError("x"), false);
});
