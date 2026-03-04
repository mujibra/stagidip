import test from "node:test";
import assert from "node:assert/strict";

import {
    normalizeNoteDescription,
    parseSnMesinItems,
    validateIdPoParam,
    validatePoMesinParams,
} from "@/lib/http/purchaseOrderRuntimeValidation";

test("purchase-order runtime id validators enforce positive IDs", () => {
    assert.deepEqual(validateIdPoParam("2"), {});
    assert.deepEqual(validateIdPoParam("0").idPo, ["idPo tidak valid"]);

    const pairInvalid = validatePoMesinParams("1", "0");
    assert.deepEqual(pairInvalid.idMesin, ["idMesin tidak valid"]);
});

test("normalizeNoteDescription trims and defaults", () => {
    assert.equal(normalizeNoteDescription("  hello  "), "hello");
    assert.equal(normalizeNoteDescription(null), "");
});

test("parseSnMesinItems accepts valid JSON payload and filters invalid entries", () => {
    const parsed = parseSnMesinItems(
        '[{"idMesin":1,"snMesin":"SN1"},{"idMesin":"x","snMesin":"SN2"},{"idMesin":2,"snMesin":"  SN2  "}]'
    );

    assert.deepEqual(parsed, [
        { idMesin: 1, snMesin: "SN1" },
        { idMesin: 2, snMesin: "SN2" },
    ]);
    assert.equal(parseSnMesinItems("bad-json"), null);
});
