"use client";

import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

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
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  datas?: T;
};

const DEFAULT_MESSAGE_TIMEOUT = 3000;

function buildPayload(fields: CrudField[], values: Record<string, string>) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = values[field.key] ?? "";
    return acc;
  }, {});
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
}: CrudPageProps) {
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editForm, setEditForm] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    setForm(buildPayload(fields, {}));
  }, [fields]);

  const notify = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), DEFAULT_MESSAGE_TIMEOUT);
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(listEndpoint ?? endpoint);
      const result: ApiResponse<Record<string, any>[]> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to load data.");
        setItems([]);
        return;
      }
      const data = result.data ?? result.datas ?? [];
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      notify("error", "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.trim().toLowerCase();
    return items.filter((row) =>
      fields.some((field) => String(row[field.key] ?? "").toLowerCase().includes(lower))
    );
  }, [items, query, fields]);

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
      const result: ApiResponse<Record<string, any>> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to create data.");
        return;
      }
      notify("success", result.message ?? "Data created successfully.");
      setForm(buildPayload(fields, {}));
      setOpenCreate(false);
      loadItems();
    } catch (error) {
      notify("error", "Failed to create data.");
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm) return;
    const payload = buildPayload(fields, editForm);
    try {
      const requestBody = buildBody(payload, updateContentType);
      const response = await fetch(`${updateEndpoint ?? endpoint}/${editForm.id}`, {
        method: "PUT",
        ...requestBody,
      });
      const result: ApiResponse<Record<string, any>> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to update data.");
        return;
      }
      notify("success", result.message ?? "Data updated successfully.");
      setOpenEdit(false);
      setEditForm(null);
      loadItems();
    } catch (error) {
      notify("error", "Failed to update data.");
    }
  };

  const handleDelete = async (row: Record<string, any>) => {
    const confirmed = window.confirm(`Sure to delete data ${row[fields[0]?.key] ?? ""}?`);
    if (!confirmed) return;
    try {
      const response = await fetch(`${deleteEndpoint ?? endpoint}/${row.id}`, { method: "DELETE" });
      const result: ApiResponse<Record<string, any>> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to delete data.");
        return;
      }
      notify("success", result.message ?? "Data deleted successfully.");
      loadItems();
    } catch (error) {
      notify("error", "Failed to delete data.");
    }
  };

  const columns = useMemo(() => {
    const baseColumns = [
      {
        key: "no",
        label: "No",
        render: (_row: Record<string, any>, index: number) => <span>{index + 1}</span>,
        className: "w-16 text-center",
      },
      ...fields.map((field) => ({
        key: field.key,
        label: field.label,
      })),
    ];

    if (allowEdit || allowDelete) {
      baseColumns.push({
        key: "actions",
        label: "Actions",
        render: (row: Record<string, any>) => (
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
  }, [allowDelete, allowEdit, fields]);

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

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
        />
        <button
          type="button"
          onClick={loadItems}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>

      <DataTable data={filtered} loading={loading} emptyText={emptyText} columns={columns} />

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
                    value={editForm[field.key] ?? ""}
                    onChange={(event) =>
                      setEditForm((prev) => (prev ? { ...prev, [field.key]: event.target.value } : prev))
                    }
                    className="min-h-[90px] w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                  />
                ) : (
                  <input
                    value={editForm[field.key] ?? ""}
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
