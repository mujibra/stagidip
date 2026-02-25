"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DataState from "@/components/dashboard/DataState";
import formatDashboardNumber from "@/components/dashboard/formatDashboardNumber";
import useCopyViewLink from "@/components/dashboard/useCopyViewLink";
import useDashboardQueryParams from "@/components/dashboard/useDashboardQueryParams";

type Loadable<T> =
    | { state: "idle" | "loading" }
    | { state: "error"; message: string }
    | { state: "success"; data: T };

type CustomerRow = {
    id: number;
    bank_desc: string;
};

type CustomerResponse = {
    success: boolean;
    totalDatas: number;
    data: CustomerRow[];
};

type PurchaseOrderRow = {
    id: number;
    customer: number | null;
    jumlah: number | string | null;
};

type PurchaseOrderResponse = {
    success: boolean;
    totalDatas: number;
    data: PurchaseOrderRow[];
};

type MesinPerBulanRow = {
    periode: string;
    id_bank: number;
    bank: string;
    bulan: string;
    total_mesin: number;
};

type MesinPerBulanResponse = {
    success: boolean;
    data: MesinPerBulanRow[];
};

const DEFAULT_CUSTOMER_LIMIT = 8;
const CUSTOMER_LIMIT_OPTIONS = [5, 8, 10, 15] as const;

function resolveCustomerLimit(raw: string | null) {
    const parsed = Number(raw ?? DEFAULT_CUSTOMER_LIMIT);
    if (!Number.isFinite(parsed)) return DEFAULT_CUSTOMER_LIMIT;
    const next = Math.floor(parsed);
    return CUSTOMER_LIMIT_OPTIONS.includes(next as (typeof CUSTOMER_LIMIT_OPTIONS)[number]) ? next : DEFAULT_CUSTOMER_LIMIT;
}

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
}

function toNumber(v: unknown): number {
    if (typeof v === "number") return Number.isFinite(v) ? v : 0;
    if (typeof v === "string") {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    }
    return 0;
}

function getSummaryState(
    customers: Loadable<CustomerResponse>,
    purchaseOrders: Loadable<PurchaseOrderResponse>
): "idle" | "loading" | "error" | "success" {
    if (customers.state === "error" || purchaseOrders.state === "error") return "error";
    if (customers.state === "loading" || purchaseOrders.state === "loading") return "loading";
    if (customers.state === "idle" || purchaseOrders.state === "idle") return "idle";
    return "success";
}

function getSummaryError(
    customers: Loadable<CustomerResponse>,
    purchaseOrders: Loadable<PurchaseOrderResponse>
): string | undefined {
    if (customers.state !== "error" && purchaseOrders.state !== "error") return undefined;
    return [
        customers.state === "error" ? customers.message : null,
        purchaseOrders.state === "error" ? purchaseOrders.message : null,
    ]
        .filter(Boolean)
        .join(" · ");
}

