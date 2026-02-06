"use client";

import { useEffect, useMemo, useState } from "react";
import DataState from "@/components/dashboard/DataState";

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

export default function CustomerTab() {
    const [reloadKey, setReloadKey] = useState(0);
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

    const topBanks = useMemo(() => {
        if (mesinPerBulan.state !== "success") return [];
        const totals = new Map<string, number>();

        for (const row of mesinPerBulan.data.data) {
            totals.set(row.bank, (totals.get(row.bank) ?? 0) + toNumber(row.total_mesin));
        }

        return Array.from(totals.entries())
            .map(([bank, total]) => ({ bank, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 8);
    }, [mesinPerBulan]);

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Customer Summary</div>
                    <div className="text-xs text-zinc-500">Data source: /api/master-customer, /api/purchaseOrder</div>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Total Customers</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {customerSummary ? customerSummary.totalCustomers.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Customers with PO</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {customerSummary ? customerSummary.customersWithPo.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Total Mesin (All PO)</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {customerSummary ? customerSummary.totalMachines.toLocaleString() : "—"}
                        </div>
                    </div>
                </div>
                {(customers.state === "error" || purchaseOrders.state === "error") && (
                    <div className="mt-3">
                        <DataState
                            state="error"
                            errorMessage={[customers.state === "error" ? customers.message : null, purchaseOrders.state === "error" ? purchaseOrders.message : null]
                                .filter(Boolean)
                                .join(" · ")}
                            onRetry={() => setReloadKey((key) => key + 1)}
                        >
                            <></>
                        </DataState>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Top Customers by Mesin (6 months)</div>
                    <div className="text-xs text-zinc-500">Data source: /api/getJumlahMesinPerbulan</div>
                </div>

                <div className="mt-3">
                    <DataState
                        state={mesinPerBulan.state}
                        errorMessage={mesinPerBulan.state === "error" ? mesinPerBulan.message : undefined}
                        empty={mesinPerBulan.state === "success" && topBanks.length === 0}
                        emptyMessage="No mesin totals found for the last 6 months."
                        onRetry={() => setReloadKey((key) => key + 1)}
                    >
                        <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[520px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">Customer</th>
                                        <th className="px-3 py-2">Total Mesin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topBanks.map((row) => (
                                        <tr key={row.bank} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{row.bank}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.total.toLocaleString()}</td>
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
