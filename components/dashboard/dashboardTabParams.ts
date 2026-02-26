import { sortSearchParams } from "@/components/dashboard/queryParams";

export type TabKey = "project" | "purchaseOrder" | "customer" | "implementation";

export const VALID_TABS: TabKey[] = ["project", "purchaseOrder", "customer", "implementation"];

export const TAB_SCOPED_PARAMS: Record<TabKey, string[]> = {
    project: ["year", "month"],
    purchaseOrder: ["poYear"],
    customer: ["customerLimit"],
    implementation: ["implPage", "implPageSize"],
};

export function sanitizeParamsForTab(params: URLSearchParams, tab: TabKey) {
    const allowed = new Set(["tab", ...TAB_SCOPED_PARAMS[tab]]);

    for (const key of Array.from(params.keys())) {
        if (!allowed.has(key)) {
            params.delete(key);
        }
    }
}

export function getActiveTab(rawTab: string | null): TabKey {
    if (!rawTab) return "project";
    return VALID_TABS.includes(rawTab as TabKey) ? (rawTab as TabKey) : "project";
}

export function buildCanonicalParams(source: URLSearchParams, tab: TabKey) {
    const params = new URLSearchParams(source.toString());
    sanitizeParamsForTab(params, tab);

    if (tab === "project") {
        params.delete("tab");
    } else {
        params.set("tab", tab);
    }

    return sortSearchParams(params);
}
