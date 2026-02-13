"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
const VALID_STATUS = [STATUS_ALL, "ACTIVE", "INACTIVE", "UNKNOWN"] as const;

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

function resolveStatusFilter(value: string | null) {
  const upper = (value ?? "").toUpperCase();
  return VALID_STATUS.includes(upper as (typeof VALID_STATUS)[number]) ? upper : STATUS_ALL;
}

function escapeCsvValue(value: unknown) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildCanonicalQueryString(params: URLSearchParams, next: { q: string; role: string; status: string }) {
  const nextParams = new URLSearchParams(params.toString());

  if (next.q) nextParams.set("q", next.q);
  else nextParams.delete("q");

  if (next.role !== ROLE_ALL) nextParams.set("role", next.role);
  else nextParams.delete("role");

  if (next.status !== STATUS_ALL) nextParams.set("status", next.status);
  else nextParams.delete("status");

  return nextParams.toString();
}

export default function UserManagementPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [roleFilter, setRoleFilter] = useState<string>(searchParams.get("role") ?? ROLE_ALL);
  const [statusFilter, setStatusFilter] = useState<string>(resolveStatusFilter(searchParams.get("status")));
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const debouncedQuery = useDebouncedValue(query, 250);

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    for (const row of rows) {
      const role = (row.roles ?? "").trim();
      if (role) roles.add(role);
    }
    return Array.from(roles).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const getSafeRole = useCallback((candidateRole: string) => {
    if (candidateRole === ROLE_ALL) return ROLE_ALL;
    if (loading) return candidateRole;
    return roleOptions.includes(candidateRole) ? candidateRole : ROLE_ALL;
  }, [loading, roleOptions]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/master-user", { cache: "no-store" });
      const result: UserResponse = await response.json();

      if (!response.ok || !result.success) {
        setRows([]);
        setError(result.message ?? "Failed to load users.");
        return;
      }

      setRows(Array.isArray(result.data) ? result.data : []);
    } catch {
      setRows([]);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const canonicalQuery = buildCanonicalQueryString(params, {
      q: (searchParams.get("q") ?? "").trim(),
      role: getSafeRole(searchParams.get("role") ?? ROLE_ALL),
      status: resolveStatusFilter(searchParams.get("status")),
    });

    if (canonicalQuery === searchParams.toString()) return;
    router.replace(canonicalQuery ? `${pathname}?${canonicalQuery}` : pathname);
  }, [getSafeRole, pathname, router, searchParams]);

  useEffect(() => {
    const nextQuery = (searchParams.get("q") ?? "").trim();
    const nextRole = getSafeRole(searchParams.get("role") ?? ROLE_ALL);
    const nextStatus = resolveStatusFilter(searchParams.get("status"));

    setQuery(nextQuery);
    setRoleFilter(nextRole);
    setStatusFilter(nextStatus);
  }, [getSafeRole, searchParams]);

  const updateUrlState = useCallback((next: { q?: string; role?: string; status?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    const nextQuery = (next.q ?? query).trim();
    const nextRole = getSafeRole(next.role ?? roleFilter);
    const nextStatus = resolveStatusFilter(next.status ?? statusFilter);

    const qs = buildCanonicalQueryString(params, {
      q: nextQuery,
      role: nextRole,
      status: nextStatus,
    });

    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [getSafeRole, pathname, query, roleFilter, router, searchParams, statusFilter]);

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

  const copyCurrentViewLink = async () => {
    const currentUrl = `${window.location.origin}${pathname}${window.location.search}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setActionMessage({ type: "success", text: "Filtered view link copied." });
    } catch {
      setActionMessage({ type: "error", text: "Failed to copy view link." });
    }
  };

  const exportFilteredCsv = () => {
    const headers = ["Name", "Email", "Role", "Status", "Customer", "Warehouse"];
    const lines = [headers.join(",")];

    for (const row of filteredRows) {
      lines.push(
        [
          escapeCsvValue(row.name),
          escapeCsvValue(row.email),
          escapeCsvValue(row.roles),
          escapeCsvValue(statusLabel(row.status)),
          escapeCsvValue(row.customer?.customer_desc ?? ""),
          escapeCsvValue(row.gudang?.gudang ?? ""),
        ].join(",")
      );
    }

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registration-user-management-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setActionMessage({ type: "success", text: "Filtered CSV exported." });
  };

  useEffect(() => {
    if (!actionMessage) return;
    const timer = window.setTimeout(() => setActionMessage(null), 2200);
    return () => window.clearTimeout(timer);
  }, [actionMessage]);

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
            ref={searchInputRef}
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQuery(nextQuery);
              updateUrlState({ q: nextQuery });
            }}
            placeholder="Search name, email, role, customer, warehouse"
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          />
          <div className="text-[11px] text-zinc-400">Tip: press / to focus search.</div>
        </label>

        <label className="space-y-1 text-xs text-zinc-500">
          Role
          <select
            value={roleFilter}
            onChange={(event) => {
              const nextRole = event.target.value;
              setRoleFilter(nextRole);
              updateUrlState({ role: nextRole });
            }}
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
            onChange={(event) => {
              const nextStatus = event.target.value;
              setStatusFilter(nextStatus);
              updateUrlState({ status: nextStatus });
            }}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            <option value={STATUS_ALL}>All status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </label>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {filteredRows.length} / {rows.length} users
        </span>
        {debouncedQuery.trim() ? (
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
            q: {debouncedQuery.trim()}
          </span>
        ) : null}
        {roleFilter !== ROLE_ALL ? (
          <span className="rounded-full bg-purple-50 px-2 py-1 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
            role: {roleFilter}
          </span>
        ) : null}
        {statusFilter !== STATUS_ALL ? (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
            status: {statusFilter}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setRoleFilter(ROLE_ALL);
            setStatusFilter(STATUS_ALL);
            updateUrlState({ q: "", role: ROLE_ALL, status: STATUS_ALL });
          }}
          className="rounded-md border border-zinc-300 px-2 py-1 font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Clear filters
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyCurrentViewLink}
          className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Copy view link
        </button>
        <button
          type="button"
          onClick={exportFilteredCsv}
          className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Export filtered CSV
        </button>
        <button
          type="button"
          onClick={() => void loadUsers()}
          className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Refresh data
        </button>
      </div>

      {actionMessage ? (
        <div className={[
          "mb-3 rounded-md px-3 py-2 text-xs font-medium",
          actionMessage.type === "success"
            ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300"
            : "border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300",
        ].join(" ")}>
          {actionMessage.text}
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
          <div className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void loadUsers()}
              className="rounded-md border border-rose-300 px-2 py-1 text-xs font-medium hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/40"
            >
              Retry
            </button>
          </div>
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
