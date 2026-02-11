"use client";

import { useMemo, useState } from "react";
import type React from "react";

type SortDirection = "asc" | "desc";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | null | undefined;
};

type RowKeyGetter<T> = keyof T | ((row: T, index: number) => string | number);

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

function compareValues(a: unknown, b: unknown, direction: SortDirection) {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;

  const aNumber = typeof a === "number" ? a : Number(a);
  const bNumber = typeof b === "number" ? b : Number(b);

  const isNumeric = Number.isFinite(aNumber) && Number.isFinite(bNumber);

  const base = isNumeric
    ? aNumber - bNumber
    : String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });

  return direction === "asc" ? base : -base;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  emptyText = "No data",
  sortable = false,
  rowKey,
  containerClassName,
}: {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
  sortable?: boolean;
  rowKey?: RowKeyGetter<T>;
  containerClassName?: string;
}) {
  const [sortState, setSortState] = useState<{ key: string; direction: SortDirection } | null>(null);

  const displayedData = useMemo(() => {
    if (!sortable || !sortState) return data;

    const column = columns.find((item) => String(item.key) === sortState.key);
    if (!column || !column.sortable) return data;

    const rows = [...data];
    rows.sort((left, right) => {
      const leftValue = column.sortValue ? column.sortValue(left) : left[column.key as keyof T];
      const rightValue = column.sortValue ? column.sortValue(right) : right[column.key as keyof T];
      return compareValues(leftValue, rightValue, sortState.direction);
    });

    return rows;
  }, [columns, data, sortState, sortable]);

  const handleSort = (column: Column<T>) => {
    if (!sortable || !column.sortable) return;

    const key = String(column.key);
    setSortState((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }

      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }

      return null;
    });
  };

  const resolveRowKey = (row: T, index: number) => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }

    if (rowKey) {
      const keyValue = row[rowKey];
      if (typeof keyValue === "string" || typeof keyValue === "number") {
        return keyValue;
      }
    }

    if (typeof row.id === "string" || typeof row.id === "number") {
      return row.id;
    }

    return index;
  };

  return (
    <div
      className={[
        "overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        containerClassName ?? "max-h-[800px]",
      ].join(" ")}
    >
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/90 dark:text-zinc-400">
          <tr>
            {columns.map((column) => {
              const key = String(column.key);
              const isActiveSort = sortState?.key === key;

              return (
                <th key={key} className={`px-3 py-3 ${column.className ?? ""}`}>
                  <button
                    type="button"
                    onClick={() => handleSort(column)}
                    disabled={!sortable || !column.sortable}
                    className={[
                      "inline-flex items-center gap-1",
                      sortable && column.sortable
                        ? "cursor-pointer text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                        : "cursor-default",
                    ].join(" ")}
                  >
                    <span>{column.label}</span>
                    {sortable && column.sortable ? (
                      <span className="text-[10px] leading-none">
                        {isActiveSort ? (sortState?.direction === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    ) : null}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-zinc-500">
                Loading...
              </td>
            </tr>
          ) : displayedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-zinc-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            displayedData.map((row, index) => (
              <tr
                key={resolveRowKey(row, index)}
                className="border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/20"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className={`px-3 py-3 ${column.className ?? ""}`}>
                    {column.render ? column.render(row, index) : formatValue(row[column.key as keyof T])}
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
