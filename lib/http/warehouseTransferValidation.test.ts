import test from "node:test";
import assert from "node:assert/strict";

import { hasValidationErrors, mergeValidationBags, toDate, toNumber, validatePositiveId } from "@/lib/http/validation";
import { normalizeSnMesins, normalizeSnMesinsOptional, parseSnMesins } from "@/lib/http/warehouseTransferValidation";

test("toNumber parses valid values and rejects empty/non-number", () => {
    assert.equal(toNumber("12"), 12);
    assert.equal(toNumber(3), 3);
    assert.equal(toNumber(""), null);
    assert.equal(toNumber(undefined), null);
    assert.equal(toNumber("abc"), null);
});

test("toDate parses valid ISO and rejects invalid", () => {
    assert.equal(toDate("2026-01-01")?.toISOString().startsWith("2026-01-01"), true);
    assert.equal(toDate("invalid-date"), null);
    assert.equal(toDate(undefined), null);
});

test("sn_mesins normalization/parsing is stable", () => {
    assert.equal(normalizeSnMesins(["A", "B"]), '["A","B"]');
    assert.equal(normalizeSnMesins("raw"), "raw");
    assert.equal(normalizeSnMesinsOptional(undefined), undefined);
    assert.deepEqual(parseSnMesins('["X","Y"]'), ["X", "Y"]);
    assert.deepEqual(parseSnMesins("broken"), []);
});

test("validation bag helpers collect field errors", () => {
    const errors = mergeValidationBags(validatePositiveId("0", "id", "ID invalid"), validatePositiveId("2", "rowPerPage", "Row invalid"));

    assert.equal(hasValidationErrors(errors), true);
    assert.deepEqual(errors.id, ["ID invalid"]);
    assert.equal(errors.rowPerPage, undefined);
});
