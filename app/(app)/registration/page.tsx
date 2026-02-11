import Link from "next/link";

import PageHeader from "@/components/PageHeader";

const registrationSections = [
  { href: "/registration/brand", label: "Brand", description: "Manage machine brand master data." },
  { href: "/registration/type", label: "Type", description: "Maintain type catalog and dependencies." },
  { href: "/registration/model", label: "Model", description: "Configure model mappings for machine types." },
  { href: "/registration/customer", label: "Customer", description: "Maintain customer registry used by operational modules." },
  { href: "/registration/warehouse", label: "Warehouse", description: "Manage warehouse references for transfer and staging flows." },
  { href: "/registration/purchase-order", label: "Registration Purchase Order", description: "Registration-side PO controls and helper data." },
  { href: "/registration/part-number", label: "Part Number", description: "Keep part number master parity with legacy requirements." },
  { href: "/registration/machine-specification", label: "Machine Specification", description: "Define and verify machine specification rules." },
  { href: "/registration/status-po", label: "Status PO", description: "Maintain status references used by PO and reports." },
  { href: "/registration/user-management", label: "User Management", description: "Manage registration access and role assignments." },
];

export default function Page() {
  return (
    <div>
      <PageHeader
        title="Registration"
        subtitle="Batch 2 module hub: use this page to execute registration parity checks across all registration masters."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Module Sections</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{registrationSections.length}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Batch</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">2</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs text-zinc-500">Execution Focus</div>
          <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">Scope lock, baseline evidence, and CRUD parity checks.</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {registrationSections.map((section) => (
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
