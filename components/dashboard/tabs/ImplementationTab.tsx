"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DataState from "@/components/dashboard/DataState";
import CopyFeedbackMessage from "@/components/dashboard/CopyFeedbackMessage";
import formatDashboardNumber from "@/components/dashboard/formatDashboardNumber";
import { deleteSearchParams, setOrDeleteParam } from "@/components/dashboard/queryParams";
import useCopyViewLink from "@/components/dashboard/useCopyViewLink";
import useDashboardQueryParams from "@/components/dashboard/useDashboardQueryParams";
import {
    DEFAULT_IMPL_PAGE_SIZE,
    IMPLEMENTATION_PAGE_SIZE_OPTIONS,
    resolveImplPageSize,
    resolvePositivePage,
} from "@/components/dashboard/tabQueryState";

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const rawPageSizeParam = searchParams.get("implPageSize");
    const perPage = resolveImplPageSize(rawPageSizeParam);
    const rawPageParam = searchParams.get("implPage");
    const page = resolvePositivePage(rawPageParam);
    const [reloadKey, setReloadKey] = useState(0);
    const { copyFeedback, copyViewLink, isCopying } = useCopyViewLink(pathname, searchParams);
    const updateQueryParams = useDashboardQueryParams(pathname, searchParams, router);
    const [statusDelivery, setStatusDelivery] = useState<Loadable<StatusDeliveryResponse>>({ state: "loading" });

    function retryLoad() {
        setStatusDelivery({ state: "loading" });
        setReloadKey((key) => key + 1);
    }


    const updatePage = useCallback((nextPage: number) => {
        updateQueryParams((params) => {
            setOrDeleteParam(params, "implPage", nextPage <= 1 ? null : String(nextPage));
        });
    }, [updateQueryParams]);

    const updatePageSize = useCallback((nextPageSize: number) => {
        updateQueryParams((params) => {
            setOrDeleteParam(
                params,
                "implPageSize",
                nextPageSize === DEFAULT_IMPL_PAGE_SIZE ? null : String(nextPageSize)
            );

            deleteSearchParams(params, "implPage");
        });
    }, [updateQueryParams]);

    function resetView() {
        const changed = updateQueryParams((params) => {
            deleteSearchParams(params, "implPage");
            params.delete("implPageSize");
        });

        if (changed) {
            setStatusDelivery({ state: "loading" });
        }
    }

    useEffect(() => {
        if (rawPageParam === null) return;
        if (page <= 1 || rawPageParam !== String(page)) {
            updatePage(page);
        }
    }, [rawPageParam, page, updatePage]);

    useEffect(() => {
        if (rawPageSizeParam === null) return;
        const canonical = perPage === DEFAULT_IMPL_PAGE_SIZE ? null : String(perPage);
        if (rawPageSizeParam !== canonical) {
            updatePageSize(perPage);
        }
    }, [perPage, rawPageSizeParam, updatePageSize]);

    useEffect(() => {
        let cancelled = false;

        async function loadPage() {
            try {
                const data = await fetchJson<StatusDeliveryResponse>(`/api/statusDelivery?page=${page}&perPage=${perPage}`);
                if (cancelled) return;
                setStatusDelivery({ state: "success", data });
            } catch (e) {
                if (cancelled) return;
                const msg = e instanceof Error ? e.message : "Unknown error";
                setStatusDelivery({ state: "error", message: msg });
            }
        }

        void loadPage();

        return () => {
            cancelled = true;
        };
    }, [page, perPage, reloadKey]);

    const totalPages = useMemo(() => {
        if (statusDelivery.state !== "success") return 1;
        return Math.max(1, Math.ceil((statusDelivery.data.totalDatas ?? 0) / perPage));
    }, [perPage, statusDelivery]);

    useEffect(() => {
        if (statusDelivery.state !== "success") return;
        if (page > totalPages) {
            updatePage(totalPages);
        }
    }, [statusDelivery.state, page, totalPages, updatePage]);

    const statusSummary = useMemo(() => {
        if (statusDelivery.state !== "success") return null;
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const rows = statusDelivery.data.data;

        let upcoming = 0;
        let overdue = 0;
        let scheduledDepartures = 0;

        for (const row of rows) {
            const arrival = parseDate(row.tgl_perkiraan_tiba);
            const departure = parseDate(row.tgl_perkiraan_keluar);
            if (arrival) {
                if (arrival >= startOfToday) upcoming += 1;
                if (arrival < startOfToday) overdue += 1;
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
                <div className="mt-3">
                    <DataState
                        state={statusDelivery.state}
                        errorMessage={statusDelivery.state === "error" ? statusDelivery.message : undefined}
                        onRetry={retryLoad}
                    >
                        <div className="grid gap-3 md:grid-cols-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Total Delivery Records</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {statusSummary ? formatDashboardNumber(statusSummary.total) : "—"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Upcoming Arrivals</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {statusSummary ? formatDashboardNumber(statusSummary.upcoming) : "—"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Overdue Arrivals</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {statusSummary ? formatDashboardNumber(statusSummary.overdue) : "—"}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="text-xs text-zinc-500">Scheduled Departures</div>
                                <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {statusSummary ? formatDashboardNumber(statusSummary.scheduledDepartures) : "—"}
                                </div>
                            </div>
                        </div>
                    </DataState>
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Latest Delivery Status</div>
                    <div className="text-xs text-zinc-500">Data source: /api/statusDelivery</div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>Page {page} of {totalPages}</span>
                        <span>•</span>
                        <label htmlFor="impl-page-size">Rows</label>
                        <select
                            id="impl-page-size"
                            value={perPage}
                            onChange={(e) => {
                                setStatusDelivery({ state: "loading" });
                                updatePageSize(Number(e.target.value));
                            }}
                            className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                        >
                            {IMPLEMENTATION_PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={page <= 1 || statusDelivery.state === "loading"}
                            onClick={() => {
                                setStatusDelivery({ state: "loading" });
                                updatePage(Math.max(1, page - 1));
                            }}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200"
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            disabled={page >= totalPages || statusDelivery.state === "loading"}
                            onClick={() => {
                                setStatusDelivery({ state: "loading" });
                                updatePage(Math.min(totalPages, page + 1));
                            }}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200"
                        >
                            Next
                        </button>
                        <button
                            type="button"
                            disabled={statusDelivery.state === "loading"}
                            onClick={retryLoad}
                            className="h-8 rounded-lg bg-zinc-900 px-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
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
                            disabled={isCopying}
                            aria-busy={isCopying}
                            className="h-8 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            {isCopying ? "Copying…" : "Copy view link"}
                        </button>
                    </div>
                </div>

                {copyFeedback && <CopyFeedbackMessage feedback={copyFeedback} className="mt-2 text-xs font-semibold" />}

                <div className="mt-3">
                    <DataState
                        state={statusDelivery.state}
                        errorMessage={statusDelivery.state === "error" ? statusDelivery.message : undefined}
                        empty={statusDelivery.state === "success" && statusDelivery.data.data.length === 0}
                        emptyMessage="No delivery records found for this page."
                        onRetry={retryLoad}
                    >
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
                                    {statusDelivery.state === "success" && statusDelivery.data.data.map((row) => (
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
                                </tbody>
                            </table>
                        </div>
                    </DataState>
                </div>
            </div>
        </div>
    );
}
