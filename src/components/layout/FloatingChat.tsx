"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { siteDetails } from "@/data/siteDetails";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [notifVista, setNotifVista] = useState(false);

  const whatsapp = siteDetails.redes.find((r) => r.nombre === "WhatsApp")?.url;

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!notifVista) setNotifVista(true);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      role="region"
      aria-label="Contacto rápido SEMTA"
    >
      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[300px] overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-card-semta sm:w-[320px]"
          >
            {/* Header del panel */}
            <div className="flex items-center gap-3 bg-bosque p-5 text-white">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-fixed text-bosque">
                <MaterialIcon name="forum" className="text-[22px]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm font-bold">SEMTA responde</p>
                <p className="text-xs text-white/70">Horario hábil · Lun–Vie 08:30–18:00</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar panel de contacto"
                className="grid size-8 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15"
              >
                <MaterialIcon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Cuerpo del panel */}
            <div className="p-5">
              {/* Burbuja de mensaje */}
              <div className="rounded-2xl bg-primary/10 px-4 py-3 text-body-sm text-on-surface">
                ¡Hola! ¿Tenés una consulta sobre proyectos, pasantías o Casa SEMTA?
              </div>

              {/* Acciones */}
              <div className="mt-4 space-y-2.5">
                {whatsapp && (
                  <Button
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    icono="chat"
                    className="w-full"
                  >
                    WhatsApp directo
                  </Button>
                )}
                <Button
                  href="/agenda"
                  variant="outline"
                  iconRight="arrow_forward"
                  className="w-full"
                >
                  Ver agenda de talleres
                </Button>
                <Button
                  href="/contacto"
                  variant="ghost"
                  icono="mail"
                  className="w-full"
                >
                  Formulario de contacto
                </Button>
              </div>

              {/* Email directo */}
              <p className="mt-4 text-center text-xs text-on-surface-variant">
                o escribí a{" "}
                <a
                  href={`mailto:${siteDetails.contacto.email}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {siteDetails.contacto.email}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <button
        type="button"
        aria-label={open ? "Cerrar contacto rápido" : "Abrir contacto rápido"}
        aria-expanded={open}
        onClick={handleToggle}
        className="group relative grid size-14 place-items-center rounded-full bg-primary text-on-primary shadow-card-semta transition-all duration-200 hover:scale-105 hover:shadow-soft-semta"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <MaterialIcon
              name={open ? "close" : "chat_bubble"}
              className="text-[26px]"
            />
          </motion.span>
        </AnimatePresence>

        {/* Punto de notificación — desaparece al primer clic */}
        {!notifVista && (
          <span
            className="absolute right-0 top-0 size-3.5 rounded-full border-2 border-white bg-error"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
