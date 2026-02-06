"use client";

import { useEffect, useMemo, useState } from "react";

type Loadable<T> =
    | { state: "idle" | "loading" }
    | { state: "error"; message: string }
    | { state: "success"; data: T };

type MesinPerWarehouseRow = {
    gudang_id: number;
    gudang_name: string;
    jumlah: unknown;
};

type TopCustomerRow = {
    id: number;
    bank_desc: string;
    total_mesin_per_customer: unknown;
};

type MesinPerWarehouseResponse = {
    success: boolean;
    totalDatas: number;
    data: MesinPerWarehouseRow[];
};

type TopCustomerResponse = {
    success: boolean;
    totalDatas: number;
    data: TopCustomerRow[];
};

type PurchaseOrderRow = {
    id: number;
    jumlah: number | string | null;
    customer: number | null;
    created_at?: string | null;
};

type PurchaseOrderResponse = {
    success: boolean;
    totalDatas: number;
    data: PurchaseOrderRow[];
};

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
}

function toNumber(v: unknown): number {
    if (typeof v === "number") return Number.isFinite(v) ? v : 0;
    if (typeof v === "bigint") return Number(v);

    if (typeof v === "string") {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    }

    if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;

        // common serializers
        if ("value" in o) return toNumber(o.value);
        if ("$bigint" in o) return toNumber(o.$bigint);

        // prisma groupBy mistake: { _sum: { jumlah: X } }
        if ("_sum" in o && typeof o._sum === "object") {
            const s = o._sum as Record<string, unknown>;
            if ("jumlah" in s) return toNumber(s.jumlah);
        }
    }

    return 0;
}


