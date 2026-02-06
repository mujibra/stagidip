"use client";

import type { ReactNode } from "react";

type DataStateProps = {
    state: "idle" | "loading" | "error" | "success";
    errorMessage?: string;
    empty?: boolean;
    emptyMessage?: string;
    onRetry?: () => void;
    children: ReactNode;
};

export default function DataState({
    state,
    errorMessage,
    empty = false,
    emptyMessage = "No data found.",
    onRetry,
    children,
}: DataStateProps) {
    if (state === "loading" || state === "idle") {
        return <div className="text-sm text-zinc-500">Loading…</div>;
    }

    if (state === "error") {
        return (
            <div className="space-y-2">
                <div className="text-sm text-red-500">{errorMessage ?? "Failed to load data."}</div>
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex h-8 items-center rounded-lg border border-zinc-300 px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        Retry
                    </button>
                )}
            </div>
        );
    }

    if (empty) {
        return <div className="text-sm text-zinc-500">{emptyMessage}</div>;
    }

    return <>{children}</>;
}
