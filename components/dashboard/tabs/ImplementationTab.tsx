"use client";

import { useEffect, useMemo, useState } from "react";

type Loadable<T> =
    | { state: "idle" | "loading" }
    | { state: "error"; message: string }
    | { state: "success"; data: T };

type StatusDeliveryRow = {
    id: number;
    id_po: number;
    id_mesin: number;
    sn_mesin: string | null;
    tgl_perkiraan_tiba: string | null;
    tgl_perkiraan_keluar: string | null;
    notes: string | null;
    created_at: string;
};

type StatusDeliveryResponse = {
    success: boolean;
    totalDatas: number;
    data: StatusDeliveryRow[];
};

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
}

function parseDate(value: string | null): Date | null {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value: string | null) {
    const parsed = parseDate(value);
    if (!parsed) return "—";
    return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(parsed);
}

export default function ImplementationTab() {
    const [statusDelivery, setStatusDelivery] = useState<Loadable<StatusDeliveryResponse>>({ state: "idle" });

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setStatusDelivery({ state: "loading" });

            try {
                const data = await fetchJson<StatusDeliveryResponse>("/api/statusDelivery?perPage=50");
                if (cancelled) return;
                setStatusDelivery({ state: "success", data });
            } catch (e) {
                if (cancelled) return;
                const msg = e instanceof Error ? e.message : "Unknown error";
                setStatusDelivery({ state: "error", message: msg });
            }
        }

        void load();

        return () => {
            cancelled = true;
        };
    }, []);

    const statusSummary = useMemo(() => {
        if (statusDelivery.state !== "success") return null;
        const today = new Date();
        const rows = statusDelivery.data.data;

        let upcoming = 0;
        let overdue = 0;
        let scheduledDepartures = 0;

        for (const row of rows) {
            const arrival = parseDate(row.tgl_perkiraan_tiba);
            const departure = parseDate(row.tgl_perkiraan_keluar);
            if (arrival) {
                if (arrival >= today) upcoming += 1;
                if (arrival < today) overdue += 1;
            }
            if (departure) scheduledDepartures += 1;
        }

        return {
            total: statusDelivery.data.totalDatas,
            upcoming,
            overdue,
            scheduledDepartures,
        };
    }, [statusDelivery]);

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Implementation Summary</div>
                    <div className="text-xs text-zinc-500">Data source: /api/statusDelivery</div>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-4">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Total Delivery Records</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {statusSummary ? statusSummary.total.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Upcoming Arrivals</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {statusSummary ? statusSummary.upcoming.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Overdue Arrivals</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {statusSummary ? statusSummary.overdue.toLocaleString() : "—"}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-xs text-zinc-500">Scheduled Departures</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {statusSummary ? statusSummary.scheduledDepartures.toLocaleString() : "—"}
                        </div>
                    </div>
                </div>
                {statusDelivery.state === "error" && (
                    <div className="mt-3 text-sm text-red-500">{statusDelivery.message}</div>
                )}
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Latest Delivery Status</div>
                    <div className="text-xs text-zinc-500">Data source: /api/statusDelivery</div>
                </div>

                <div className="mt-3">
                    {statusDelivery.state === "loading" && <div className="text-sm text-zinc-500">Loading…</div>}
                    {statusDelivery.state === "error" && (
                        <div className="text-sm text-red-500">{statusDelivery.message}</div>
                    )}
                    {statusDelivery.state === "success" && (
                        <div className="overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[720px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">PO</th>
                                        <th className="px-3 py-2">SN Mesin</th>
                                        <th className="px-3 py-2">Arrival</th>
                                        <th className="px-3 py-2">Departure</th>
                                        <th className="px-3 py-2">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statusDelivery.data.data.map((row) => (
                                        <tr key={row.id} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">
                                                {row.id_po}
                                            </td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {row.sn_mesin ?? "—"}
                                            </td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {formatDate(row.tgl_perkiraan_tiba)}
                                            </td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {formatDate(row.tgl_perkiraan_keluar)}
                                            </td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                                                {row.notes ?? "—"}
                                            </td>
                                        </tr>
                                    ))}
                                    {statusDelivery.data.data.length === 0 && (
                                        <tr>
                                            <td className="px-3 py-6 text-sm text-zinc-500" colSpan={5}>
                                                No delivery records found for the latest 50 entries.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
