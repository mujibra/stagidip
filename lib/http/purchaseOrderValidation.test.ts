import test from "node:test";
import assert from "node:assert/strict";

import {
    cleanJsonString,
    normalizeCopyFromIdPo,
    normalizeSnMesins,
    validatePurchaseOrderCreatePayload,
} from "@/lib/http/purchaseOrderValidation";

test("purchase-order normalization helpers work", () => {
    assert.equal(cleanJsonString('\\\\"ABC\\\\"'), '"ABC"');
    assert.equal(normalizeSnMesins("[]"), null);
    assert.equal(normalizeSnMesins('["SN1"]'), '["SN1"]');
    assert.equal(normalizeCopyFromIdPo("12"), 12);
    assert.equal(normalizeCopyFromIdPo("null"), null);
    assert.equal(normalizeCopyFromIdPo("abc"), null);
});

test("purchase-order create validation catches required fields", () => {
    const errors = validatePurchaseOrderCreatePayload({ jumlah: "", id_type_mesin: "0", model: undefined });

    assert.deepEqual(errors.jumlah, ["jumlah is required"]);
    assert.deepEqual(errors.id_type_mesin, ["id_type_mesin is required"]);
    assert.deepEqual(errors.model, ["model is required"]);
});
