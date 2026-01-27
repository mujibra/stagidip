import PageHeader from "@/components/PageHeader";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Quick links to master data and transaksi modules."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Master Mesin" href="/master/mesin" desc="List, create, and maintain machines.">📦</Card>
        <Card title="Master Customer" href="/master/customer" desc="Customers and marketing PIC.">👥</Card>
        <Card title="Purchase Order" href="/transaksi/purchase-order" desc="PO flow and status tracking.">🧾</Card>
        <Card title="Warehouse Transfer" href="/transaksi/warehouse-transfer" desc="Transfer stock between warehouses.">🚚</Card>
        <Card title="Pre-Staging" href="/settings/prestaging" desc="Rules and templates for prestaging.">⚙️</Card>
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  desc,
  icon,
  children,
}: {
  title: string;
  href: string;
  desc: string;
  icon?: string;
  children?: React.ReactNode;
}) {
  const emoji = icon ?? (typeof children === "string" ? children : "");
  return (
    <a
      href={href}
      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{emoji || children}</div>
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {desc}
          </div>
        </div>
      </div>
    </a>
  );
}
