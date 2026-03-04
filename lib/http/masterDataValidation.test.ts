import test from "node:test";
import assert from "node:assert/strict";

import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";

test("validateMasterIdParam enforces positive integer", () => {
    assert.deepEqual(validateMasterIdParam("1"), {});
    assert.deepEqual(validateMasterIdParam("0").id, ["id tidak valid"]);
});

test("validateRequiredName enforces non-empty trimmed string", () => {
    assert.deepEqual(validateRequiredName("  ok  "), {});
    assert.deepEqual(validateRequiredName("   ").name, ["Nama tidak boleh kosong"]);
    assert.deepEqual(validateRequiredName("", "gudang_desc", "Gudang tidak boleh kosong").gudang_desc, ["Gudang tidak boleh kosong"]);
});
