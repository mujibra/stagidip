"use client";

import { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProjectTab from "@/components/dashboard/tabs/ProjectTab";
import PurchaseOrderTab from "../dashboard/tabs/PurchaseOrderTab";
import CustomerTab from "../dashboard/tabs/CustomerTab";
import ImplementationTab from "../dashboard/tabs/ImplementationTab";
import { buildCanonicalHref, hasCanonicalHrefChanged, sortSearchParams } from "@/components/dashboard/queryParams";

type TabKey = "project" | "purchaseOrder" | "customer" | "implementation";

const VALID_TABS: TabKey[] = ["project", "purchaseOrder", "customer", "implementation"];

const TAB_SCOPED_PARAMS: Record<TabKey, string[]> = {
    project: ["year", "month"],
    purchaseOrder: ["poYear"],
    customer: ["customerLimit"],
    implementation: ["implPage", "implPageSize"],
};

function sanitizeParamsForTab(params: URLSearchParams, tab: TabKey) {
    const allowed = new Set(["tab", ...TAB_SCOPED_PARAMS[tab]]);

    for (const key of Array.from(params.keys())) {
        if (!allowed.has(key)) {
            params.delete(key);
        }
    }
}

function getActiveTab(rawTab: string | null): TabKey {
    if (!rawTab) return "project";
    return VALID_TABS.includes(rawTab as TabKey) ? (rawTab as TabKey) : "project";
}

function buildCanonicalParams(source: URLSearchParams, tab: TabKey) {
    const params = new URLSearchParams(source.toString());
    sanitizeParamsForTab(params, tab);

    if (tab === "project") {
        params.delete("tab");
    } else {
        params.set("tab", tab);
    }

    return sortSearchParams(params);
}

export default function DashboardTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const tabs = useMemo(
        () =>
            [
                { key: "project" as const, label: "Project" },
                { key: "purchaseOrder" as const, label: "Purchase Order" },
                { key: "customer" as const, label: "Customer" },
                { key: "implementation" as const, label: "Implementation" },
            ] satisfies { key: TabKey; label: string }[],
        []
    );

    const active = useMemo<TabKey>(() => getActiveTab(searchParams.get("tab")), [searchParams]);

    const navigateWithTab = useCallback((tab: TabKey) => {
        const params = buildCanonicalParams(searchParams, tab);
        const nextHref = buildCanonicalHref(pathname, params);
        if (!hasCanonicalHrefChanged(pathname, searchParams, params)) return;

        router.replace(nextHref);
    }, [pathname, router, searchParams]);

    useEffect(() => {
        const canonical = buildCanonicalParams(searchParams, active);
        const nextHref = buildCanonicalHref(pathname, canonical);

        if (hasCanonicalHrefChanged(pathname, searchParams, canonical)) {
            router.replace(nextHref);
        }
    }, [active, pathname, router, searchParams]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-1 overflow-x-auto py-2">
                    {tabs.map((t) => {
                        const isActive = active === t.key;
                        return (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => navigateWithTab(t.key)}
                                aria-pressed={isActive}
                                className={[
                                    "relative rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap",
                                    "transition-colors",
                                    isActive
                                        ? "text-zinc-900 dark:text-zinc-50"
                                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
                                ].join(" ")}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="dashboard-tab-pill"
                                        className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500/15 via-sky-500/15 to-emerald-500/15 ring-1 ring-indigo-500/15 dark:ring-white/10"
                                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                    />
                                )}
                                <span className="relative z-10">{t.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="pt-4">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.18 }}
                    >
                        {active === "project" && <ProjectTab />}
                        {active === "purchaseOrder" && <PurchaseOrderTab />}
                        {active === "customer" && <CustomerTab />}
                        {active === "implementation" && <ImplementationTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
