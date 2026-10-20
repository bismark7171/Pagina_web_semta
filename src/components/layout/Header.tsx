"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/layout/ThemeProvider";
import { menuItems } from "@/data/menuItems";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMatch = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Manejo de scroll suave para enlaces con ancla (/#...)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  // Escuchar si se cargó la página con hash o cambio de hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  }, [pathname]);

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-outline-variant bg-surface-container-lowest/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-container-semta items-center justify-between px-gutter-desktop py-3">
        {/* Logo */}
        <Logo className="h-10 w-auto sm:h-12" />

        {/* Menú Desktop con opciones múltiples */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          ref={dropdownRef}
          aria-label="Principal"
        >
          {menuItems.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isCurrentActive =
              isMatch(item.href) || (item.children && item.children.some((c) => isMatch(c.href)));
            const isDropdownOpen = activeDropdown === item.label;

            if (hasChildren) {
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-label-md font-semibold rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isCurrentActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-on-surface hover:text-primary hover:bg-surface-container",
                    )}
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{item.label}</span>
                    <MaterialIcon
                      name="keyboard_arrow_down"
                      className={cn(
                        "text-[18px] transition-transform duration-200",
                        isDropdownOpen && "rotate-180",
                      )}
                    />
                  </Link>

                  {/* Menú desplegable con opciones múltiples */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 pt-1">
                      <div className="w-64 rounded-2xl border border-outline-variant bg-surface-container-lowest p-2 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                        {item.children!.map((sub) => {
                          const isSubActive = isMatch(sub.href);
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className={cn(
                                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-body-sm font-medium transition-colors",
                                isSubActive
                                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                                  : "text-on-surface hover:bg-surface-container hover:text-primary",
                              )}
                            >
                              <span>{sub.label}</span>
                              {isSubActive && (
                                <MaterialIcon
                                  name="chevron_right"
                                  className="text-[18px] opacity-80"
                                />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-3 py-2 text-label-md font-semibold rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isCurrentActive
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-on-surface hover:text-primary hover:bg-surface-container",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Alternar tema claro/oscuro"
          >
            <MaterialIcon name={theme === "light" ? "dark_mode" : "light_mode"} />
          </button>

          <Button
            href="/contacto"
            variant="primary"
            size="sm"
            icono="mail"
            className="hidden sm:inline-flex"
          >
            Contáctanos
          </Button>

          {/* Hamburger (Mobile) */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface lg:hidden hover:bg-surface-container transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <MaterialIcon name={mobileMenuOpen ? "close" : "menu"} className="text-[26px]" />
          </button>
        </div>
      </div>

      {/* Menú Mobile con opciones múltiples */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-xl lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isCurrentActive =
                isMatch(item.href) || (item.children && item.children.some((c) => isMatch(c.href)));
              const isOpen = mobileExpanded[item.label];

              if (hasChildren) {
                return (
                  <div key={item.label} className="flex flex-col">
                    <div
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl transition-colors",
                        isCurrentActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-on-surface hover:bg-surface-container",
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="flex-1 px-4 py-3 text-label-md font-semibold"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMobileSubmenu(item.label);
                        }}
                        className="p-3 text-on-surface-variant hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg mr-1"
                        aria-label={`Ver opciones de ${item.label}`}
                        aria-expanded={isOpen}
                      >
                        <MaterialIcon
                          name="keyboard_arrow_down"
                          className={cn(
                            "text-xl transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    {isOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-primary/30 pl-3 py-1">
                        {item.children!.map((sub) => {
                          const isSubActive = isMatch(sub.href);
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub.href)}
                              className={cn(
                                "rounded-lg px-3 py-2 text-body-sm font-medium transition-colors",
                                isSubActive
                                  ? "bg-primary/10 text-primary font-bold"
                                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                              )}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-label-md font-semibold transition-colors",
                    isCurrentActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-on-surface hover:bg-surface-container",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-outline-variant/50">
              <Button
                href="/contacto"
                variant="primary"
                icono="mail"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contáctanos
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
