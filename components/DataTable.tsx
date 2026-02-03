"use client";

import type React from "react";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

export default function DataTable<T extends Record<string, any>>({
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
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
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
              <tr key={row.id ?? i} className="border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/20">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-3 py-3 ${c.className ?? ""}`}>
                    {c.render ? c.render(row, i) : String((row as any)[c.key] ?? "")}
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
