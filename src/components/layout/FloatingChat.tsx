"use client";

import React, { useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { siteDetails } from "@/data/siteDetails";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = siteDetails.contacto.whatsapp?.replace(/[^0-9]/g, "") || "59171500000";
  const defaultMessage = encodeURIComponent(
    "Hola SEMTA, quisiera consultar información sobre sus proyectos, biblioteca o talleres.",
  );

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 rounded-3xl border border-outline-variant bg-surface-container-lowest p-5 shadow-2xl animate-fade-in text-on-surface">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-primary animate-pulse" />
              <p className="text-label-md font-bold text-on-surface">Atención SEMTA</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-on-surface-variant hover:text-on-surface"
              aria-label="Cerrar chat"
            >
              <MaterialIcon name="close" className="text-[18px]" />
            </button>
          </div>

          <p className="mt-3 text-body-xs text-on-surface-variant leading-relaxed">
            ¿Consultas sobre nuestros cursos, biblioteca digital o reserva de espacios en Casa
            SEMTA?
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-label-md font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            <MaterialIcon name="chat" className="text-[20px]" />
            Chatear por WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Atención directa por WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        <MaterialIcon name={isOpen ? "close" : "chat"} className="text-[28px]" />
      </button>
    </div>
  );
}
