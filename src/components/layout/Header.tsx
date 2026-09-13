"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { menuItems, headerCta } from "@/data/menuItems";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { NavDropdown } from "@/components/ui/NavDropdown";

// ─── Componente Header ─────────────────────────────────────────────────────────

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

  const isActive = (href: string) => {
    // Si es un ancla pura (ej: "#section"), no lo marcamos activo globalmente
    if (href.startsWith("#")) return false;

    const base = href.split("#")[0];
    const isHashOnHome = base === "/" && href.includes("#");

    // "Inicio" solo es activo si estamos exactamente en "/" y el href es "/"
    if (href === "/") return pathname === "/";

    // Si es un enlace tipo "/#seccion", solo activarlo si estamos en esa sección (aunque Next router no expone el hash en pathname fácilmente, evitamos que se marque siempre activo)
    if (isHashOnHome) {
      // Como workaround visual, no marcamos activas las anclas de la home por defecto.
      return false;
    }

    return pathname.startsWith(base);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[999] border-b border-outline-variant/60",
          "transition-all duration-300 ease-in-out dark:border-white/10",
          !scrolled && "h-20 bg-surface-container-lowest dark:bg-surface-container-lowest",
          scrolled &&
            "h-[60px] bg-surface-container-lowest shadow-soft-semta dark:bg-surface-container-lowest",
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
            className="hidden items-center justify-center gap-0 xl:gap-1 xl:flex"
            aria-label="Principal"
          >
            {menuItems.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} isActive={isActive} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-2 xl:px-3 py-2 text-[13px] 2xl:text-label-lg transition-all",
                    isActive(item.href)
                      ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
                      : "text-on-surface/80 hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* CTA + toggle desktop */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
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

          {/* Mobile controls */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="grid size-11 place-items-center rounded-xl text-on-surface transition-colors hover:bg-surface-container"
              aria-label="Abrir menú"
            >
              <MaterialIcon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
