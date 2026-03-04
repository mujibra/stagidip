import test from "node:test";
import assert from "node:assert/strict";

import { validateMasterIdParam, validateRequiredArray, validateRequiredName } from "@/lib/http/masterDataValidation";

test("validateMasterIdParam enforces positive integer", () => {
    assert.deepEqual(validateMasterIdParam("1"), {});
    assert.deepEqual(validateMasterIdParam("0").id, ["id tidak valid"]);
});

test("validateRequiredName enforces non-empty trimmed string", () => {
    assert.deepEqual(validateRequiredName("  ok  "), {});
    assert.deepEqual(validateRequiredName("   ").name, ["Nama tidak boleh kosong"]);
    assert.deepEqual(validateRequiredName("", "gudang_desc", "Gudang tidak boleh kosong").gudang_desc, ["Gudang tidak boleh kosong"]);
});

test("validateRequiredArray enforces non-empty array", () => {
    assert.deepEqual(validateRequiredArray(["a"], "type_atm", "Type ATM wajib diisi"), {});
    assert.deepEqual(validateRequiredArray([], "type_atm", "Type ATM wajib diisi").type_atm, ["Type ATM wajib diisi"]);
    assert.deepEqual(validateRequiredArray(null, "type_atm", "Type ATM wajib diisi").type_atm, ["Type ATM wajib diisi"]);
});
