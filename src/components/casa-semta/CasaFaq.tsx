"use client";

import { useState } from "react";
import { casaSemtaFaq } from "@/data/casaSemta";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

export default function CasaFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {casaSemtaFaq.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div
            key={faq.pregunta}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              open
                ? "border-primary/40 bg-surface-container-lowest shadow-card-semta"
                : "border-outline-variant bg-surface-container-lowest",
            )}
          >
            <button
              type="button"
              id={`faq-trigger-${i}`}
              aria-controls={`faq-panel-${i}`}
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-container/15 text-primary">
                <MaterialIcon name={faq.icono} className={faq.color} />
              </span>
              <span className="flex-1 font-headline-sm text-on-surface">
                {faq.pregunta}
              </span>
              <MaterialIcon
                name={open ? "expand_less" : "expand_more"}
                className="text-on-surface-variant"
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-[76px] text-body-md leading-relaxed text-on-surface-variant">
                  {faq.respuesta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}