"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { useDebouncedValue } from "@/lib/client/useDebouncedValue";

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

type PurchaseOrderFormValues = {
  no_po: string;
  tgl_po: string;
  id_type_mesin: string;
  model: string;
  customer: string;
  jumlah: string;
  status_po: string;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
const DEFAULT_PAGE_SIZE = 25;
const STATUS_ALL = "all";
const STATUS_WITH = "__WITH_STATUS__";
const STATUS_WITHOUT = "__WITHOUT_STATUS__";

const EMPTY_FORM: PurchaseOrderFormValues = {
  no_po: "",
  tgl_po: "",
  id_type_mesin: "",
  model: "",
  customer: "",
  jumlah: "",
  status_po: "",
};

function resolveStatusFilter(value: string | null) {
  if (!value) return STATUS_ALL;
  if (value === STATUS_ALL || value === STATUS_WITH || value === STATUS_WITHOUT) return value;
  return value;
}

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

function escapeCsvValue(value: unknown) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function toStringValue(value: number | string | null | undefined) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function parseNumericField(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}


function resolvePage(value: string | null) {
  const parsed = Number(value ?? "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function resolvePageSize(value: string | null) {
  const parsed = Number(value ?? String(DEFAULT_PAGE_SIZE));
  if (PAGE_SIZE_OPTIONS.includes(parsed as (typeof PAGE_SIZE_OPTIONS)[number])) {
    return parsed as (typeof PAGE_SIZE_OPTIONS)[number];
  }
  return DEFAULT_PAGE_SIZE;
}

function buildCanonicalQueryString(params: URLSearchParams, next: {
  q: string;
  status: string;
  page: number;
  pageSize: number;
}) {
  const nextParams = new URLSearchParams(params.toString());

  if (next.q) nextParams.set("q", next.q);
  else nextParams.delete("q");

  if (next.status !== STATUS_ALL) nextParams.set("status", next.status);
  else nextParams.delete("status");

  if (next.page > 1) nextParams.set("page", String(next.page));
  else nextParams.delete("page");

  if (next.pageSize !== DEFAULT_PAGE_SIZE) nextParams.set("pageSize", String(next.pageSize));
  else nextParams.delete("pageSize");

  return nextParams.toString();
}

export default function PurchaseOrderPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = (searchParams.get("q") ?? "").trim();
  const initialStatus = resolveStatusFilter(searchParams.get("status"));
  const initialPage = resolvePage(searchParams.get("page"));
  const initialPageSize = resolvePageSize(searchParams.get("pageSize"));

  const [rows, setRows] = useState<PurchaseOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(query, 250);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(initialPageSize);
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<PurchaseOrderFormValues>(EMPTY_FORM);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const nextQuery = (searchParams.get("q") ?? "").trim();
    const nextStatus = resolveStatusFilter(searchParams.get("status"));
    const nextPage = resolvePage(searchParams.get("page"));
    const nextPageSize = resolvePageSize(searchParams.get("pageSize"));

    setQuery(nextQuery);
    setStatusFilter(nextStatus);
    setPage(nextPage);
    setPageSize(nextPageSize);
  }, [searchParams]);


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const canonicalQuery = buildCanonicalQueryString(params, {
      q: (searchParams.get("q") ?? "").trim(),
      status: resolveStatusFilter(searchParams.get("status")),
      page: resolvePage(searchParams.get("page")),
      pageSize: resolvePageSize(searchParams.get("pageSize")),
    });

    const currentQuery = searchParams.toString();
    if (canonicalQuery === currentQuery) return;

    router.replace(canonicalQuery ? `${pathname}?${canonicalQuery}` : pathname);
  }, [pathname, router, searchParams]);

  const updateUrlState = (next: {
    q?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    const nextQuery = (next.q ?? query).trim();
    const nextStatus = resolveStatusFilter(next.status ?? statusFilter);
    const nextPage = Math.max(1, Math.floor(next.page ?? page));
    const nextPageSize = resolvePageSize(String(next.pageSize ?? pageSize));

    const queryString = buildCanonicalQueryString(params, {
      q: nextQuery,
      status: nextStatus,
      page: nextPage,
      pageSize: nextPageSize,
    });
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

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
    const keyword = debouncedQuery.trim().toLowerCase();

    return rows.filter((row) => {
      const status = (row.status_po ?? "").trim();
      if (statusFilter === STATUS_WITH && !status) return false;
      if (statusFilter === STATUS_WITHOUT && status) return false;
      if (statusFilter !== STATUS_ALL && statusFilter !== STATUS_WITH && statusFilter !== STATUS_WITHOUT && status !== statusFilter) {
        return false;
      }

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
  }, [debouncedQuery, rows, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const activePage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, activePage, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const clearFilters = () => {
    setQuery("");
    setStatusFilter(STATUS_ALL);
    setPage(1);
    setPageSize(DEFAULT_PAGE_SIZE);
    updateUrlState({ q: "", status: STATUS_ALL, page: 1, pageSize: DEFAULT_PAGE_SIZE });
  };

  const copyCurrentViewLink = async () => {
    const currentUrl = `${window.location.origin}${pathname}${window.location.search}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setActionMessage({ type: "success", text: "View link copied." });
    } catch {
      setActionMessage({ type: "error", text: "Failed to copy link." });
    }
  };

  const downloadCurrentViewCsv = () => {
    const headers = ["PO Number", "PO Date", "Type Mesin", "Model", "Customer", "Jumlah", "Status"];
    const lines = [headers.join(",")];

    for (const row of filteredRows) {
      lines.push(
        [
          escapeCsvValue(row.no_po),
          escapeCsvValue(formatDate(row.tgl_po)),
          escapeCsvValue(row.id_type_mesin),
          escapeCsvValue(row.model),
          escapeCsvValue(row.customer),
          escapeCsvValue(row.jumlah),
          escapeCsvValue((row.status_po ?? "").trim() || "-"),
        ].join(",")
      );
    }

    const csvText = lines.join("\n");
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `purchase-order-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setActionMessage({ type: "success", text: "CSV exported." });
  };

  const openCreateModal = () => {
    setSelectedRowId(null);
    setFormValues(EMPTY_FORM);
    setModalMode("create");
  };

  const openEditModal = (row: PurchaseOrderRow) => {
    setSelectedRowId(row.id);
    setFormValues({
      no_po: toStringValue(row.no_po),
      tgl_po: toStringValue(row.tgl_po),
      id_type_mesin: toStringValue(row.id_type_mesin),
      model: toStringValue(row.model),
      customer: toStringValue(row.customer),
      jumlah: toStringValue(row.jumlah),
      status_po: toStringValue(row.status_po),
    });
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedRowId(null);
    setFormValues(EMPTY_FORM);
  };

  const handleFormChange = (field: keyof PurchaseOrderFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async () => {
    const requiredError =
      !parseNumericField(formValues.id_type_mesin) ||
      !parseNumericField(formValues.model) ||
      !parseNumericField(formValues.jumlah);

    if (requiredError) {
      setActionMessage({ type: "error", text: "Type Mesin, Model, and Jumlah are required numeric values." });
      return;
    }

    setFormSubmitting(true);

    const payload = {
      no_po: formValues.no_po.trim() || undefined,
      tgl_po: formValues.tgl_po.trim() || undefined,
      id_type_mesin: parseNumericField(formValues.id_type_mesin),
      model: parseNumericField(formValues.model),
      customer: parseNumericField(formValues.customer),
      jumlah: parseNumericField(formValues.jumlah),
      status_po: formValues.status_po.trim() || undefined,
    };

    try {
      const response = await fetch(
        modalMode === "edit" && selectedRowId
          ? `/api/purchaseOrder/${selectedRowId}`
          : "/api/purchaseOrder",
        {
          method: modalMode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setActionMessage({
          type: "error",
          text: result.message ?? `Failed to ${modalMode === "edit" ? "update" : "create"} purchase order.`,
        });
        return;
      }

      setActionMessage({
        type: "success",
        text: modalMode === "edit" ? "Purchase order updated." : "Purchase order created.",
      });
      closeModal();
      await loadPurchaseOrders();
    } catch {
      setActionMessage({ type: "error", text: "Failed to submit purchase order form." });
    } finally {
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    if (!actionMessage) return;
    const timer = window.setTimeout(() => setActionMessage(null), 2200);
    return () => window.clearTimeout(timer);
  }, [actionMessage]);

  return (
    <div>
      <PageHeader
        title="Purchase Order"
        subtitle="Review purchase order records, apply filters, and run create/edit parity checks."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => {
            setStatusFilter(STATUS_ALL);
            setPage(1);
            updateUrlState({ status: STATUS_ALL, page: 1 });
          }}
          className="rounded-xl border border-zinc-200 bg-white p-3 text-left dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="text-xs text-zinc-500">Total PO</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{summary.total}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter(STATUS_WITH);
            setPage(1);
            updateUrlState({ status: STATUS_WITH, page: 1 });
          }}
          className="rounded-xl border border-zinc-200 bg-white p-3 text-left dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="text-xs text-zinc-500">With Status</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{summary.withStatus}</div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter(STATUS_WITHOUT);
            setPage(1);
            updateUrlState({ status: STATUS_WITHOUT, page: 1 });
          }}
          className="rounded-xl border border-zinc-200 bg-white p-3 text-left dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="text-xs text-zinc-500">Without Status</div>
          <div className="mt-1 text-2xl font-semibold text-amber-600 dark:text-amber-400">{summary.withoutStatus}</div>
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="search"
            placeholder="Search PO / date / model / customer..."
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              setPage(1);
              updateUrlState({ q: value, page: 1 });
            }}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-80 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          />

          <select
            value={statusFilter}
            onChange={(event) => {
              const value = event.target.value;
              setStatusFilter(value);
              setPage(1);
              updateUrlState({ status: value, page: 1 });
            }}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value={STATUS_ALL}>All statuses</option>
            <option value={STATUS_WITH}>With status</option>
            <option value={STATUS_WITHOUT}>Without status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={pageSize}
            onChange={(event) => {
              const value = Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number];
              setPageSize(value);
              setPage(1);
              updateUrlState({ pageSize: value, page: 1 });
            }}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500"
          >
            Add PO
          </button>

          <button
            type="button"
            onClick={() => void copyCurrentViewLink()}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Copy Link
          </button>

          <button
            type="button"
            onClick={downloadCurrentViewCsv}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => void loadPurchaseOrders()}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Refresh
          </button>
        </div>
      </div>

      {actionMessage ? (
        <div
          className={[
            "mb-4 rounded-lg px-4 py-2 text-sm",
            actionMessage.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {actionMessage.text}
        </div>
      ) : null}

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
        sortStorageKey="purchase-order:sort"
        rowKey="id"
        containerClassName="max-h-[640px]"
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
            sortValue: (row) => (row.status_po ?? "").trim().toLowerCase(),
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
          {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (row) => (
              <button
                type="button"
                onClick={() => openEditModal(row)}
                className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Edit
              </button>
            ),
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
            onClick={() => {
              const nextPage = Math.max(1, activePage - 1);
              setPage(nextPage);
              updateUrlState({ page: nextPage });
            }}
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
            onClick={() => {
              const nextPage = Math.min(totalPages, activePage + 1);
              setPage(nextPage);
              updateUrlState({ page: nextPage });
            }}
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
          >
            Next
          </button>
        </div>
      </div>

      {modalMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-5 shadow-xl dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {modalMode === "create" ? "Create Purchase Order" : "Edit Purchase Order"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-200"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-xs text-zinc-500">
                PO Number
                <input
                  value={formValues.no_po}
                  onChange={(event) => handleFormChange("no_po", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500">
                PO Date
                <input
                  value={formValues.tgl_po}
                  onChange={(event) => handleFormChange("tgl_po", event.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500">
                Type Mesin *
                <input
                  value={formValues.id_type_mesin}
                  onChange={(event) => handleFormChange("id_type_mesin", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500">
                Model *
                <input
                  value={formValues.model}
                  onChange={(event) => handleFormChange("model", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500">
                Customer
                <input
                  value={formValues.customer}
                  onChange={(event) => handleFormChange("customer", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500">
                Jumlah *
                <input
                  value={formValues.jumlah}
                  onChange={(event) => handleFormChange("jumlah", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
              <label className="space-y-1 text-xs text-zinc-500 sm:col-span-2">
                Status
                <input
                  value={formValues.status_po}
                  onChange={(event) => handleFormChange("status_po", event.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void submitForm()}
                disabled={formSubmitting}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
              >
                {formSubmitting ? "Saving..." : modalMode === "create" ? "Create" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
