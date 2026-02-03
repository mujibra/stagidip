"use client";

import { motion } from "framer-motion";
import DashboardTabs from "../dashboard/DashboardTabs";

export default function DashboardShell() {
    return (
        <div className="min-h-[calc(100vh-0px)]">
            {/* Header (FusePageCarded header vibe) */}
            <div className="relative overflow-hidden bg-white dark:border-zinc-800 dark:bg-zinc-950">
                {/* soft glow */}
                <div className="pointer-events-none absolute inset-0 opacity-60">
                    <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="absolute -top-24 left-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="absolute -top-24 left-2/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl py-4">
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
