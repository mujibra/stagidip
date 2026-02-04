"use client";

import type React from "react";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "object") {
    if ("value" in value && (typeof value.value === "string" || typeof value.value === "number")) {
      return String(value.value);
    }
    if ("label" in value && (typeof value.label === "string" || typeof value.label === "number")) {
      return String(value.label);
    }
    if ("toISOString" in value && typeof value.toISOString === "function") {
      try {
        return new Date(value.toISOString()).toLocaleDateString();
      } catch {
        return String(value);
      }
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  emptyText = "No data",
}: {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
}) {
  return (
    <div className="overflow-x-auto h-[800px] rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-400">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className={`px-3 py-3 ${c.className ?? ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-zinc-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-zinc-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={typeof row.id === "string" || typeof row.id === "number" ? row.id : i} className="border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/20">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-3 py-3 ${c.className ?? ""}`}>
                    {c.render ? c.render(row, i) : formatValue(row[c.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
