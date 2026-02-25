"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DataState from "@/components/dashboard/DataState";
import CopyFeedbackMessage from "@/components/dashboard/CopyFeedbackMessage";
import formatDashboardNumber from "@/components/dashboard/formatDashboardNumber";
import useCopyViewLink from "@/components/dashboard/useCopyViewLink";
import useDashboardQueryParams from "@/components/dashboard/useDashboardQueryParams";

type MachineStatusPoint = { tanggal: string; jumlah: string };
type MachineStatusResponse = {
    data_range: {
        new_machine: MachineStatusPoint[];
        old_machine: MachineStatusPoint[];
    };
};

type ProjectStatusCustomer = {
    id: number;
    bank_desc: string;
    jumlah: number;
    total_mesin: number;
    persentase: number;
};

type ProjectStatusResponse = {
    datas_per_customer: ProjectStatusCustomer[];
};

type Loadable<T> =
    | { state: "idle" | "loading" }
    | { state: "error"; message: string }
    | { state: "success"; data: T };

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
}

function resolveYear(value: string | null, nowYear: number) {
    const parsed = Number(value ?? nowYear);
    if (!Number.isFinite(parsed)) return nowYear;
    const year = Math.floor(parsed);
    if (year < nowYear - 5 || year > nowYear) return nowYear;
    return year;
}

function resolveMonth(value: string | null, nowMonth: number) {
    const parsed = Number(value ?? nowMonth);
    if (!Number.isFinite(parsed)) return nowMonth;
    const month = Math.floor(parsed);
    if (month < 1 || month > 12) return nowMonth;
    return month;
}

