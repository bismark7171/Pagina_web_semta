"use client";

import React, { useState, useMemo } from "react";
import type { IProject } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Props {
  projects?: IProject[];
  proyectos?: IProject[];
  municipios?: string[];
}

const ESTADOS = ["Todos", "En Ejecución", "Concluido", "Planificado"] as const;

export default function ProjectsExplorer({
  projects,
  proyectos,
  municipios: municipiosProp,
}: Props) {
  const allProjects = useMemo(() => projects ?? proyectos ?? [], [projects, proyectos]);

  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<string>("Todos");
  const [tipoFilter, setTipoFilter] = useState<string>("");
  const [municipioFilter, setMunicipioFilter] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  // Tipos únicos
  const tipos = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => {
      if (p.tipo) set.add(p.tipo);
    });
    return Array.from(set).sort();
  }, [allProjects]);

  // Municipios únicos
  const municipios = useMemo(() => {
    if (municipiosProp && municipiosProp.length > 0) {
      return municipiosProp;
    }
    const set = new Set<string>();
    allProjects.forEach((p) => {
      if (p.municipio) set.add(p.municipio);
    });
    return Array.from(set).sort();
  }, [allProjects, municipiosProp]);

  // Filtrado
  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      // Estado
      if (estadoFilter !== "Todos" && p.estado !== estadoFilter) {
        return false;
      }
      // Tipo
      if (tipoFilter && p.tipo !== tipoFilter) {
        return false;
      }
      // Municipio
      if (municipioFilter && p.municipio !== municipioFilter) {
        return false;
      }
      // Búsqueda
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = [
          p.titulo,
          p.descripcion,
          p.municipio,
          p.financiador,
          p.cooperante,
          p.tipo,
          p.estado,
          p.search,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [allProjects, estadoFilter, tipoFilter, municipioFilter, search]);

  const handleResetFilters = () => {
    setSearch("");
    setEstadoFilter("Todos");
    setTipoFilter("");
    setMunicipioFilter("");
  };

  const countText = `${filtered.length} proyecto${
    filtered.length !== 1 ? "s" : ""
  } encontrado${filtered.length !== 1 ? "s" : ""}`;

  return (
    <div className="space-y-8">
      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col gap-6 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Campo de búsqueda */}
          <div className="relative flex-1">
            <MaterialIcon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar proyecto por nombre, cooperante o palabra clave..."
              className="w-full rounded-2xl border border-outline-variant bg-surface px-11 py-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Borrar búsqueda"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <MaterialIcon name="close" className="text-[18px]" />
              </button>
            )}
          </div>

          {/* Selects de Tipo y Municipio */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-full sm:w-auto">
              <label htmlFor="select-tipo" className="sr-only">
                Filtrar por tipo
              </label>
              <select
                id="select-tipo"
                aria-label="Filtrar por tipo"
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="w-full rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-body-sm text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="">Todos los tipos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="select-municipio" className="sr-only">
                Filtrar por municipio
              </label>
              <select
                id="select-municipio"
                aria-label="Filtrar por municipio"
                value={municipioFilter}
                onChange={(e) => setMunicipioFilter(e.target.value)}
                className="w-full rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-body-sm text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="">Todos los municipios</option>
                {municipios.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botones de filtro por Estado y contador */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant/60 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-label-sm font-medium text-on-surface-variant mr-1">Estado:</span>
            {ESTADOS.map((est) => {
              const active = estadoFilter === est;
              return (
                <button
                  key={est}
                  type="button"
                  onClick={() => setEstadoFilter(est)}
                  className={`rounded-full px-4 py-1.5 text-label-xs font-semibold transition-all ${
                    active
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {est}
                </button>
              );
            })}
          </div>

          <div className="text-label-md font-semibold text-primary">{countText}</div>
        </div>
      </div>

      {/* Grilla de Resultados */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-outline-variant bg-surface-container-lowest p-12 text-center">
          <MaterialIcon name="search_off" className="text-[48px] text-on-surface-variant/40" />
          <h3 className="mt-4 font-headline-md text-on-surface">Sin resultados</h3>
          <p className="mt-2 text-body-sm text-on-surface-variant">
            No se encontraron proyectos con los criterios de búsqueda actuales.
          </p>
          <div className="mt-6">
            <Button variant="outline" size="sm" icono="restart_alt" onClick={handleResetFilters}>
              Limpiar filtros
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proj, idx) => (
            <Card
              key={proj.id}
              hoverable
              className="group flex flex-col overflow-hidden border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
            >
              {/* Imagen con Zoom, Cropper y Lightbox encapsulado */}
              <ZoomableImage
                src={proj.imagen}
                alt={proj.alt || proj.titulo}
                caption={`${proj.titulo} (${proj.municipio})`}
                aspectRatioClass="aspect-[16/10]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                gallery={filtered.map((p) => ({
                  imagen: p.imagen,
                  alt: p.alt || p.titulo,
                  caption: `${p.titulo} - ${p.municipio}`,
                }))}
                galleryIndex={idx}
                badge={
                  <span
                    className={`rounded-full px-3 py-1 text-label-xs font-semibold uppercase tracking-wider backdrop-blur ${
                      proj.estado === "Concluido"
                        ? "bg-primary-container/90 text-on-primary-container"
                        : proj.estado === "En Ejecución"
                          ? "bg-secondary-container/90 text-on-secondary-container"
                          : "bg-tertiary-container/90 text-on-tertiary-container"
                    }`}
                  >
                    {proj.estado}
                  </span>
                }
              />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-label-caps uppercase tracking-wider text-primary">
                  <MaterialIcon name="place" className="text-[14px]" />
                  <span>{proj.municipio}</span>
                  {proj.tipo && (
                    <>
                      <span>&middot;</span>
                      <span>{proj.tipo}</span>
                    </>
                  )}
                </div>

                <h3 className="mt-2 font-headline-md leading-snug text-on-surface">
                  {proj.titulo}
                </h3>

                <p className="mt-2.5 line-clamp-3 text-body-xs leading-relaxed text-on-surface-variant">
                  {proj.descripcion}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-outline-variant/60 pt-3 text-body-xs text-on-surface-variant">
                  {proj.cooperante && (
                    <span className="flex items-center gap-1">
                      <MaterialIcon name="handshake" className="text-[14px] text-primary" />
                      {proj.cooperante}
                    </span>
                  )}
                  {proj.beneficiarios && (
                    <span className="flex items-center gap-1">
                      <MaterialIcon name="groups" className="text-[14px] text-primary" />
                      {proj.beneficiarios}
                    </span>
                  )}
                  {proj.gestion && (
                    <span className="flex items-center gap-1">
                      <MaterialIcon name="calendar_today" className="text-[14px] text-primary" />
                      {proj.gestion}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary/10 py-2.5 text-label-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
                  >
                    <MaterialIcon name="description" className="text-[16px]" />
                    <span>Ficha Técnica</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Detalle / Ficha Técnica */}
      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        titulo={selectedProject?.titulo}
      >
        {selectedProject && (
          <div className="space-y-5 text-on-surface">
            {/* Foto del proyecto en modal con ZoomableImage */}
            <div className="overflow-hidden rounded-2xl">
              <ZoomableImage
                src={selectedProject.imagen}
                alt={selectedProject.alt || selectedProject.titulo}
                caption={selectedProject.titulo}
                aspectRatioClass="aspect-[16/9]"
              />
            </div>

            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-label-xs font-semibold uppercase tracking-wider ${
                  selectedProject.estado === "Concluido"
                    ? "bg-primary-container text-on-primary-container"
                    : selectedProject.estado === "En Ejecución"
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-tertiary-container text-on-tertiary-container"
                }`}
              >
                {selectedProject.estado}
              </span>
              <h3 className="mt-2 font-headline-lg text-on-surface">{selectedProject.titulo}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-on-surface-variant">
                {selectedProject.descripcion}
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl bg-surface-container p-4 sm:grid-cols-2 text-body-xs">
              <div>
                <p className="font-semibold text-on-surface">Municipio y Territorio</p>
                <p className="text-on-surface-variant">
                  {selectedProject.ubicacion || selectedProject.municipio}
                </p>
              </div>

              <div>
                <p className="font-semibold text-on-surface">Línea de Intervención</p>
                <p className="text-on-surface-variant">{selectedProject.tipo || "General"}</p>
              </div>

              <div>
                <p className="font-semibold text-on-surface">Cooperante / Financiador</p>
                <p className="text-on-surface-variant">
                  {selectedProject.cooperante || selectedProject.financiador || "Fondos SEMTA"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-on-surface">Impacto Comunitario</p>
                <p className="text-on-surface-variant">
                  {selectedProject.beneficiarios || "Comunidades originarias"}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={() => setSelectedProject(null)}>
                Cerrar Ficha
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