export default function CustomerTab() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const rawCustomerLimit = searchParams.get("customerLimit");
    const customerLimit = resolveCustomerLimit(rawCustomerLimit);
    const [reloadKey, setReloadKey] = useState(0);
    const { copyFeedback, copyViewLink } = useCopyViewLink(pathname, searchParams);
    const updateQueryParams = useDashboardQueryParams(pathname, searchParams, router);
    const [customers, setCustomers] = useState<Loadable<CustomerResponse>>({ state: "idle" });
    const [purchaseOrders, setPurchaseOrders] = useState<Loadable<PurchaseOrderResponse>>({ state: "idle" });
    const [mesinPerBulan, setMesinPerBulan] = useState<Loadable<MesinPerBulanResponse>>({ state: "idle" });

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setCustomers({ state: "loading" });
            setPurchaseOrders({ state: "loading" });
            setMesinPerBulan({ state: "loading" });

            const [cust, pos, mesin] = await Promise.allSettled([
                fetchJson<CustomerResponse>("/api/master-customer"),
                fetchJson<PurchaseOrderResponse>("/api/purchaseOrder"),
                fetchJson<MesinPerBulanResponse>("/api/getJumlahMesinPerbulan/null/null"),
            ]);

            if (cancelled) return;

            if (cust.status === "fulfilled") {
                setCustomers({ state: "success", data: cust.value });
            } else {
                const msg = cust.reason instanceof Error ? cust.reason.message : "Failed to load customers";
                setCustomers({ state: "error", message: msg });
            }

            if (pos.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: pos.value });
            } else {
                const msg = pos.reason instanceof Error ? pos.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (mesin.status === "fulfilled") {
                setMesinPerBulan({ state: "success", data: mesin.value });
            } else {
                const msg = mesin.reason instanceof Error ? mesin.reason.message : "Failed to load mesin per bulan";
                setMesinPerBulan({ state: "error", message: msg });
            }
        }

        void load();

        return () => {
            cancelled = true;
        };
    }, [reloadKey]);

    const summaryState = useMemo(
        () => getSummaryState(customers, purchaseOrders),
        [customers, purchaseOrders]
    );

    const summaryError = useMemo(
        () => getSummaryError(customers, purchaseOrders),
        [customers, purchaseOrders]
    );

    const handleRetry = () => setReloadKey((key) => key + 1);

    const updateCustomerLimit = useCallback((nextLimit: number) => {
        updateQueryParams((params) => {
            if (nextLimit === DEFAULT_CUSTOMER_LIMIT) {
                params.delete("customerLimit");
            } else {
                params.set("customerLimit", String(nextLimit));
            }
        });
    }, [updateQueryParams]);

    useEffect(() => {
        if (rawCustomerLimit === null) return;

        const canonical = customerLimit === DEFAULT_CUSTOMER_LIMIT ? null : String(customerLimit);
        if (rawCustomerLimit !== canonical) {
            updateCustomerLimit(customerLimit);
        }
    }, [customerLimit, rawCustomerLimit, updateCustomerLimit]);


    function resetView() {
        updateQueryParams((params) => {
            params.delete("customerLimit");
        });
        setReloadKey((key) => key + 1);
    }

    const customerSummary = useMemo(() => {
        if (customers.state !== "success" || purchaseOrders.state !== "success") return null;

        const totalCustomers = customers.data.data.length;
        const uniquePoCustomers = new Set(
            purchaseOrders.data.data.map((po) => po.customer).filter((v): v is number => typeof v === "number")
        );
        const totalMachines = purchaseOrders.data.data.reduce((acc, po) => acc + toNumber(po.jumlah), 0);

        return {
            totalCustomers,
            customersWithPo: uniquePoCustomers.size,
            totalMachines,
        };
    }, [customers, purchaseOrders]);

    const topBankStats = useMemo(() => {
        if (mesinPerBulan.state !== "success") {
            return { rows: [] as { bank: string; total: number }[], totalCustomers: 0, totalMesin: 0 };
        }

        const totals = new Map<string, number>();

        for (const row of mesinPerBulan.data.data) {
            totals.set(row.bank, (totals.get(row.bank) ?? 0) + toNumber(row.total_mesin));
        }

        const allRows = Array.from(totals.entries())
            .map(([bank, total]) => ({ bank, total }))
            .sort((a, b) => {
                if (b.total !== a.total) return b.total - a.total;
                return a.bank.localeCompare(b.bank, "id-ID");
            });

        return {
            rows: allRows.slice(0, customerLimit),
            totalCustomers: allRows.length,
            totalMesin: allRows.reduce((acc, row) => acc + row.total, 0),
        };
    }, [customerLimit, mesinPerBulan]);

    const topBanks = topBankStats.rows;
    const uniqueTopCustomerCount = topBankStats.totalCustomers;

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Customer Summary</div>
                    <div className="text-xs text-zinc-500">Data source: /api/master-customer, /api/purchaseOrder</div>
                </div>
                <div className="mt-3">
                    <DataState
                        state={summaryState}
                        errorMessage={summaryError}
                        onRetry={handleRetry}
                    >
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Total Customers</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {customerSummary ? formatDashboardNumber(customerSummary.totalCustomers) : "—"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Customers with PO</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {customerSummary ? formatDashboardNumber(customerSummary.customersWithPo) : "—"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Total Mesin (All PO)</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {customerSummary ? formatDashboardNumber(customerSummary.totalMachines) : "—"}
                                </div>
                            </div>
                        </div>
                    </DataState>
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Top Customers by Mesin (6 months)</div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-zinc-500">Show</label>
                        <select
                            value={customerLimit}
                            onChange={(e) => updateCustomerLimit(Number(e.target.value))}
                            className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        >
                            {CUSTOMER_LIMIT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={handleRetry}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            Refresh
                        </button>
                        <button
                            type="button"
                            onClick={resetView}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            Reset view
                        </button>
                        <button
                            type="button"
                            onClick={copyViewLink}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            Copy view link
                        </button>
                        <div className="text-xs text-zinc-500">Data source: /api/getJumlahMesinPerbulan</div>
                    </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <span>Showing top {customerLimit} of {formatDashboardNumber(uniqueTopCustomerCount)} customers</span>
                    {copyFeedback && (
                        <span
                            className={`font-semibold ${copyFeedback.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                            role="status"
                            aria-live="polite"
                        >
                            {copyFeedback.message}
                        </span>
                    )}
                </div>

                <div className="mt-3">
                    <DataState
                        state={mesinPerBulan.state}
                        errorMessage={mesinPerBulan.state === "error" ? mesinPerBulan.message : undefined}
                        empty={mesinPerBulan.state === "success" && topBanks.length === 0}
                        emptyMessage={`No mesin totals found for the last 6 months (top ${customerLimit}).`}
                        onRetry={handleRetry}
                    >
                        <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[520px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">Rank</th>
                                        <th className="px-3 py-2">Customer</th>
                                        <th className="px-3 py-2">Total Mesin</th>
                                        <th className="px-3 py-2">Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topBanks.map((row, idx) => (
                                        <tr key={row.bank} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2">
                                                <span className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500/15 via-sky-500/15 to-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                                                    #{idx + 1}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{row.bank}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{formatDashboardNumber(row.total)}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {topBankStats.totalMesin > 0 ? `${((row.total / topBankStats.totalMesin) * 100).toFixed(1)}%` : "0.0%"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DataState>
                </div>
            </div>
        </div>
    );
}
