import Link from "next/link";

import PageHeader from "@/components/PageHeader";

const summarySections = [
  { href: "/summary/machine", label: "Machine Summary", description: "Track machine inventory and summary counts." },
  { href: "/summary/new-machine", label: "New Machine", description: "Review new-machine specific summary metrics." },
  { href: "/summary/old-machine", label: "Old Machine", description: "Review old-machine summary metrics and trends." },
  { href: "/summary/warehouse-transfer", label: "Warehouse Transfer", description: "Inspect transfer summaries across warehouses." },
  { href: "/summary/status-delivery", label: "Status Delivery", description: "Monitor delivery status summaries and throughput." },
  { href: "/summary/accessories", label: "Accessories", description: "Validate accessories summary by PO and batch." },
  { href: "/summary/ups", label: "UPS", description: "Track UPS summary figures and supporting records." },
  { href: "/summary/development", label: "Development", description: "Review development summary outputs for active work." },
  { href: "/summary/implementation", label: "Implementation", description: "Check implementation summary and operational progress." },
];

export default function Page() {
  return (
    <div>
      <PageHeader
        title="Summary"
        subtitle="Batch 3 module hub: execute summary parity checks by section and capture evidence per report view."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Summary Sections" value={String(summarySections.length)} />
        <StatCard label="Batch" value="3" />
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Execution Focus</div>
          <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">Reporting parity, data coverage checks, and visual-state consistency.</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {summarySections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
          >
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{section.label}</div>
            <div className="mt-2 text-xs text-zinc-500">{section.description}</div>
            <div className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400">Open section →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</div>
    </div>
  );
}
