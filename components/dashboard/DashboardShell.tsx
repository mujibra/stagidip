"use client";

import { motion } from "framer-motion";
import DashboardTabs from "../dashboard/DashboardTabs";

export default function DashboardShell() {
    return (
        <div className="min-h-[calc(100vh-0px)]">
            {/* Header (FusePageCarded header vibe) */}
            <div className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mx-auto max-w-6xl px-6 py-14">
                    <motion.div
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            <span className="bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                                StagiDIP
                            </span>
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Monitor and Review Performance Report
                        </p>
                    </motion.div>
                </div>

                {/* soft glow */}
                <div className="pointer-events-none absolute inset-0 opacity-60">
                    <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="absolute -top-24 left-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="absolute -top-24 left-2/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-6">
                <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.05 }}
                    className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                    <div className="p-4 sm:p-6">
                        <DashboardTabs />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
