"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { useDebouncedValue } from "@/lib/client/useDebouncedValue";

type CrudField = {
  key: string;
  label: string;
  type?: "text" | "textarea";
};

type CrudPageProps = {
  title: string;
  subtitle: string;
  endpoint: string;
  listEndpoint?: string;
  createEndpoint?: string;
  updateEndpoint?: string;
  deleteEndpoint?: string;
  fields: CrudField[];
  createContentType?: "json" | "form";
  updateContentType?: "json" | "form";
  emptyText?: string;
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  dataKey?: string;
  idKey?: string;
  sortable?: boolean;
  allowExportCsv?: boolean;
  exportFileName?: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  datas?: T;
};

type CrudRow = Record<string, unknown>;

const DEFAULT_MESSAGE_TIMEOUT = 3000;
const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

function buildPayload(fields: CrudField[], values: Record<string, unknown>) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    const value = values[field.key];
    acc[field.key] = typeof value === "string" ? value : value == null ? "" : String(value);
    return acc;
  }, {});
}

function asInputValue(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return value == null ? "" : String(value);
}

function escapeCsvValue(value: unknown) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-lg dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function CrudPage({
  title,
  subtitle,
  endpoint,
  listEndpoint,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
  fields,
  createContentType = "json",
  updateContentType = "json",
  emptyText,
  allowCreate = true,
  allowEdit = true,
  allowDelete = true,
  dataKey,
  idKey = "id",
  sortable = true,
  allowExportCsv = true,
  exportFileName,
}: CrudPageProps) {
  const pageSizeStorageKey = `crud:${title}:page-size`;
  const sortStorageKey = `crud:${title}:sort`;
  const [items, setItems] = useState<CrudRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(() => {
    if (typeof window === "undefined") return 25;

    const stored = Number(window.localStorage.getItem(pageSizeStorageKey));
    if (PAGE_SIZE_OPTIONS.includes(stored as (typeof PAGE_SIZE_OPTIONS)[number])) {
      return stored as (typeof PAGE_SIZE_OPTIONS)[number];
    }

    return 25;
  });
  const [dataTableRenderKey, setDataTableRenderKey] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editForm, setEditForm] = useState<CrudRow | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setForm(buildPayload(fields, {}));
  }, [fields]);

  const notify = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), DEFAULT_MESSAGE_TIMEOUT);
  };

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(listEndpoint ?? endpoint);
      const result: ApiResponse<CrudRow[]> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to load data.");
        setItems([]);
        return;
      }
      const data = (dataKey ? (result as Record<string, unknown>)[dataKey] : undefined) ?? result.data ?? result.datas ?? [];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      notify("error", "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [dataKey, endpoint, listEndpoint]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const lower = debouncedQuery.trim().toLowerCase();
    return items.filter((row) =>
      fields.some((field) => String(row[field.key] ?? "").toLowerCase().includes(lower))
    );
  }, [debouncedQuery, fields, items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const activePage = Math.min(page, totalPages);

  const pagedItems = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [activePage, filtered, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, pageSize, items.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(pageSizeStorageKey, String(pageSize));
  }, [pageSize, pageSizeStorageKey]);

  useEffect(() => {
    const onSlashFocusSearch = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      const target = event.target as HTMLElement | null;
      const tagName = (target?.tagName ?? "").toLowerCase();
      const isTypingTarget =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        Boolean(target?.isContentEditable);

      if (isTypingTarget) return;

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", onSlashFocusSearch);
    return () => window.removeEventListener("keydown", onSlashFocusSearch);
  }, []);

  const getRowId = useCallback((row: CrudRow) => {
    const id = row[idKey];
    if (typeof id === "string" || typeof id === "number") {
      return id;
    }

    return row.id;
  }, [idKey]);

  const handleExportCsv = () => {
    const headers = fields.map((field) => field.label);
    const lines = [headers.map((header) => escapeCsvValue(header)).join(",")];

    for (const row of filtered) {
      const values = fields.map((field) => escapeCsvValue(row[field.key]));
      lines.push(values.join(","));
    }

    const csvText = lines.join("\n");
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportFileName ?? title.toLowerCase().replaceAll(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetTablePrefs = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(pageSizeStorageKey);
      window.localStorage.removeItem(sortStorageKey);
    }

    setPageSize(25);
    setPage(1);
    setDataTableRenderKey((value) => value + 1);
    notify("success", "Table preferences reset.");
  };

  const buildBody = (payload: Record<string, string>, mode: "json" | "form") => {
    if (mode === "form") {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
      return { body: formData };
    }

    return {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    };
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = buildPayload(fields, form);
    try {
      const requestBody = buildBody(payload, createContentType);
      const response = await fetch(createEndpoint ?? endpoint, {
        method: "POST",
        ...requestBody,
      });
      const result: ApiResponse<CrudRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to create data.");
        return;
      }
      notify("success", result.message ?? "Data created successfully.");
      setForm(buildPayload(fields, {}));
      setOpenCreate(false);
      void loadItems();
    } catch {
      notify("error", "Failed to create data.");
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm) return;
    const payload = buildPayload(fields, editForm);
    try {
      const requestBody = buildBody(payload, updateContentType);
      const rowId = getRowId(editForm);
      if (!rowId) {
        notify("error", `Cannot update data because \"${idKey}\" is missing.`);
        return;
      }

      const response = await fetch(`${updateEndpoint ?? endpoint}/${rowId}`, {
        method: "PUT",
        ...requestBody,
      });
      const result: ApiResponse<CrudRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to update data.");
        return;
      }
      notify("success", result.message ?? "Data updated successfully.");
      setOpenEdit(false);
      setEditForm(null);
      void loadItems();
    } catch {
      notify("error", "Failed to update data.");
    }
  };

  const handleDelete = useCallback(async (row: CrudRow) => {
    const confirmed = window.confirm(`Sure to delete data ${row[fields[0]?.key] ?? ""}?`);
    if (!confirmed) return;
    const rowId = getRowId(row);
    if (!rowId) {
      notify("error", `Cannot delete data because \"${idKey}\" is missing.`);
      return;
    }

    try {
      const response = await fetch(`${deleteEndpoint ?? endpoint}/${rowId}`, { method: "DELETE" });
      const result: ApiResponse<CrudRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to delete data.");
        return;
      }
      notify("success", result.message ?? "Data deleted successfully.");
      void loadItems();
    } catch {
      notify("error", "Failed to delete data.");
    }
  }, [deleteEndpoint, endpoint, fields, getRowId, idKey, loadItems]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        key: "no",
        label: "No",
        render: (_row: CrudRow, index: number) => (
          <span>{(activePage - 1) * pageSize + index + 1}</span>
        ),
        className: "w-16 text-center",
      },
      ...fields.map((field) => ({
        key: field.key,
        label: field.label,
        sortable: true,
      })),
    ];

    if (allowEdit || allowDelete) {
      baseColumns.push({
        key: "actions",
        label: "Actions",
        render: (row: CrudRow) => (
          <div className="flex flex-wrap justify-end gap-2">
            {allowEdit ? (
              <button
                type="button"
                onClick={() => {
                  setEditForm({ ...row });
                  setOpenEdit(true);
                }}
                className="rounded-md border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50"
              >
                Edit
              </button>
            ) : null}
            {allowDelete ? (
              <button
                type="button"
                onClick={() => handleDelete(row)}
                className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50"
              >
                Delete
              </button>
            ) : null}
          </div>
        ),
        className: "text-right",
      });
    }

    return baseColumns;
  }, [activePage, allowDelete, allowEdit, fields, handleDelete, pageSize]);

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        right={
          allowCreate ? (
            <button
              type="button"
              onClick={() => setOpenCreate(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Add New
            </button>
          ) : null
        }
      />

      {message ? (
        <div
          className={[
            "mb-4 rounded-lg px-4 py-2 text-sm",
            message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {message.text}
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 pr-8 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                aria-label="Clear search"
              >
                ×
              </button>
            ) : null}
          </div>

          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {allowExportCsv ? (
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              Export CSV
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleResetTablePrefs}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
          >
            Reset Table Prefs
          </button>

          <button
            type="button"
            onClick={loadItems}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-3 text-xs text-zinc-500">
        Showing {pagedItems.length} of {filtered.length} filtered rows ({items.length} total)
      </div>

      <DataTable
        key={dataTableRenderKey}
        data={pagedItems}
        loading={loading}
        emptyText={emptyText}
        columns={columns}
        sortable={sortable}
        sortStorageKey={sortStorageKey}
        rowKey={(row, index) => {
          const resolved = getRowId(row);
          return typeof resolved === "string" || typeof resolved === "number" ? resolved : index;
        }}
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-zinc-500">
          Showing {(activePage - 1) * pageSize + (pagedItems.length === 0 ? 0 : 1)}-
          {(activePage - 1) * pageSize + pagedItems.length} of {filtered.length} rows
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activePage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {allowCreate && openCreate ? (
        <Modal title={`Add ${title}`} onClose={() => setOpenCreate(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            {fields.map((field) => (
              <label key={field.key} className="block text-sm text-zinc-600">
                <span className="mb-1 block">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.key] ?? ""}
                    onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                    className="min-h-[90px] w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                  />
                ) : (
                  <input
                    value={form[field.key] ?? ""}
                    onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
          </form>
        </Modal>
      ) : null}

      {allowEdit && openEdit && editForm ? (
        <Modal title={`Edit ${title}`} onClose={() => setOpenEdit(false)}>
          <form onSubmit={handleEdit} className="space-y-4">
            {fields.map((field) => (
              <label key={field.key} className="block text-sm text-zinc-600">
                <span className="mb-1 block">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    value={asInputValue(editForm[field.key])}
                    onChange={(event) =>
                      setEditForm((prev) => (prev ? { ...prev, [field.key]: event.target.value } : prev))
                    }
                    className="min-h-[90px] w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                  />
                ) : (
                  <input
                    value={asInputValue(editForm[field.key])}
                    onChange={(event) =>
                      setEditForm((prev) => (prev ? { ...prev, [field.key]: event.target.value } : prev))
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Update
            </button>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
