"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { menuItems, headerCta } from "@/data/menuItems";
import { MobileDrawer } from "@/components/layout/MobileDrawer";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const baseDe = (href: string) => href.split("#")[0];

  const isActive = (href: string) => {
    const base = baseDe(href);
    if (href === "/" || base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-outline-variant/60 bg-surface-container-lowest/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-container-semta items-center justify-between px-gutter-desktop">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {menuItems.map((item) =>
              item.children ? (
                <Menu key={item.label} as="div" className="relative">
                  <MenuButton
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-label-lg text-on-surface/80 transition-colors hover:bg-primary/5 hover:text-on-surface",
                      isActive(item.href) && "text-primary",
                    )}
                  >
                    {item.label}
                    <MaterialIcon name="expand_more" className="text-[1em]" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-outline-variant bg-surface-container-lowest p-2 shadow-lg transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    {item.children.map((child) => (
                      <MenuItem key={child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-label-lg text-on-surface/80 transition-colors hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-label-lg text-on-surface/80 transition-colors hover:bg-primary/5 hover:text-primary",
                    isActive(item.href) && "font-semibold text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={headerCta.href}
              variant="outline"
              size="sm"
              icono="verified_user"
            >
              {headerCta.label}
            </Button>
          </div>

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