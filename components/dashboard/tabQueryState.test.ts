import test from "node:test";
import assert from "node:assert/strict";

import {
    CUSTOMER_LIMIT_OPTIONS,
    DEFAULT_CUSTOMER_LIMIT,
    DEFAULT_IMPL_PAGE_SIZE,
    IMPLEMENTATION_PAGE_SIZE_OPTIONS,
    resolveCustomerLimit,
    resolveImplPageSize,
    resolveMonth,
    resolvePositivePage,
    resolveRecentYear,
} from "./tabQueryState";

test("customer and implementation option constants stay stable", () => {
    assert.deepEqual(CUSTOMER_LIMIT_OPTIONS, [5, 8, 10, 15]);
    assert.equal(DEFAULT_CUSTOMER_LIMIT, 8);
    assert.deepEqual(IMPLEMENTATION_PAGE_SIZE_OPTIONS, [10, 20, 50]);
    assert.equal(DEFAULT_IMPL_PAGE_SIZE, 20);
});

test("resolveCustomerLimit validates and normalizes input", () => {
    assert.equal(resolveCustomerLimit(null), DEFAULT_CUSTOMER_LIMIT);
    assert.equal(resolveCustomerLimit("0010"), 10);
    assert.equal(resolveCustomerLimit("11"), DEFAULT_CUSTOMER_LIMIT);
    assert.equal(resolveCustomerLimit("NaN"), DEFAULT_CUSTOMER_LIMIT);
});

test("resolveImplPageSize validates and normalizes input", () => {
    assert.equal(resolveImplPageSize(null), DEFAULT_IMPL_PAGE_SIZE);
    assert.equal(resolveImplPageSize("050"), 50);
    assert.equal(resolveImplPageSize("7"), DEFAULT_IMPL_PAGE_SIZE);
    assert.equal(resolveImplPageSize("oops"), DEFAULT_IMPL_PAGE_SIZE);
});

test("resolvePositivePage enforces integer pages >= 1", () => {
    assert.equal(resolvePositivePage(null), 1);
    assert.equal(resolvePositivePage("02"), 2);
    assert.equal(resolvePositivePage("0"), 1);
    assert.equal(resolvePositivePage("-5"), 1);
    assert.equal(resolvePositivePage("abc", 3), 3);
});

test("resolveRecentYear clamps to allowed recent range", () => {
    const nowYear = 2025;
    assert.equal(resolveRecentYear(null, nowYear), nowYear);
    assert.equal(resolveRecentYear("2024", nowYear), 2024);
    assert.equal(resolveRecentYear("2010", nowYear), nowYear);
    assert.equal(resolveRecentYear("2050", nowYear), nowYear);
});

test("resolveMonth enforces 1-12 month bounds", () => {
    assert.equal(resolveMonth(null, 8), 8);
    assert.equal(resolveMonth("09", 8), 9);
    assert.equal(resolveMonth("0", 8), 8);
    assert.equal(resolveMonth("13", 8), 8);
    assert.equal(resolveMonth("bad", 8), 8);
});
