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

export default function PurchaseOrderPage() {
  const [rows, setRows] = useState<PurchaseOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const filteredRows = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return rows.filter((row) => {
      const status = (row.status_po ?? "").trim();
      if (statusFilter === "with-status" && !status) return false;
      if (statusFilter === "without-status" && status) return false;

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

  return (
    <div>
      <PageHeader
        title="Purchase Order"
        subtitle="Review purchase order records and monitor status readiness."
      />

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
            <option value="with-status">With status</option>
            <option value="without-status">Without status</option>
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
        data={filteredRows}
        loading={loading}
        emptyText="No purchase orders found."
        columns={[
          {
            key: "no",
            label: "No",
            render: (_row, index) => <span>{index + 1}</span>,
            className: "w-16 text-center",
          },
          { key: "no_po", label: "PO Number", className: "min-w-40" },
          { key: "tgl_po", label: "PO Date", className: "min-w-28" },
          { key: "id_type_mesin", label: "Type Mesin" },
          { key: "model", label: "Model" },
          { key: "customer", label: "Customer" },
          { key: "jumlah", label: "Jumlah" },
          {
            key: "status_po",
            label: "Status",
            render: (row) => {
              const status = (row.status_po ?? "").trim();
              if (!status) {
                return <span className="text-zinc-400">—</span>;
              }

              return (
                <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  {status}
                </span>
              );
            },
          },
        ]}
      />
    </div>
  );
}