export default function ProjectTab() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;

    const rawYearParam = searchParams.get("year");
    const rawMonthParam = searchParams.get("month");
    const year = resolveYear(rawYearParam, nowYear);
    const month = resolveMonth(rawMonthParam, nowMonth);
    const [reloadKey, setReloadKey] = useState(0);
    const { copyFeedback, copyViewLink } = useCopyViewLink(pathname, searchParams);
    const updateQueryParams = useDashboardQueryParams(pathname, searchParams, router);

    const machineUrl = `/api/getDataMachineStatus?year=${year}&month=${pad2(month)}`;
    const projectUrl = `/api/getDataProjectStatus?year=${year}&month=${pad2(month)}`;

    const [machineStatus, setMachineStatus] = useState<Loadable<MachineStatusResponse>>({ state: "idle" });
    const [projectStatus, setProjectStatus] = useState<Loadable<ProjectStatusResponse>>({ state: "idle" });

    const updateDateParams = (next: { year?: number; month?: number }) => {
        updateQueryParams((params) => {
            const nextYear = next.year ?? year;
            const nextMonth = next.month ?? month;

            if (nextYear === nowYear) params.delete("year");
            else params.set("year", String(nextYear));

            if (nextMonth === nowMonth) params.delete("month");
            else params.set("month", pad2(nextMonth));
        });
    };

    const load = useCallback(() => {
        setReloadKey((current) => current + 1);
    }, []);


    useEffect(() => {
        if (rawYearParam === null && rawMonthParam === null) return;

        const canonicalYear = year === nowYear ? null : String(year);
        const canonicalMonth = month === nowMonth ? null : pad2(month);

        if (rawYearParam === canonicalYear && rawMonthParam === canonicalMonth) return;

        updateQueryParams((params) => {
            if (canonicalYear === null) params.delete("year");
            else params.set("year", canonicalYear);

            if (canonicalMonth === null) params.delete("month");
            else params.set("month", canonicalMonth);
        });
    }, [month, nowMonth, nowYear, rawMonthParam, rawYearParam, updateQueryParams, year]);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setMachineStatus({ state: "loading" });
            setProjectStatus({ state: "loading" });

            const [machineResult, projectResult] = await Promise.allSettled([
                fetchJson<MachineStatusResponse>(machineUrl),
                fetchJson<ProjectStatusResponse>(projectUrl),
            ]);

            if (cancelled) return;

            if (machineResult.status === "fulfilled") {
                setMachineStatus({ state: "success", data: machineResult.value });
            } else {
                const msg = machineResult.reason instanceof Error ? machineResult.reason.message : "Failed to load machine status";
                setMachineStatus({ state: "error", message: msg });
            }

            if (projectResult.status === "fulfilled") {
                setProjectStatus({ state: "success", data: projectResult.value });
            } else {
                const msg = projectResult.reason instanceof Error ? projectResult.reason.message : "Failed to load project status";
                setProjectStatus({ state: "error", message: msg });
            }
        }

        void fetchData();

        return () => {
            cancelled = true;
        };
    }, [machineUrl, projectUrl, reloadKey]);

    const totals = useMemo(() => {
        if (projectStatus.state !== "success") return null;

        const rows = projectStatus.data.datas_per_customer;
        const totalMesin = rows.reduce((acc, row) => acc + row.total_mesin, 0);
        const installed = rows.reduce((acc, row) => acc + row.jumlah, 0);
        const pct = totalMesin ? (installed * 100) / totalMesin : 0;

        return { totalMesin, installed, pct };
    }, [projectStatus]);

    const summaryState = useMemo<"idle" | "loading" | "error" | "success">(() => {
        if (projectStatus.state === "error") return "error";
        if (projectStatus.state === "loading") return "loading";
        if (projectStatus.state === "idle") return "idle";
        return "success";
    }, [projectStatus.state]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Project Filters</div>

                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <label className="text-xs text-zinc-500">Year</label>
                    <select
                        value={year}
                        onChange={(e) => {
                            const nextYear = Number(e.target.value);
                            updateDateParams({ year: nextYear });
                        }}
                        className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    >
                        {Array.from({ length: 6 }).map((_, i) => {
                            const optionYear = now.getFullYear() - i;
                            return (
                                <option key={optionYear} value={optionYear}>
                                    {optionYear}
                                </option>
                            );
                        })}
                    </select>

                    <label className="ml-2 text-xs text-zinc-500">Month</label>
                    <select
                        value={month}
                        onChange={(e) => {
                            const nextMonth = Number(e.target.value);
                            updateDateParams({ month: nextMonth });
                        }}
                        className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    >
                        {Array.from({ length: 12 }).map((_, i) => {
                            const optionMonth = i + 1;
                            return (
                                <option key={optionMonth} value={optionMonth}>
                                    {pad2(optionMonth)}
                                </option>
                            );
                        })}
                    </select>

                    <button
                        type="button"
                        onClick={() => updateDateParams({ year: nowYear, month: nowMonth })}
                        className="ml-2 h-9 rounded-xl border border-zinc-200 px-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        Reset period
                    </button>
                    <button
                        type="button"
                        onClick={load}
                        className="h-9 rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        onClick={copyViewLink}
                        className="h-9 rounded-xl border border-zinc-200 px-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        Copy view link
                    </button>
                </div>
            </div>

            {copyFeedback && <CopyFeedbackMessage feedback={copyFeedback} className="text-xs font-semibold" />}

            <DataState
                state={summaryState}
                errorMessage={projectStatus.state === "error" ? projectStatus.message : undefined}
                onRetry={load}
            >
                <div className="grid gap-3 md:grid-cols-3">
                    <SummaryCard label="Total Mesin" value={totals ? formatDashboardNumber(totals.totalMesin) : "—"} />
                    <SummaryCard label="Installed" value={totals ? formatDashboardNumber(totals.installed) : "—"} />
                    <SummaryCard label="Installed %" value={totals ? `${totals.pct.toFixed(2)}%` : "—"} />
                </div>
            </DataState>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Machine Status (Daily)</div>
                </div>

                <div className="mt-3">
                    <DataState
                        state={machineStatus.state}
                        errorMessage={machineStatus.state === "error" ? machineStatus.message : undefined}
                        onRetry={load}
                        empty={
                            machineStatus.state === "success" &&
                            machineStatus.data.data_range.new_machine.length === 0 &&
                            machineStatus.data.data_range.old_machine.length === 0
                        }
                        emptyMessage="No machine status data found for selected period."
                    >
                        <div className="grid gap-3 md:grid-cols-2">
                            <StatusTable title="New Machine" rows={machineStatus.state === "success" ? machineStatus.data.data_range.new_machine : []} />
                            <StatusTable title="Old Machine" rows={machineStatus.state === "success" ? machineStatus.data.data_range.old_machine : []} />
                        </div>
                    </DataState>
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Project Status (Per Customer)</div>
                </div>

                <div className="mt-3">
                    <DataState
                        state={projectStatus.state}
                        errorMessage={projectStatus.state === "error" ? projectStatus.message : undefined}
                        onRetry={load}
                        empty={projectStatus.state === "success" && projectStatus.data.datas_per_customer.length === 0}
                        emptyMessage="No project status data found for selected period."
                    >
                        <div className="h-96 overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-[720px] w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                                    <tr>
                                        <th className="px-3 py-2">Customer</th>
                                        <th className="px-3 py-2">Installed</th>
                                        <th className="px-3 py-2">Total Mesin</th>
                                        <th className="px-3 py-2">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectStatus.state === "success" && projectStatus.data.datas_per_customer.map((row) => (
                                        <tr key={row.id} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{row.bank_desc}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{formatDashboardNumber(row.jumlah)}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{formatDashboardNumber(row.total_mesin)}</td>
                                            <td className="px-3 py-2">
                                                <span className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500/15 via-sky-500/15 to-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                                                    {row.persentase.toFixed(1)}%
                                                </span>
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

function SummaryCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-xs text-zinc-500">{label}</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</div>
        </div>
    );
}

function StatusTable({ title, rows }: { title: string; rows: MachineStatusPoint[] }) {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                {title}
            </div>
            <div className="max-h-64 overflow-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                        <tr>
                            <th className="px-3 py-2">Tanggal</th>
                            <th className="px-3 py-2">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.tanggal} className="border-t border-zinc-200 dark:border-zinc-800">
                                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.tanggal}</td>
                                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{formatDashboardNumber(Number(row.jumlah))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
