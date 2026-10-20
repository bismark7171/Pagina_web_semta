"use client";

import React, { useEffect } from "react";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  titulo?: string;
  className?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, titulo, className, children }: ModalProps) {
  const modalTitle = title || titulo;

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 shadow-2xl transition-all",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-6">
          {modalTitle && <h2 className="font-headline-md text-on-surface">{modalTitle}</h2>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="ml-auto grid size-10 place-items-center rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <MaterialIcon name="close" className="text-[20px]" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
