"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { menuItems } from "@/data/menuItems";

type MenuItem = (typeof menuItems)[number];

export function NavDropdown({
  item,
  isActive,
}: {
  item: MenuItem;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const leave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 80);
  };

  const isCurrent = isActive(item.href);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={cn(
          "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 xl:px-3 py-2",
          "text-[13px] 2xl:text-label-lg transition-all",
          isCurrent
            ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
            : "text-on-surface/80 hover:bg-primary/5 hover:text-primary",
        )}
        aria-expanded={open}
      >
        {item.label}
        <MaterialIcon
          name="expand_more"
          className={cn("text-[1.1em] transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1.5 w-[260px]"
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            {/* Triángulo conector visual */}
            <div className="mb-1 ml-6 w-fit">
              <div className="mx-auto h-2 w-4 overflow-hidden">
                <div className="mx-auto h-2.5 w-2.5 rotate-45 border-l border-t border-outline-variant/60 bg-surface-container-lowest" />
              </div>
            </div>
            <ul className="flex flex-col gap-1 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-2 shadow-[0_16px_32px_rgba(13,99,27,0.12)] dark:border-white/10 dark:bg-surface-container dark:shadow-none">
              {item.children!.map((child) => {
                const isChildActive = isActive(child.href);
                return (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className={cn(
                        "block rounded-xl px-4 py-2.5 text-label-lg transition-colors",
                        isChildActive
                          ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
                          : "text-on-surface/80 hover:bg-primary hover:text-white hover:shadow-sm dark:text-on-surface/90 dark:hover:bg-primary dark:hover:text-white",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
