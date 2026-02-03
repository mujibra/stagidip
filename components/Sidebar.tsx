"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLayerGroup,
  faFolderPlus,
  faClipboardList,
  faIdCard,
  faCubes,
  faUsers,
  faWarehouse,
  faBoxesStacked,
  faCircleInfo,
  faPenRuler,
  faSliders,
  faArrowRight,
  faCheckSquare,
  faListCheck,
  faSquareCheck,
  faTruck,
  faBook,
  faStickyNote,
  faRocket,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = { href: string; label: string; icon?: React.ReactNode; disabled?: boolean };
type NavGroup = { section: string; items: NavItem[]; collapsible?: boolean };

// normalize urls from old React app (they were like "...")
const toHref = (url: string) => (url.startsWith("/") ? url : `/${url}`);

export const NAV_SUPER_ADMIN: NavGroup[] = [
  {
    section: "APPLICATIONS",
    items: [{ href: toHref("dashboard"), label: "DASHBOARD", icon: <FontAwesomeIcon icon={faHouse} /> }],
  },
  {
    section: "REGISTRATION",
    collapsible: true,
    items: [
      { href: toHref("registration/purchase-order"), label: "Purchase Order", icon: <FontAwesomeIcon icon={faClipboardList} /> },
      { href: toHref("registration/type"), label: "Types", icon: <FontAwesomeIcon icon={faLayerGroup} /> },
      { href: toHref("registration/model"), label: "models", icon: <FontAwesomeIcon icon={faCubes} /> },
      { href: toHref("registration/user-management"), label: "User Managements", icon: <FontAwesomeIcon icon={faUsers} /> },
      { href: toHref("registration/part-number"), label: "Detail PartNumber", icon: <FontAwesomeIcon icon={faIdCard} /> },
      { href: toHref("registration/detail-specification"), label: "Detail Specification", icon: <FontAwesomeIcon icon={faCircleInfo} /> },
      { href: toHref("registration/template-pre-staging"), label: "Detail Prestaging", icon: <FontAwesomeIcon icon={faPenRuler} /> },
      { href: toHref("registration/template-pre-loading"), label: "Detail Preloading", icon: <FontAwesomeIcon icon={faPenRuler} /> },
      { href: toHref("registration/setting-pre-staging"), label: "Setting Pre Staging", icon: <FontAwesomeIcon icon={faSliders} /> },
      { href: toHref("registration/warehouse"), label: "Warehouse", icon: <FontAwesomeIcon icon={faWarehouse} /> },
      { href: toHref("registration/batch"), label: "Batch", icon: <FontAwesomeIcon icon={faBoxesStacked} /> },
      { href: toHref("registration/customer"), label: "Customer", icon: <FontAwesomeIcon icon={faUsers} /> },
      { href: toHref("registration/status-po"), label: "Status PO", icon: <FontAwesomeIcon icon={faClipboardList} /> },
      { href: toHref("registration/style"), label: "Style", icon: <FontAwesomeIcon icon={faFolderPlus} /> },
    ],
  },
  {
    section: "SPECIFICATION",
    items: [{ href: toHref("spesification"), label: "Specification", icon: <FontAwesomeIcon icon={faArrowRight} /> }],
  },
  {
    section: "STAGING REGISTRATION",
    items: [{ href: toHref("porcaheOrder"), label: "Staging Registration", icon: <FontAwesomeIcon icon={faFolderPlus} /> }],
  },
  {
    section: "PRE STAGING",
    collapsible: true,
    items: [{ href: toHref("stagging/checklistStagging"), label: "Pre Staging Checklist", icon: <FontAwesomeIcon icon={faListCheck} /> }],
  },
  {
    section: "STAGING",
    collapsible: true,
    items: [
      { href: toHref("viewOldMachine"), label: "Staging Old Machine", disabled: true, icon: <FontAwesomeIcon icon={faSquareCheck} /> },
      { href: toHref("viewNewMachine"), label: "Staging New Machine", icon: <FontAwesomeIcon icon={faCheckSquare} /> },
      { href: toHref("stagging/inspeksiTestings"), label: "Pre Loading Inspection", icon: <FontAwesomeIcon icon={faCheckSquare} /> },
    ],
  },
  {
    section: "STATUS DELIVERY",
    items: [{ href: toHref("statusDelivery"), label: "Status Delivery", icon: <FontAwesomeIcon icon={faTruck} /> }],
  },
  {
    section: "WAREHOUSE",
    collapsible: true,
    items: [
      { href: toHref("warehouseTransfer"), label: "WAREHOUSE TRANSFER", icon: <FontAwesomeIcon icon={faArrowRight} /> },
      { href: toHref("summary/deliveryRequest"), label: "Delivery Request", icon: <FontAwesomeIcon icon={faStickyNote} /> },
    ],
  },
  {
    section: "SUMMARY",
    collapsible: true,
    items: [
      { href: toHref("summary/machine"), label: "Summary Machine", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/accessories"), label: "Summary Accessories", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/newMachine"), label: "Summary New Machine", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/oldMachine"), label: "Summary Old Machine", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/warehouseTransper"), label: "Summary Warehouse Transper", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/warehouse"), label: "Summary Warehouse", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/preStaging"), label: "Summary Pre Staging", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/durationStagingSummary"), label: "Duration Staging Summary", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/durationReportSummary"), label: "Duration Report Summary", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/developmentSummary"), label: "Development Summary", icon: <FontAwesomeIcon icon={faRocket} /> },
      { href: toHref("summary/statusDelivery"), label: "Summary Status Delivery", icon: <FontAwesomeIcon icon={faTruck} /> },
      { href: toHref("summary/ups"), label: "Summary UPS", icon: <FontAwesomeIcon icon={faBook} /> },
      { href: toHref("summary/implementationTable"), label: "Implementation Table", icon: <FontAwesomeIcon icon={faBook} /> },
    ],
  },
  {
    section: "MY DATINDO INTEGRATION",
    items: [{ href: toHref("integration/my-datindo"), label: "My Datindo Integration", icon: <FontAwesomeIcon icon={faLink} /> }],
  },
];

