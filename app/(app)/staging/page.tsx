import Link from "next/link";

import PageHeader from "@/components/PageHeader";

const stagingSections = [
  {
    href: "/staging/new-machine",
    label: "Staging New Machine",
    description: "Validate new-machine staging flow and checklist completion behavior.",
  },
  {
    href: "/staging/old-machine",
    label: "Staging Old Machine",
    description: "Validate old-machine staging flow and edge-case handling.",
  },
  {
    href: "/staging/inspection-testing",
    label: "Inspection Testing",
    description: "Run inspection/testing parity checks for approval-heavy workflow states.",
  },
  {
    href: "/pre-staging",
    label: "Pre-Staging",
    description: "Jump to pre-staging module for checklist and readiness parity checks.",
  },
];

export default function Page() {
  return (
    <div>
      <PageHeader
        title="Staging"
        subtitle="Batch 3 staging hub: execute new/old machine and inspection parity checks from one entry point."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Staging Sections" value={String(stagingSections.length)} />
        <StatCard label="Batch" value="3" />
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Execution Focus</div>
          <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">Approval-flow scenarios, status transitions, and checklist parity.</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {stagingSections.map((section) => (
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
