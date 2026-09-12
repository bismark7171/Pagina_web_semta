"use client";

import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { menuItems, headerCta } from "@/data/menuItems";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50 lg:hidden" onClose={onClose}>
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
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-xl px-4 py-3 text-label-lg font-semibold text-on-surface/90 transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 flex flex-col gap-0.5 border-l border-outline-variant pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-2 text-label-lg text-on-surface/70 transition-colors hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