export default function PurchaseOrderTab() {
    const now = new Date();
    const [year, setYear] = useState<number>(now.getFullYear());

    const warehouseUrl = "/api/getDataMesinPerWarehouse";
    const top3Url = useMemo(() => `/api/getData3TopByCustomer?year=${year}`, [year]);

    const [mesinPerWarehouse, setMesinPerWarehouse] = useState<Loadable<MesinPerWarehouseResponse>>({
        state: "idle",
    });
    const [top3Customer, setTop3Customer] = useState<Loadable<TopCustomerResponse>>({
        state: "idle",
    });
    const [purchaseOrders, setPurchaseOrders] = useState<Loadable<PurchaseOrderResponse>>({
        state: "idle",
    });

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setMesinPerWarehouse({ state: "loading" });
            setTop3Customer({ state: "loading" });
            setPurchaseOrders({ state: "loading" });

            const [w, t, po] = await Promise.allSettled([
                fetchJson<MesinPerWarehouseResponse>(warehouseUrl),
                fetchJson<TopCustomerResponse>(top3Url),
                fetchJson<PurchaseOrderResponse>("/api/purchaseOrder"),
            ]);

            if (cancelled) return;

            if (w.status === "fulfilled") {
                setMesinPerWarehouse({ state: "success", data: w.value });
            } else {
                const msg = w.reason instanceof Error ? w.reason.message : "Failed to load warehouse data";
                setMesinPerWarehouse({ state: "error", message: msg });
            }

            if (t.status === "fulfilled") {
                setTop3Customer({ state: "success", data: t.value });
            } else {
                const msg = t.reason instanceof Error ? t.reason.message : "Failed to load top customers";
                setTop3Customer({ state: "error", message: msg });
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (po.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: po.value });
            } else {
                const msg = po.reason instanceof Error ? po.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (po.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: po.value });
            } else {
                const msg = po.reason instanceof Error ? po.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (po.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: po.value });
            } else {
                const msg = po.reason instanceof Error ? po.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (po.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: po.value });
            } else {
                const msg = po.reason instanceof Error ? po.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }

            if (po.status === "fulfilled") {
                setPurchaseOrders({ state: "success", data: po.value });
            } else {
                const msg = po.reason instanceof Error ? po.reason.message : "Failed to load purchase orders";
                setPurchaseOrders({ state: "error", message: msg });
            }
        }

        void load();
        return () => {
            cancelled = true;
        };
    }, [top3Url]);

    const totalWarehouseMachines = useMemo(() => {
        if (mesinPerWarehouse.state !== "success") return null;
        return mesinPerWarehouse.data.data.reduce(
            (acc, r) => acc + toNumber(r.jumlah),
            0
        );
    }, [mesinPerWarehouse]);

    const purchaseOrderSummary = useMemo(() => {
        if (purchaseOrders.state !== "success") return null;

        const rows = purchaseOrders.data.data;
        const totalMachines = rows.reduce((acc, r) => acc + toNumber(r.jumlah), 0);
        const uniqueCustomers = new Set(rows.map((r) => r.customer).filter((v): v is number => typeof v === "number"));

        return {
            totalOrders: rows.length,
            totalMachines,
            uniqueCustomers: uniqueCustomers.size,
        };
    }, [purchaseOrders]);

    return (
        <div className="space-y-4">
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Purchase Order</div>

                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <label className="text-xs text-zinc-500">Year</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    >
                        {Array.from({ length: 6 }).map((_, i) => {
                            const y = now.getFullYear() - i;
                            return (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">Total Mesin (All Warehouses)</div>
                    <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {totalWarehouseMachines === null ? "—" : totalWarehouseMachines.toLocaleString()}
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">API</div>
                    <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        getDataMesinPerWarehouse
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">Used for “Mesin per Warehouse” widget</div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">API</div>
                    <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">getData3TopByCustomer</div>
                    <div className="mt-1 text-xs text-zinc-500">Filtered by year: {year}</div>
                </div>
            </div>

            {/* Mesin per Warehouse */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Mesin per Warehouse</div>
                    <div className="text-xs text-zinc-500">{warehouseUrl}</div>
                </div>

                <div className="mt-3">
                    {mesinPerWarehouse.state === "loading" && <div className="text-sm text-zinc-500">Loading…</div>}
                    {mesinPerWarehouse.state === "error" && (
                        <div className="text-sm text-red-500">{mesinPerWarehouse.message}</div>
                    )}
                    {mesinPerWarehouse.state === "success" && (
                        <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[640px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">Warehouse</th>
                                        <th className="px-3 py-2">Jumlah</th>
                                        <th className="px-3 py-2">Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mesinPerWarehouse.data.data
                                        .slice()
                                        .sort((a, b) => toNumber(b.jumlah) - toNumber(a.jumlah))
                                        .map((r) => {
                                            const total = totalWarehouseMachines ?? 0;
                                            const pct = total ? (toNumber(r.jumlah) * 100) / total : 0;

                                            return (
                                                <tr key={r.gudang_id} className="border-t border-zinc-200 dark:border-zinc-800">
                                                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{r.gudang_name}</td>
                                                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{toNumber(r.jumlah).toLocaleString()}</td>
                                                    <td className="px-3 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-28 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                                                                <div
                                                                    className="h-full bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-500"
                                                                    style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                                                {pct.toFixed(1)}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    {mesinPerWarehouse.data.data.length === 0 && (
                                        <tr>
                                            <td className="px-3 py-6 text-sm text-zinc-500" colSpan={3}>
                                                No warehouse machine totals found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Top 3 Customer by Purchase */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Top 3 Customer Purchase</div>
                    <div className="text-xs text-zinc-500">{top3Url}</div>
                </div>

                <div className="mt-3">
                    {top3Customer.state === "loading" && <div className="text-sm text-zinc-500">Loading…</div>}
                    {top3Customer.state === "error" && <div className="text-sm text-red-500">{top3Customer.message}</div>}
                    {top3Customer.state === "success" && (
                        <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[520px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">Rank</th>
                                        <th className="px-3 py-2">Customer</th>
                                        <th className="px-3 py-2">Total Mesin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {top3Customer.data.data.map((r, idx) => (
                                        <tr key={r.id} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2">
                                                <span className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500/15 via-sky-500/15 to-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                                                    #{idx + 1}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{r.bank_desc}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {Number(r.total_mesin_per_customer ?? 0).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}

                                    {top3Customer.data.data.length === 0 && (
                                        <tr>
                                            <td className="px-3 py-6 text-sm text-zinc-500" colSpan={3}>
                                                No customer purchases found for {year}.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Purchase order snapshot */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Purchase Order Snapshot</div>
                    <div className="text-xs text-zinc-500">Data source: /api/purchaseOrder</div>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500">Total PO</div>
                        <div className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {purchaseOrderSummary ? purchaseOrderSummary.totalOrders.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500">Total Mesin (PO)</div>
                        <div className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {purchaseOrderSummary ? purchaseOrderSummary.totalMachines.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500">Customers with PO</div>
                        <div className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {purchaseOrderSummary ? purchaseOrderSummary.uniqueCustomers.toLocaleString() : "—"}
                        </div>
                    </div>
                </div>

                {purchaseOrders.state === "error" && (
                    <div className="mt-3 text-sm text-red-500">{purchaseOrders.message}</div>
                )}
            </div>
        </div>
    );
}
