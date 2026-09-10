"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  "w-full max-w-2xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl",
                  className,
                )}
              >
                <div className="flex items-center justify-between border-b border-outline-variant px-6 py-4">
                  <DialogTitle className="font-headline-md text-on-surface">
                    {title}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                    aria-label="Cerrar"
                  >
                    <MaterialIcon name="close" />
                  </button>
                </div>
                <div className="px-6 py-6">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}