// pick menu (later you can swap based on roles)
const NAV: NavGroup[] = NAV_SUPER_ADMIN;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="ml-auto inline-flex h-10 w-10 items-center justify-center text-zinc-500"
    >
      ▾
    </motion.span>
  );
}

function SidebarToggle({ collapsed, onClick }: { collapsed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-9 items-center justify-center rounded-lg px-3",
        "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
        "dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
        "transition-colors",
      ].join(" ")}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? "→" : "←"}
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("stagidip.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("stagidip.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [collapsed]);

  const defaultOpen = useMemo(() => {
    const openMap: Record<string, boolean> = {};
    for (const g of NAV) {
      if (!g.collapsible) continue;
      openMap[g.section] = g.items.some((it) => isActive(pathname, it.href));
    }
    return openMap;
  }, [pathname]);

  const [open, setOpen] = useState<Record<string, boolean>>(() => defaultOpen);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 76 : 256 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="hidden shrink-0 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:block"
    >
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className={collapsed ? "hidden" : "text-lg font-semibold"}>
              <span className="bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                STAGIDIP
              </span>
            </div>

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="mt-1 text-xs text-zinc-500"
                >
                  Internal System
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SidebarToggle collapsed={collapsed} onClick={() => setCollapsed((v) => !v)} />
        </div>

        <div className="pointer-events-none relative mt-2">
          <div className="absolute -inset-3 rounded-xl bg-linier-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-xl" />
        </div>
      </div>

      {/* Nav */}
      <nav className="px-2 pb-2">
        {NAV.map((group) => {
          const isCollapsible = !!group.collapsible;
          const groupOpen = isCollapsible ? !!open[group.section] : true;

          return (
            <div key={group.section} className="mb-3">
              <button
                type="button"
                onClick={() => {
                  if (!isCollapsible) return;
                  setOpen((prev) => ({ ...prev, [group.section]: !prev[group.section] }));
                }}
                className={[
                  "flex w-full items-center rounded-md px-2 py-1",
                  "text-[12px] font-semibold uppercase tracking-wide text-zinc-500",
                  isCollapsible ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900" : "cursor-default",
                ].join(" ")}
                title={collapsed ? group.section : undefined}
                aria-expanded={isCollapsible ? groupOpen : undefined}
              >
                {collapsed ? <span className="mx-auto text-[10px] opacity-70">●</span> : <span>{group.section}</span>}
                {!collapsed && isCollapsible ? <Chevron open={groupOpen} /> : null}
              </button>

              <AnimatePresence initial={false}>
                {groupOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="mt-1 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const active = isActive(pathname, item.href);
                        const disabled = !!item.disabled;

                        const baseItemClass = [
                          "flex h-10 items-center rounded-[10px]",
                          collapsed ? "px-2 justify-center" : "px-3",
                          "text-[13px] font-medium transition-colors duration-150",
                        ].join(" ");

                        const stateClass = disabled
                          ? "opacity-50 cursor-not-allowed"
                          : active
                            ? [
                              "bg-gradient-to-r from-indigo-500/12 via-sky-500/12 to-emerald-500/12",
                              "text-zinc-900 dark:text-zinc-50",
                              "ring-1 ring-indigo-500/20 dark:ring-white/10",
                              "shadow-sm",
                            ].join(" ")
                            : [
                              "text-zinc-700 dark:text-zinc-300",
                              "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                              "hover:text-zinc-900 dark:hover:text-zinc-50",
                            ].join(" ");

                        const ItemContent = (
                          <motion.div
                            layout
                            whileHover={!disabled ? { scale: 1.01 } : undefined}
                            whileTap={!disabled ? { scale: 0.99 } : undefined}
                            transition={{ type: "spring", stiffness: 500, damping: 32 }}
                            className="relative"
                          >
                            <AnimatePresence initial={false}>
                              {active && !disabled && (
                                <motion.span
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -6 }}
                                  transition={{ duration: 0.16 }}
                                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-linier-to-b from-indigo-500 via-sky-500 to-emerald-500"
                                />
                              )}
                            </AnimatePresence>

                            <div className={[baseItemClass, stateClass].join(" ")}>
                              <span
                                className={[
                                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm",
                                  active && !disabled
                                    ? "bg-linier-to-br from-indigo-500/25 via-sky-500/25 to-emerald-500/25 text-indigo-600 dark:text-emerald-300"
                                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400",
                                ].join(" ")}
                              >
                                {item.icon ?? "•"}
                              </span>

                              <AnimatePresence initial={false}>
                                {!collapsed && (
                                  <motion.span
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -6 }}
                                    transition={{ duration: 0.14 }}
                                    className="ml-3 truncate"
                                  >
                                    {item.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>

                              <AnimatePresence initial={false}>
                                {!collapsed && active && !disabled && (
                                  <motion.span
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.14 }}
                                    className="ml-auto inline-flex items-center rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                  >
                                    Active
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );

                        if (disabled) {
                          return (
                            <div key={item.href} title={item.label} aria-disabled="true">
                              {ItemContent}
                            </div>
                          );
                        }

                        return (
                          <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}>
                            {ItemContent}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
}
