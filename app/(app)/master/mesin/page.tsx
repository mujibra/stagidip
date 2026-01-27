"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { apiFetch } from "@/lib/client/apiFetch";
import type { ApiListResponse, Mesin } from "@/types/api";

export default function MasterMesinPage() {
  const [data, setData] = useState<Mesin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch<ApiListResponse<Mesin>>("/api/master-mesin")
      .then((res) => setData(res.data ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Master Mesin"
        subtitle="List mesin dari database (GET /api/master-mesin)."
      />

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <DataTable
        loading={loading}
        data={data}
        columns={[
          { key: "id", label: "ID", className: "whitespace-nowrap" },
          { key: "merek", label: "Merek" },
          { key: "model", label: "Model", className: "whitespace-nowrap" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status", className: "whitespace-nowrap" },
        ]}
      />
    </div>
  );
}
