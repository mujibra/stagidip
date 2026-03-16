import test from "node:test";
import assert from "node:assert/strict";

import { getPagination } from "@/lib/http/pagination";

test("getPagination uses defaults when query params are missing", () => {
    const result = getPagination(new URLSearchParams());

    assert.equal(result.page, 1);
    assert.equal(result.perPage, 10);
    assert.equal(result.skip, 0);
    assert.equal(result.take, 10);
});

test("getPagination parses valid page/perPage values", () => {
    const result = getPagination(new URLSearchParams("page=3&perPage=25"));

    assert.equal(result.page, 3);
    assert.equal(result.perPage, 25);
    assert.equal(result.skip, 50);
    assert.equal(result.take, 25);
});

test("getPagination falls back for invalid page/perPage values", () => {
    const result = getPagination(new URLSearchParams("page=-2&perPage=0"));

    assert.equal(result.page, 1);
    assert.equal(result.perPage, 10);
    assert.equal(result.skip, 0);
    assert.equal(result.take, 10);
});

test("getPagination supports default option overrides", () => {
    const result = getPagination(new URLSearchParams(), { defaultPage: 2, defaultPerPage: 20 });

    assert.equal(result.page, 2);
    assert.equal(result.perPage, 20);
    assert.equal(result.skip, 20);
    assert.equal(result.take, 20);
});

test("getPagination honors perPageOverride for fixed-page endpoints", () => {
    const result = getPagination(new URLSearchParams("page=4&perPage=100"), { perPageOverride: 15 });

    assert.equal(result.page, 4);
    assert.equal(result.perPage, 15);
    assert.equal(result.skip, 45);
    assert.equal(result.take, 15);
});
