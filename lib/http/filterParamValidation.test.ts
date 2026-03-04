import test from "node:test";
import assert from "node:assert/strict";

import {
    parseNullableDateRangeParam,
    parseNullableParam,
    parseNullablePositiveIntParam,
} from "@/lib/http/filterParamValidation";

test("parseNullableParam handles legacy 'null' token", () => {
    assert.equal(parseNullableParam("null"), null);
    assert.equal(parseNullableParam("abc"), "abc");
});

test("parseNullablePositiveIntParam validates positive integers", () => {
    const valid = parseNullablePositiveIntParam("12", "idPo");
    const nullable = parseNullablePositiveIntParam("null", "idPo");
    const invalid = parseNullablePositiveIntParam("-1", "idPo");

    assert.equal(valid.value, 12);
    assert.equal(Object.keys(valid.errors).length, 0);
    assert.equal(nullable.value, null);
    assert.equal(Object.keys(nullable.errors).length, 0);
    assert.deepEqual(invalid.errors.idPo, ["idPo tidak valid"]);
});

test("parseNullableDateRangeParam validates and builds range", () => {
    const valid = parseNullableDateRangeParam("2026-01-01", "tgl_tiba");
    const invalid = parseNullableDateRangeParam("not-date", "tgl_tiba");

    assert.equal(valid.range?.start.toISOString().startsWith("2026-01-01"), true);
    assert.equal(valid.range?.end.getTime(), (valid.range?.start?.getTime() ?? 0) + 24 * 60 * 60 * 1000);
    assert.deepEqual(invalid.errors.tgl_tiba, ["tgl_tiba tidak valid"]);
});
