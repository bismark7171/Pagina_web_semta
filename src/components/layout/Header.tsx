"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { menuItems, headerCta } from "@/data/menuItems";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import ThemeToggle from "@/components/layout/ThemeToggle";

// ─── Dropdown con hover ───────────────────────────────────────────────────────

function DropdownItem({
  item,
  isActive,
}: {
  item: (typeof menuItems)[number];
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

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2",
          "text-label-lg text-on-surface/80 transition-colors",
          "hover:bg-primary/5 hover:text-on-surface",
          isActive(item.href) && "text-primary",
        )}
        aria-expanded={open}
      >
        {item.label}
        <MaterialIcon
          name="expand_more"
          className={cn("text-[1em] transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-1.5 w-56 -translate-x-1/2"
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            {/* Triángulo conector visual */}
            <div className="mx-auto mb-1 w-fit">
              <div className="mx-auto h-2 w-4 overflow-hidden">
                <div className="mx-auto h-2.5 w-2.5 rotate-45 bg-surface-container-lowest border-l border-t border-outline-variant/60" />
              </div>
            </div>
            <ul className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-1.5 shadow-[0_16px_32px_rgba(13,99,27,0.12)]">
              {item.children!.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-label-lg text-on-surface/80 transition-colors hover:bg-primary/8 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <MaterialIcon name="chevron_right" className="text-[0.9em] text-primary/60" />
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header principal ─────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseDe = (href: string) => href.split("#")[0];
  const isActive = (href: string) => {
    const base = baseDe(href);
    if (href === "/" || base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-outline-variant/60 backdrop-blur-md",
          "transition-all duration-300 ease-in-out dark:border-white/10",
          !scrolled && "h-20 bg-surface-container-lowest/85 dark:bg-[#131a13]/85",
          scrolled &&
            "h-[60px] bg-surface-container-lowest/95 shadow-soft-semta dark:bg-[#131a13]/95",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-container-semta items-center justify-between gap-4 px-gutter-desktop">
          {/* Logo */}
          <div
            className={cn(
              "shrink-0 transition-transform duration-300 origin-left",
              scrolled ? "scale-90" : "scale-100",
            )}
          >
            <Logo />
          </div>

          {/* Nav desktop */}
          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Principal"
          >
            {menuItems.map((item) =>
              item.children ? (
                <DropdownItem key={item.label} item={item} isActive={isActive} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-label-lg text-on-surface/80 transition-colors hover:bg-primary/5 hover:text-primary",
                    isActive(item.href) && "font-semibold text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* CTA + toggle desktop */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button
              href={headerCta.href}
              variant="outline"
              size="sm"
              icono="mail"
              className="whitespace-nowrap"
            >
              {headerCta.label}
            </Button>
          </div>

          {/* Burger mobile */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="grid size-11 place-items-center rounded-xl text-on-surface transition-colors hover:bg-surface-container lg:hidden"
            aria-label="Abrir menú"
          >
            <MaterialIcon name="menu" />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
