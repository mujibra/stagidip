import Link from "next/link";

type NavItem = { href: string; label: string };

const NAV: { section: string; items: NavItem[] }[] = [
  { section: "General", items: [{ href: "/dashboard", label: "Dashboard" }] },
  {
    section: "Master",
    items: [
      { href: "/master/mesin", label: "Mesin" },
      { href: "/master/part", label: "Part" },
      { href: "/master/customer", label: "Customer" },
      { href: "/master/gudang", label: "Gudang" },
      { href: "/master/divisi", label: "Divisi" },
    ],
  },
  {
    section: "Transaksi",
    items: [
      { href: "/transaksi/purchase-order", label: "Purchase Order" },
      { href: "/transaksi/inspeksi", label: "Inspeksi" },
      { href: "/transaksi/status-delivery", label: "Status Delivery" },
      { href: "/transaksi/warehouse-transfer", label: "Warehouse Transfer" },
    ],
  },
  { section: "Settings", items: [{ href: "/settings/prestaging", label: "Pre-Staging" }] },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:block">
      <div className="px-4 py-4">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          STAGIDIP
        </div>
        <div className="mt-1 text-xs text-zinc-500">Internal System</div>
      </div>
      <nav className="px-2 pb-4">
        {NAV.map((group) => (
          <div key={group.section} className="mb-5">
            <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              {group.section}
            </div>
            <div className="mt-1 space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
