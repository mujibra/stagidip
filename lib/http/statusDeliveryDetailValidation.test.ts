import test from "node:test";
import assert from "node:assert/strict";

import {
    normalizeNullableText,
    normalizeStatus,
    validateStatusDeliveryDetailPayload,
} from "@/lib/http/statusDeliveryDetailValidation";

test("status-delivery-detail normalizers trim and nullify", () => {
    assert.equal(normalizeStatus(" LOADING "), "LOADING");
    assert.equal(normalizeStatus(undefined), "");
    assert.equal(normalizeNullableText(" note "), "note");
    assert.equal(normalizeNullableText("   "), null);
});

test("status-delivery-detail validation enforces id_header and status", () => {
    const invalid = validateStatusDeliveryDetailPayload({ id_header: "0", status: " " });
    const valid = validateStatusDeliveryDetailPayload({ id_header: "11", status: "TIBA" });

    assert.deepEqual(invalid.id_header, ["Header wajib diisi"]);
    assert.deepEqual(invalid.status, ["Status wajib diisi"]);
    assert.equal(Object.keys(valid).length, 0);
});
