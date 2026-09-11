"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface LightboxFoto {
  imagen: string;
  alt: string;
}

interface LightboxProps {
  fotos: LightboxFoto[];
  indiceInicial: number;
  onClose: () => void;
}

export function Lightbox({ fotos, indiceInicial, onClose }: LightboxProps) {
  const [indice, setIndice] = useState(indiceInicial);
  const foto = fotos[indice];

  const prev = useCallback(
    () => setIndice((i) => (i - 1 + fotos.length) % fotos.length),
    [fotos.length],
  );
  const next = useCallback(() => setIndice((i) => (i + 1) % fotos.length), [fotos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!foto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ${indice + 1} de ${fotos.length}`}
      className="fixed inset-0 z-[70] flex flex-col bg-black/90"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4" onClick={(e) => e.stopPropagation()}>
        <span className="text-label-md text-white/70">
          {indice + 1} / {fotos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="rounded-full p-3 text-white transition-colors hover:bg-white/10"
        >
          <MaterialIcon name="close" className="text-[24px]" />
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image
          src={foto.imagen}
          alt={foto.alt}
          fill
          sizes="100vw"
          priority
          className="object-contain"
        />
      </div>

      <div
        className="flex items-center justify-between gap-4 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Imagen anterior"
          className="rounded-full p-3 text-white transition-colors hover:bg-white/10"
        >
          <MaterialIcon name="chevron_right" className="rotate-180 text-[24px]" />
        </button>
        <p className="line-clamp-2 max-w-xl text-center text-body-sm text-white/70">{foto.alt}</p>
        <button
          type="button"
          onClick={next}
          aria-label="Imagen siguiente"
          className="rounded-full p-3 text-white transition-colors hover:bg-white/10"
        >
          <MaterialIcon name="chevron_right" className="text-[24px]" />
        </button>
      </div>
    </div>
  );
}
