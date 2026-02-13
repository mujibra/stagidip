"use client";

import { useEffect, useMemo, useState } from "react";

import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { useDebouncedValue } from "@/lib/client/useDebouncedValue";

type UserRow = {
  id: string | number;
  name?: string | null;
  email?: string | null;
  roles?: string | null;
  status?: number | null;
  customer?: { customer_desc?: string | null } | null;
  gudang?: { gudang?: string | null } | null;
};

type UserResponse = {
  success: boolean;
  message?: string;
  data?: UserRow[];
};

const ROLE_ALL = "ALL";
const STATUS_ALL = "ALL";

function statusLabel(status: number | null | undefined) {
  if (status === 1) return "Active";
  if (status === 0) return "Inactive";
  return "Unknown";
}

function statusClass(status: number | null | undefined) {
  if (status === 1) return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300";
  if (status === 0) return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300";
}

function roleClass(role: string | null | undefined) {
  const normalized = (role ?? "").toUpperCase();
  if (normalized.includes("SUPER")) return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300";
  if (normalized.includes("ADMIN")) return "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300";
  if (normalized.includes("SUPERVISOR")) return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300";
  if (normalized.includes("OPERATOR")) return "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300";
  if (normalized.includes("GUEST")) return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300";
  return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
}

export default function UserManagementPage() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(ROLE_ALL);
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_ALL);

  const debouncedQuery = useDebouncedValue(query, 250);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/master-user", { cache: "no-store" });
        const result: UserResponse = await response.json();
        if (cancelled) return;

        if (!response.ok || !result.success) {
          setRows([]);
          setError(result.message ?? "Failed to load users.");
          return;
        }

        setRows(Array.isArray(result.data) ? result.data : []);
      } catch {
        if (cancelled) return;
        setRows([]);
        setError("Failed to load users.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    for (const row of rows) {
      const role = (row.roles ?? "").trim();
      if (role) roles.add(role);
    }
    return Array.from(roles).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const keyword = debouncedQuery.trim().toLowerCase();
    return rows.filter((row) => {
      if (roleFilter !== ROLE_ALL && (row.roles ?? "") !== roleFilter) return false;

      if (statusFilter !== STATUS_ALL) {
        const mapped = statusLabel(row.status).toUpperCase();
        if (mapped !== statusFilter) return false;
      }

      if (!keyword) return true;

      const haystack = [
        row.name,
        row.email,
        row.roles,
        row.customer?.customer_desc,
        row.gudang?.gudang,
      ]
        .map((value) => String(value ?? "").toLowerCase())
        .join(" ");

      return haystack.includes(keyword);
    });
  }, [debouncedQuery, roleFilter, rows, statusFilter]);

  const summary = useMemo(() => {
    const active = rows.filter((row) => row.status === 1).length;
    return {
      total: rows.length,
      active,
      inactive: rows.length - active,
    };
  }, [rows]);

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Batch E improvement: role/status visibility and filterable user listing for registration parity checks."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Total Users" value={String(summary.total)} />
        <SummaryCard label="Active" value={String(summary.active)} />
        <SummaryCard label="Inactive/Unknown" value={String(summary.inactive)} />
      </div>

      <div className="mb-4 grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-4">
        <label className="space-y-1 text-xs text-zinc-500 lg:col-span-2">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, role, customer, warehouse"
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </label>

        <label className="space-y-1 text-xs text-zinc-500">
          Role
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value={ROLE_ALL}>All roles</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-xs text-zinc-500">
          Status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value={STATUS_ALL}>All status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      <DataTable<UserRow>
        data={filteredRows}
        loading={loading}
        emptyText="No user records found for current filters."
        sortable
        sortStorageKey="registration:user-management:sort"
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          {
            key: "roles",
            label: "Role",
            sortable: true,
            render: (row) => (
              <span className={["inline-flex rounded-full px-2 py-1 text-xs font-semibold", roleClass(row.roles)].join(" ")}>
                {row.roles ?? "-"}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (row) => (
              <span className={["inline-flex rounded-full px-2 py-1 text-xs font-semibold", statusClass(row.status)].join(" ")}>
                {statusLabel(row.status)}
              </span>
            ),
            sortValue: (row) => statusLabel(row.status),
          },
          {
            key: "customer",
            label: "Customer",
            sortable: true,
            render: (row) => row.customer?.customer_desc ?? "-",
            sortValue: (row) => row.customer?.customer_desc ?? "",
          },
          {
            key: "gudang",
            label: "Warehouse",
            sortable: true,
            render: (row) => row.gudang?.gudang ?? "-",
            sortValue: (row) => row.gudang?.gudang ?? "",
          },
        ]}
      />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</div>
    </div>
  );
}
