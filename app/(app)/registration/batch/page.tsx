"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

type BatchRow = {
  id: number;
  name: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const DEFAULT_FORM = { name: "" };

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

export default function Page() {
  const router = useRouter();
  const [batches, setBatches] = useState<BatchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [query, setQuery] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [editForm, setEditForm] = useState<BatchRow | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return batches;
    return batches.filter((row) => row.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [batches, query]);

  const notify = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 3000);
  };

  const loadBatches = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bacth");
      const result: ApiResponse<BatchRow[]> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to load batch data.");
        setBatches([]);
        return;
      }
      setBatches(result.data ?? []);
    } catch (error) {
      notify("error", "Failed to load batch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) {
      notify("error", "Batch name is required.");
      return;
    }
    try {
      const response = await fetch("/api/bacth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim() }),
      });
      const result: ApiResponse<BatchRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to add batch.");
        return;
      }
      notify("success", result.message ?? "Batch added.");
      setForm(DEFAULT_FORM);
      setOpenCreate(false);
      loadBatches();
    } catch (error) {
      notify("error", "Failed to add batch.");
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm) return;
    if (!editForm.name.trim()) {
      notify("error", "Batch name is required.");
      return;
    }
    try {
      const response = await fetch(`/api/bacth/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editForm.name.trim() }),
      });
      const result: ApiResponse<BatchRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to update batch.");
        return;
      }
      notify("success", result.message ?? "Batch updated.");
      setOpenEdit(false);
      setEditForm(null);
      loadBatches();
    } catch (error) {
      notify("error", "Failed to update batch.");
    }
  };

  const handleDelete = async (row: BatchRow) => {
    const confirmed = window.confirm(`Sure to delete data ${row.name}?`);
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/bacth/${row.id}`, { method: "DELETE" });
      const result: ApiResponse<BatchRow> = await response.json();
      if (!response.ok || !result.success) {
        notify("error", result.message ?? "Failed to delete batch.");
        return;
      }
      notify("success", result.message ?? "Batch deleted.");
      loadBatches();
    } catch (error) {
      notify("error", "Failed to delete batch.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Registration - Batch"
        subtitle="Batch List"
        right={
          <button
            type="button"
            onClick={() => setOpenCreate(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Add New Batch
          </button>
        }
      />

      {message ? (
        <div
          className={[
            "mb-4 rounded-lg px-4 py-2 text-sm",
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {message.text}
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search batch..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
        />
        <button
          type="button"
          onClick={() => router.refresh()}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>

      <DataTable
        data={filtered}
        loading={loading}
        emptyText="No data available."
        columns={[
          {
            key: "no",
            label: "No",
            render: (_row, index) => <span>{index + 1}</span>,
            className: "w-16 text-center",
          },
          { key: "name", label: "Batch Name", className: "w-2/3" },
          {
            key: "actions",
            label: "Action",
            className: "text-center",
            render: (row: BatchRow) => (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditForm(row);
                    setOpenEdit(true);
                  }}
                  className="rounded-md border border-blue-200 px-3 py-1 text-xs text-blue-700 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(row)}
                  className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-700 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      {openCreate ? (
        <Modal title="Add New Batch" onClose={() => setOpenCreate(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-700">Batch Name</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ name: event.target.value })}
                className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                placeholder="Batch name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenCreate(false)}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {openEdit && editForm ? (
        <Modal title="Edit Batch" onClose={() => setOpenEdit(false)}>
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-700">Batch Name</label>
              <input
                value={editForm.name}
                onChange={(event) =>
                  setEditForm((prev) => (prev ? { ...prev, name: event.target.value } : prev))
                }
                className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                placeholder="Batch name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
