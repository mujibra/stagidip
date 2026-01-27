"use client";

import { useMemo, useState } from "react";

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
    jumlah: number; // installed
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

export default function ProjectTab() {
    const now = new Date();
    const [year, setYear] = useState<number>(now.getFullYear());
    const [month, setMonth] = useState<number>(now.getMonth() + 1);

    const machineUrl = useMemo(
        () => `/api/getDataMachineStatus?year=${year}&month=${pad2(month)}`,
        [year, month]
    );

    const projectUrl = useMemo(
        () => `/api/getDataProjectStatus?year=${year}&month=${pad2(month)}`,
        [year, month]
    );

    const [machineStatus, setMachineStatus] = useState<Loadable<MachineStatusResponse>>({ state: "idle" });
    const [projectStatus, setProjectStatus] = useState<Loadable<ProjectStatusResponse>>({ state: "idle" });

    async function load() {
        setMachineStatus({ state: "loading" });
        setProjectStatus({ state: "loading" });

        try {
            const [ms, ps] = await Promise.all([
                fetchJson<MachineStatusResponse>(machineUrl),
                fetchJson<ProjectStatusResponse>(projectUrl),
            ]);

            setMachineStatus({ state: "success", data: ms });
            setProjectStatus({ state: "success", data: ps });
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            setMachineStatus({ state: "error", message: msg });
            setProjectStatus({ state: "error", message: msg });
        }
    }

    // auto-load on first render + when filters change (but without the “sync derived state” trap)
    useMemo(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [machineUrl, projectUrl]);

    const totals = useMemo(() => {
        if (projectStatus.state !== "success") return null;

        const rows = projectStatus.data.datas_per_customer;
        const totalMesin = rows.reduce((acc, r) => acc + r.total_mesin, 0);
        const installed = rows.reduce((acc, r) => acc + r.jumlah, 0);
        const pct = totalMesin ? (installed * 100) / totalMesin : 0;

        return { totalMesin, installed, pct };
    }, [projectStatus]);

    return (
        <div className="space-y-4">
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Project Filters</div>

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

                    <label className="ml-2 text-xs text-zinc-500">Month</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                    >
                        {Array.from({ length: 12 }).map((_, i) => {
                            const m = i + 1;
                            return (
                                <option key={m} value={m}>
                                    {pad2(m)}
                                </option>
                            );
                        })}
                    </select>

                    <button
                        type="button"
                        onClick={() => void load()}
                        className="ml-2 h-9 rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">Total Mesin</div>
                    <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {totals ? totals.totalMesin.toLocaleString() : "—"}
                    </div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">Installed</div>
                    <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {totals ? totals.installed.toLocaleString() : "—"}
                    </div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500">Installed %</div>
                    <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {totals ? `${totals.pct.toFixed(1)}%` : "—"}
                    </div>
                </div>
            </div>

            {/* Machine status data (raw table for correctness first) */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Machine Status (Daily)</div>
                    {/* <div className="text-xs text-zinc-500">{machineUrl}</div> */}
                </div>

                <div className="mt-3">
                    {machineStatus.state === "loading" && <div className="text-sm text-zinc-500">Loading…</div>}
                    {machineStatus.state === "error" && <div className="text-sm text-red-500">{machineStatus.message}</div>}
                    {machineStatus.state === "success" && (
                        <div className="grid gap-3 md:grid-cols-2">
                            <StatusTable title="New Machine" rows={machineStatus.data.data_range.new_machine} />
                            <StatusTable title="Old Machine" rows={machineStatus.data.data_range.old_machine} />
                        </div>
                    )}
                </div>
            </div>

            {/* Project status table */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Project Status (Per Customer)</div>
                    {/* <div className="text-xs text-zinc-500">{projectUrl}</div> */}
                </div>

                <div className="mt-3">
                    {projectStatus.state === "loading" && <div className="text-sm text-zinc-500">Loading…</div>}
                    {projectStatus.state === "error" && <div className="text-sm text-red-500">{projectStatus.message}</div>}
                    {projectStatus.state === "success" && (
                        <div className="overflow-auto h-96 rounded-xl border border-zinc-200 dark:border-zinc-800">
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
                                    {projectStatus.data.datas_per_customer.map((r) => (
                                        <tr key={r.id} className="border-t border-zinc-200 dark:border-zinc-800">
                                            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">{r.bank_desc}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{r.jumlah.toLocaleString()}</td>
                                            <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{r.total_mesin.toLocaleString()}</td>
                                            <td className="px-3 py-2">
                                                <span className="inline-flex items-center rounded-full bg-linear-to-r from-indigo-500/15 via-sky-500/15 to-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                                                    {r.persentase.toFixed(1)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {projectStatus.data.datas_per_customer.length === 0 && (
                                        <tr>
                                            <td className="px-3 py-6 text-sm text-zinc-500" colSpan={4}>
                                                No data
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
                        {rows.map((r) => (
                            <tr key={r.tanggal} className="border-t border-zinc-200 dark:border-zinc-800">
                                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{r.tanggal}</td>
                                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{Number(r.jumlah).toLocaleString()}</td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td className="px-3 py-6 text-sm text-zinc-500" colSpan={2}>
                                    No data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
