/**
 * MapaBolivia.tsx
 * Wrapper con next/dynamic + ssr: false para el mapa Leaflet.
 *
 * Leaflet accede a `window` → explota en SSR si se importa directo.
 * next/dynamic con ssr:false garantiza que solo se carga en el browser.
 *
 * PATRÓN OBLIGATORIO para cualquier librería que use window/document:
 *   const Componente = dynamic(() => import('./ComponenteInner'), { ssr: false })
 */

"use client";

import dynamic from "next/dynamic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { MunicipioMapa } from "./MapaBoliviaInner";

// Carga diferida — no afecta el LCP de la página principal
const MapaBoliviaInner = dynamic(() => import("./MapaBoliviaInner"), {
  ssr: false,
  loading: () => (
    // Skeleton mientras carga el JS de Leaflet
    <div className="flex h-[420px] items-center justify-center rounded-2xl bg-surface-container animate-pulse">
      <div className="text-center">
        <MaterialIcon name="map" className="text-[40px] text-on-surface-variant/30" />
        <p className="mt-2 text-body-sm text-on-surface-variant/50">Cargando mapa…</p>
      </div>
    </div>
  ),
});

interface Props {
  municipios: MunicipioMapa[];
  className?: string;
}

export default function MapaBolivia({ municipios, className }: Props) {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-card-semta sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <SectionLabel icono="map">Cobertura territorial</SectionLabel>
              <h2 className="mt-2 font-headline-xl text-on-surface">
                Presencia SEMTA <span className="text-primary">en Bolivia</span>
              </h2>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                {municipios.length} municipio{municipios.length !== 1 ? "s" : ""} con proyectos
                activos o concluidos
              </p>
            </div>
            {/* Leyenda */}
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-4 py-2 sm:flex">
              <MaterialIcon name="location_on" className="text-[18px] text-primary" />
              <span className="text-label-md text-on-surface-variant">
                Municipios con presencia SEMTA
              </span>
            </div>
          </div>

          {/* Mapa */}
          <MapaBoliviaInner municipios={municipios} />

          {/* Nota mobile */}
          <p className="mt-3 text-label-md text-on-surface-variant/60 sm:hidden">
            Usa dos dedos para mover el mapa
          </p>
          <p className="mt-3 hidden text-label-md text-on-surface-variant/60 sm:block">
            Mantén presionado y arrastra para navegar · Usa los botones +/− para zoom
          </p>
        </div>
      </div>
    </section>
  );
}

export type { MunicipioMapa };
