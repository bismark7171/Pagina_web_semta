"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { departamentoPaths, municipiosMapa } from "@/data/mapaBolivia";

const COLOR_ACTIVO = "#0d631b";
const COLOR_INACTIVO = "#e6e1dd";
const COLOR_BORDE = "#ffffff";

export default function MapaBolivia() {
  const [seleccionado, setSeleccionado] = useState<(typeof municipiosMapa)[number] | null>(null);

  const maxProyectos = Math.max(...municipiosMapa.map((m) => m.proyectos), 1);

  return (
    <section id="territorio" className="bg-background py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel icono="map">Presencia en el Territorio</SectionLabel>
            <h2 className="mt-4 font-headline-xl text-on-surface">
              Donde trabajamos <span className="text-primary">en el Altiplano y Valles</span>
            </h2>
            <p className="mt-3 text-body-lg text-on-surface-variant">
              Selecciona un municipio para ver cuántos proyectos registrados tiene SEMTA en esa zona
              del país.
            </p>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <div className="relative mx-auto w-full max-w-3xl">
            <svg
              viewBox="0 0 1000 1000"
              role="group"
              aria-label="Mapa interactivo de Bolivia con los municipios donde SEMTA trabaja"
              className="w-full"
            >
              {departamentoPaths.map((dep) => {
                const tieneProyectos = dep.proyectos > 0;
                return (
                  <g key={dep.id} className="transition-opacity duration-200">
                    <path
                      id={`dept-${dep.id}`}
                      d={dep.d}
                      fill={tieneProyectos ? COLOR_ACTIVO : COLOR_INACTIVO}
                      fillOpacity={tieneProyectos ? 0.12 + dep.proyectos * 0.06 : 1}
                      stroke={COLOR_BORDE}
                      strokeWidth={2 / 2}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {municipiosMapa.map((m) => {
                const tamaño = 8 + (m.proyectos / maxProyectos) * 14;
                const activo = seleccionado?.id === m.id;
                return (
                  <g
                    key={m.id}
                    transform={`translate(${m.x} ${m.y})`}
                    className="cursor-pointer"
                    role="button"
                    aria-pressed={activo}
                    aria-label={`${m.nombre}, ${m.departamento}: ${m.proyectos} ${
                      m.proyectos === 1 ? "proyecto" : "proyectos"
                    }`}
                    tabIndex={0}
                    onClick={() => setSeleccionado(activo ? null : m)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSeleccionado(activo ? null : m);
                      }
                    }}
                  >
                    <circle
                      r={tamaño + 6}
                      fill="#98f2a4"
                      opacity={0.25}
                      className="transition-all duration-200"
                    />
                    <circle
                      r={tamaño}
                      fill={COLOR_ACTIVO}
                      stroke={activo ? "#05200c" : "#ffffff"}
                      strokeWidth={activo ? 3 : 2}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: COLOR_ACTIVO, opacity: 0.14 }}
                />
                <span className="text-body-sm text-on-surface-variant">
                  Departamento con proyectos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full" style={{ backgroundColor: COLOR_INACTIVO }} />
                <span className="text-body-sm text-on-surface-variant">
                  Sin proyectos registrados
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full border-2 border-white ring-2 ring-primary" />
                <span className="text-body-sm text-on-surface-variant">
                  Municipio (tamaño = nº de proyectos)
                </span>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            {seleccionado ? (
              <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-card-semta">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
                  {seleccionado.departamento}
                </span>
                <h3 className="mt-3 font-headline-md text-on-surface">{seleccionado.nombre}</h3>
                <p className="mt-2 flex items-center gap-2 text-body-lg font-semibold text-primary">
                  {seleccionado.proyectos}{" "}
                  {seleccionado.proyectos === 1 ? "proyecto registrado" : "proyectos registrados"}
                </p>
                <p className="mt-3 text-body-md text-on-surface-variant">
                  Explora las fichas técnicas de las intervenciones en este municipio y sus
                  beneficios para las familias originarias.
                </p>
                <div className="mt-5">
                  <Button href="/proyectos" variant="solid" size="md" icono="agriculture">
                    Ver proyectos
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-card-semta">
                <h3 className="font-headline-md text-on-surface">Tocá un municipio</h3>
                <p className="mt-2 text-body-md text-on-surface-variant">
                  Los puntos sobre el mapa representan los municipios con proyectos de SEMTA. El
                  tamaño del punto indica la cantidad de intervenciones registradas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
