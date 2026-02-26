import test from "node:test";
import assert from "node:assert/strict";

import {
    TAB_SCOPED_PARAMS,
    buildCanonicalParams,
    getActiveTab,
    sanitizeParamsForTab,
    type TabKey,
} from "./dashboardTabParams";

test("TAB_SCOPED_PARAMS exposes expected scoped keys", () => {
    assert.deepEqual(TAB_SCOPED_PARAMS.project, ["year", "month"]);
    assert.deepEqual(TAB_SCOPED_PARAMS.purchaseOrder, ["poYear"]);
    assert.deepEqual(TAB_SCOPED_PARAMS.customer, ["customerLimit"]);
    assert.deepEqual(TAB_SCOPED_PARAMS.implementation, ["implPage", "implPageSize"]);
});

test("getActiveTab resolves defaults and invalid tabs", () => {
    assert.equal(getActiveTab(null), "project");
    assert.equal(getActiveTab("project"), "project");
    assert.equal(getActiveTab("purchaseOrder"), "purchaseOrder");
    assert.equal(getActiveTab("bogus"), "project");
});

test("sanitizeParamsForTab removes unrelated params", () => {
    const params = new URLSearchParams("tab=implementation&implPage=2&implPageSize=50&year=2024&q=abc");

    sanitizeParamsForTab(params, "implementation");

    assert.equal(params.toString(), "tab=implementation&implPage=2&implPageSize=50");
});

test("buildCanonicalParams omits tab for project and sorts keys", () => {
    const params = new URLSearchParams("tab=project&month=08&year=2024");

    const canonical = buildCanonicalParams(params, "project");

    assert.equal(canonical.toString(), "month=08&year=2024");
});

test("buildCanonicalParams scopes params for non-project tabs and sets tab", () => {
    const source = new URLSearchParams("year=2024&tab=customer&customerLimit=10&implPage=2");

    const canonical = buildCanonicalParams(source, "implementation");

    assert.equal(canonical.toString(), "implPage=2&tab=implementation");
});

test("buildCanonicalParams round-trips all valid tabs without throwing", () => {
    const source = new URLSearchParams("tab=project&year=2024&month=08&poYear=2023&customerLimit=10&implPage=2");
    const tabs: TabKey[] = ["project", "purchaseOrder", "customer", "implementation"];

    for (const tab of tabs) {
        const canonical = buildCanonicalParams(source, tab);
        assert.ok(canonical instanceof URLSearchParams);
    }
});
