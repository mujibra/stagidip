"use client";

import { useEffect, useMemo, useState } from "react";
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

const INDONESIA_DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function formatIndonesianDate(value: Date) {
  return INDONESIA_DATE_FORMATTER.format(value);
}

function parseDateCandidate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const looksLikeDate = /^\d{4}-\d{2}-\d{2}/.test(trimmed) || /^\d{4}\/\d{2}\/\d{2}/.test(trimmed);
  if (!looksLikeDate) return null;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function formatObjectValue(value: Record<string, unknown>): string {
  const preferredKeys = ["label", "name", "nama", "gudang_desc", "code", "alamat", "id"];

  const preferredValues = preferredKeys
    .map((key) => value[key])
    .filter((entry): entry is string | number => typeof entry === "string" || typeof entry === "number")
    .map((entry) => String(entry).trim())
    .filter(Boolean);

  if (preferredValues.length > 0) {
    return preferredValues.join(" • ");
  }

  const primitiveEntries = Object.entries(value)
    .filter(([, entry]) => typeof entry === "string" || typeof entry === "number" || typeof entry === "boolean")
    .slice(0, 3)
    .map(([key, entry]) => `${key}: ${String(entry)}`);

  if (primitiveEntries.length > 0) {
    return primitiveEntries.join(" • ");
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return formatIndonesianDate(value);
  if (typeof value === "string") {
    const parsed = parseDateCandidate(value);
    return parsed ? formatIndonesianDate(parsed) : value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const snMesinValues = value
      .map((entry) => {
        if (entry && typeof entry === "object" && "snMesin" in entry) {
          const sn = entry.snMesin;
          return typeof sn === "string" || typeof sn === "number" ? String(sn) : "";
        }

        return formatValue(entry);
      })
      .filter((entry) => entry.trim().length > 0);

    return snMesinValues.join(", ");
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
        return formatIndonesianDate(new Date(value.toISOString()));
      } catch {
        return String(value);
      }
    }

    return formatObjectValue(value as Record<string, unknown>);
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
  sortStorageKey,
  loadingRows = 6,
}: {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
  sortable?: boolean;
  rowKey?: RowKeyGetter<T>;
  containerClassName?: string;
  sortStorageKey?: string;
  loadingRows?: number;
}) {
  const [sortState, setSortState] = useState<{ key: string; direction: SortDirection } | null>(() => {
    if (!sortStorageKey || typeof window === "undefined") return null;

    try {
      const raw = window.localStorage.getItem(sortStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { key?: string; direction?: SortDirection };

      if ((parsed.direction === "asc" || parsed.direction === "desc") && typeof parsed.key === "string") {
        return { key: parsed.key, direction: parsed.direction };
      }
    } catch {
      return null;
    }

    return null;
  });

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

  useEffect(() => {
    if (!sortStorageKey || typeof window === "undefined") return;

    if (!sortState) {
      window.localStorage.removeItem(sortStorageKey);
      return;
    }

    window.localStorage.setItem(sortStorageKey, JSON.stringify(sortState));
  }, [sortState, sortStorageKey]);

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
      <table className="min-w-full table-fixed text-sm">
        <thead className="sticky top-0 z-10 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/90 dark:text-zinc-400">
          <tr>
            {columns.map((column) => {
              const key = String(column.key);
              const isActiveSort = sortState?.key === key;
              const ariaSort = !sortable || !column.sortable
                ? "none"
                : !isActiveSort
                  ? "none"
                  : sortState?.direction === "asc"
                    ? "ascending"
                    : "descending";

              return (
                <th key={key} scope="col" aria-sort={ariaSort} className={`px-3 py-3 align-top ${column.className ?? ""}`}>
                  <button
                    type="button"
                    onClick={() => handleSort(column)}
                    disabled={!sortable || !column.sortable}
                    aria-label={
                      sortable && column.sortable
                        ? `Sort by ${column.label}`
                        : column.label
                    }
                    title={
                      sortable && column.sortable
                        ? isActiveSort
                          ? `Sorted ${sortState?.direction}. Click to toggle.`
                          : `Sort by ${column.label}`
                        : undefined
                    }
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
                    {sortable && column.sortable ? (
                      <span className="sr-only">
                        {isActiveSort
                          ? `Sorted ${sortState?.direction === "asc" ? "ascending" : "descending"}`
                          : "Not sorted"}
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
            Array.from({ length: Math.max(1, loadingRows) }).map((_, rowIndex) => (
              <tr key={`loading-${rowIndex}`} className="border-t border-zinc-100 dark:border-zinc-900">
                {columns.map((column) => (
                  <td key={`loading-${rowIndex}-${String(column.key)}`} className={`px-3 py-3 align-top break-words ${column.className ?? ""}`}>
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                  </td>
                ))}
              </tr>
            ))
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
                  <td key={String(column.key)} className={`px-3 py-3 align-top break-words ${column.className ?? ""}`}>
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
