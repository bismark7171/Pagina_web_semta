"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import type { ICasaPhoto } from "@/types";

interface Props {
  fotos: ICasaPhoto[];
}

export default function GaleriaEspacios({ fotos }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const [principal, ...grid] = fotos;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => setIndice(0)}
          aria-label={`Ampliar foto: ${principal.alt}`}
          className="group relative col-span-2 row-span-2 aspect-square cursor-zoom-in overflow-hidden rounded-3xl md:aspect-auto"
        >
          <Image
            src={principal.imagen}
            alt={principal.alt}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        {grid.map((f, i) => (
          <button
            key={f.imagen}
            type="button"
            onClick={() => setIndice(i + 1)}
            aria-label={`Ampliar foto: ${f.alt}`}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl"
          >
            <Image
              src={f.imagen}
              alt={f.alt}
              fill
              sizes="(min-width:768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {indice !== null && (
        <Lightbox fotos={fotos} indiceInicial={indice} onClose={() => setIndice(null)} />
      )}
    </>
  );
}
