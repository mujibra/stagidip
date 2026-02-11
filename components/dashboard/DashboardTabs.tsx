"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProjectTab from "@/components/dashboard/tabs/ProjectTab";
import PurchaseOrderTab from "../dashboard/tabs/PurchaseOrderTab";
import CustomerTab from "../dashboard/tabs/CustomerTab";
import ImplementationTab from "../dashboard/tabs/ImplementationTab";

type TabKey = "project" | "purchaseOrder" | "customer" | "implementation";

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

    const active = useMemo<TabKey>(() => {
        const requestedTab = searchParams.get("tab");
        const validKeys = new Set<TabKey>(["project", "purchaseOrder", "customer", "implementation"]);

        if (requestedTab && validKeys.has(requestedTab as TabKey)) {
            return requestedTab as TabKey;
        }

        return "project";
    }, [searchParams]);

    const handleTabChange = (tab: TabKey) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full">
            {/* Tab bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-1 overflow-x-auto py-2">
                    {tabs.map((t) => {
                        const isActive = active === t.key;
                        return (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => handleTabChange(t.key)}
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

            {/* Tab content */}
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
