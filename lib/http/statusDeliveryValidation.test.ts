import test from "node:test";
import assert from "node:assert/strict";

import {
    normalizeNullableText,
    normalizeSnMesin,
    validateStatusDeliveryPayload,
} from "@/lib/http/statusDeliveryValidation";

test("normalize helpers trim and nullify empty values", () => {
    assert.equal(normalizeSnMesin(" SN-01 "), "SN-01");
    assert.equal(normalizeSnMesin(undefined), "");
    assert.equal(normalizeNullableText("  note  "), "note");
    assert.equal(normalizeNullableText("   "), null);
});

test("validateStatusDeliveryPayload enforces required fields", () => {
    const errors = validateStatusDeliveryPayload({ id_po: "", id_mesin: 0, sn_mesin: " " });

    assert.deepEqual(errors.id_po, ["PO wajib diisi"]);
    assert.deepEqual(errors.id_mesin, ["Mesin wajib diisi"]);
    assert.deepEqual(errors.sn_mesin, ["SN Mesin wajib diisi"]);
});

test("validateStatusDeliveryPayload passes valid payload", () => {
    const errors = validateStatusDeliveryPayload({ id_po: 1, id_mesin: 2, sn_mesin: "SN123" });

    assert.equal(Object.keys(errors).length, 0);
});
