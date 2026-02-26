import test from "node:test";
import assert from "node:assert/strict";

import {
    buildCanonicalHref,
    canonicalHrefFromSearchParams,
    getCanonicalHrefChange,
    hasCanonicalHrefChanged,
    replaceCanonicalHrefIfChanged,
    searchParamsKey,
    sortSearchParams,
    type SearchParamsLike,
} from "./queryParams";

test("sortSearchParams sorts keys and then values", () => {
    const params = new URLSearchParams("b=2&a=2&a=1");
    const sorted = sortSearchParams(params);

    assert.equal(sorted.toString(), "a=1&a=2&b=2");
});

test("buildCanonicalHref omits trailing question mark when params are empty", () => {
    const params = new URLSearchParams();
    assert.equal(buildCanonicalHref("/dashboard", params), "/dashboard");
});

test("canonicalHrefFromSearchParams creates sorted canonical href", () => {
    const searchParams: SearchParamsLike = {
        toString: () => "implPageSize=50&tab=implementation&implPage=2",
    };

    assert.equal(
        canonicalHrefFromSearchParams("/dashboard", searchParams),
        "/dashboard?implPage=2&implPageSize=50&tab=implementation"
    );
});


test("searchParamsKey normalizes equivalent param ordering", () => {
    const first: SearchParamsLike = {
        toString: () => "tab=implementation&implPageSize=50&implPage=2",
    };
    const second: SearchParamsLike = {
        toString: () => "implPage=2&tab=implementation&implPageSize=50",
    };

    assert.equal(searchParamsKey(first), searchParamsKey(second));
    assert.equal(searchParamsKey(first), "implPage=2&implPageSize=50&tab=implementation");
});

test("getCanonicalHrefChange returns changed=false for semantically equivalent param order", () => {
    const current: SearchParamsLike = {
        toString: () => "b=2&a=1",
    };
    const next = new URLSearchParams("a=1&b=2");

    const result = getCanonicalHrefChange("/dashboard", current, next);

    assert.equal(result.changed, false);
    assert.equal(result.nextHref, "/dashboard?a=1&b=2");
});

test("hasCanonicalHrefChanged returns true for differing canonical params", () => {
    const current: SearchParamsLike = {
        toString: () => "a=1",
    };
    const next = new URLSearchParams("a=2");

    assert.equal(hasCanonicalHrefChanged("/dashboard", current, next), true);
});

test("replaceCanonicalHrefIfChanged only calls router.replace when canonical href changed", () => {
    const calls: string[] = [];
    const router = {
        replace(href: string) {
            calls.push(href);
        },
    };

    const current: SearchParamsLike = {
        toString: () => "a=1&b=2",
    };

    const unchanged = new URLSearchParams("b=2&a=1");
    const changed = new URLSearchParams("a=9&b=2");

    const unchangedResult = replaceCanonicalHrefIfChanged("/dashboard", current, unchanged, router);
    const changedResult = replaceCanonicalHrefIfChanged("/dashboard", current, changed, router);

    assert.equal(unchangedResult, false);
    assert.equal(changedResult, true);
    assert.deepEqual(calls, ["/dashboard?a=9&b=2"]);
});
