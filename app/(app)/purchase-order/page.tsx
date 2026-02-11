"use client";

import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

type PurchaseOrderRow = {
  id: number;
  no_po?: string | null;
  tgl_po?: string | null;
  id_type_mesin?: number | null;
  model?: number | null;
  customer?: number | null;
  jumlah?: number | null;
  status_po?: string | null;
};

type PurchaseOrderResponse = {
  success: boolean;
  message?: string;
  totalDatas?: number;
  data?: PurchaseOrderRow[];
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusBadgeClass(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("cancel")) {
    return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
  }
  if (normalized.includes("done") || normalized.includes("complete")) {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
  }
  if (normalized.includes("pending") || normalized.includes("process")) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300";
}

export default function PurchaseOrderPage() {
  const [rows, setRows] = useState<PurchaseOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(25);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const loadPurchaseOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/purchaseOrder", { cache: "no-store" });
      const result: PurchaseOrderResponse = await response.json();

      if (!response.ok || !result.success) {
        setRows([]);
        setError(result.message ?? "Failed to load purchase orders.");
        return;
      }

      setRows(Array.isArray(result.data) ? result.data : []);
      setPage(1);
    } catch {
      setRows([]);
      setError("Failed to load purchase orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPurchaseOrders();
  }, []);

  const statusOptions = useMemo(() => {
    const uniques = new Set<string>();
    for (const row of rows) {
      const status = (row.status_po ?? "").trim();
      if (status) uniques.add(status);
    }

    return Array.from(uniques).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const summary = useMemo(() => {
    const withStatus = rows.filter((row) => (row.status_po ?? "").trim().length > 0).length;
    return {
      total: rows.length,
      withStatus,
      withoutStatus: rows.length - withStatus,
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return rows.filter((row) => {
      const status = (row.status_po ?? "").trim();
      if (statusFilter !== "all" && status !== statusFilter) return false;

      if (!keyword) return true;

      const haystack = [
        row.no_po,
        row.tgl_po,
        row.status_po,
        row.id_type_mesin,
        row.model,
        row.customer,
        row.jumlah,
      ]
        .map((value) => String(value ?? "").toLowerCase())
        .join(" ");

      return haystack.includes(keyword);
    });
  }, [rows, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const activePage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, activePage, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, pageSize]);

  return (
    <div>
      <PageHeader
        title="Purchase Order"
        subtitle="Review purchase order records and monitor status readiness."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Total PO</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{summary.total}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">With Status</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{summary.withStatus}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Without Status</div>
          <div className="mt-1 text-2xl font-semibold text-amber-600 dark:text-amber-400">{summary.withoutStatus}</div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="search"
            placeholder="Search PO / date / model / customer..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-80 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value="all">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => void loadPurchaseOrders()}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
          <div>{error}</div>
          <button
            type="button"
            onClick={() => void loadPurchaseOrders()}
            className="mt-2 rounded-md border border-rose-300 px-3 py-1 text-xs font-medium hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/40"
          >
            Retry
          </button>
        </div>
      ) : null}

      <DataTable
        data={pagedRows}
        loading={loading}
        emptyText="No purchase orders found."
        sortable
        columns={[
          {
            key: "no",
            label: "No",
            render: (_row, index) => <span>{(activePage - 1) * pageSize + index + 1}</span>,
            className: "w-16 text-center",
            sortable: false,
          },
          { key: "no_po", label: "PO Number", className: "min-w-40", sortable: true },
          {
            key: "tgl_po",
            label: "PO Date",
            className: "min-w-28",
            render: (row) => formatDate(row.tgl_po),
            sortable: true,
            sortValue: (row) => row.tgl_po ?? "",
          },
          { key: "id_type_mesin", label: "Type Mesin", sortable: true },
          { key: "model", label: "Model", sortable: true },
          { key: "customer", label: "Customer", sortable: true },
          { key: "jumlah", label: "Jumlah", sortable: true },
          {
            key: "status_po",
            label: "Status",
            sortable: true,
            render: (row) => {
              const status = (row.status_po ?? "").trim();
              if (!status) {
                return <span className="text-zinc-400">—</span>;
              }

              return (
                <span
                  className={[
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                    statusBadgeClass(status),
                  ].join(" ")}
                >
                  {status}
                </span>
              );
            },
          },
        ]}
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-zinc-500">
          Showing {(activePage - 1) * pageSize + (pagedRows.length === 0 ? 0 : 1)}-
          {(activePage - 1) * pageSize + pagedRows.length} of {filteredRows.length} rows
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activePage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
          >
            Prev
          </button>
          <span className="text-xs text-zinc-500">
            Page {activePage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={activePage >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
