"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { menuItems, headerCta } from "@/data/menuItems";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    const base = href.split("#")[0];
    const isHashOnHome = base === "/" && href.includes("#");
    if (href === "/") return pathname === "/";
    if (isHashOnHome) return false;
    return pathname.startsWith(base);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50 xl:hidden" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-y-0 right-0 flex max-w-sm w-full">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="flex h-full w-full flex-col overflow-y-auto bg-surface-container-lowest shadow-xl">
                <div className="flex items-center justify-between px-6 py-4">
                  <DialogTitle as="div">
                    <Logo />
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid size-11 place-items-center rounded-xl text-on-surface transition-colors hover:bg-surface-container"
                    aria-label="Cerrar menú"
                  >
                    <MaterialIcon name="close" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Principal móvil">
                  {menuItems.map((item) => {
                    const isParentActive = isActive(item.href);

                    return (
                      <div key={item.label}>
                        {item.children ? (
                          <Disclosure>
                            {({ open: disclosureOpen }) => (
                              <>
                                <DisclosureButton
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-label-lg transition-all",
                                    isParentActive
                                      ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
                                      : "font-semibold text-on-surface/90 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary dark:hover:text-white",
                                  )}
                                >
                                  {item.label}
                                  <MaterialIcon
                                    name="expand_more"
                                    className={cn(
                                      "text-[1.2em] transition-transform duration-200",
                                      disclosureOpen && "rotate-180",
                                    )}
                                  />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-1 flex flex-col gap-1 px-2">
                                  {item.children?.map((child) => {
                                    const isChildActive = isActive(child.href);
                                    return (
                                      <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={onClose}
                                        className={cn(
                                          "block rounded-xl px-4 py-2.5 text-label-lg transition-all",
                                          isChildActive
                                            ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
                                            : "text-on-surface/80 hover:bg-primary hover:text-white hover:shadow-sm dark:text-on-surface/90 dark:hover:bg-primary dark:hover:text-white",
                                        )}
                                      >
                                        {child.label}
                                      </Link>
                                    );
                                  })}
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              "block rounded-xl px-4 py-3 text-label-lg transition-all",
                              isParentActive
                                ? "bg-primary font-semibold text-white shadow-sm dark:text-on-primary"
                                : "font-semibold text-on-surface/90 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary dark:hover:text-white",
                            )}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-outline-variant px-6 py-5">
                  <Button href={headerCta.href} icono="mail" className="w-full">
                    {headerCta.label}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
