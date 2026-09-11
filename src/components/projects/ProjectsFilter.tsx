"use client";

import type { ProjectEstado, ProjectTipo } from "@/types";
import { proyectoEstados, proyectoEstadosOrden, tiposProyecto, municipiosProyecto } from "@/data/projects";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export type Filtros = {
  estado: "Todos" | ProjectEstado;
  tipo: "Todos" | ProjectTipo;
  municipio: "Todos" | string;
  busqueda: string;
};

const estadosFiltro: readonly ("Todos" | ProjectEstado)[] = [
  "Todos",
  ...proyectoEstadosOrden,
] as const;

const inputCls =
  "w-full appearance-none rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-label-lg text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function ProjectsFilter({
  filtros,
  onChange,
  total,
  municipios,
}: {
  filtros: Filtros;
  onChange: (f: Filtros) => void;
  total: number;
  /** Lista dinámica de municipios — si no se pasa usa la lista estática */
  municipios?: string[];
}) {
  const listaMunicipios = municipios && municipios.length > 0 ? municipios : municipiosProyecto;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {estadosFiltro.map((e) => {
          const activo = filtros.estado === e;
          const color = e === "Todos" ? "#191c19" : proyectoEstados[e as ProjectEstado].color;
          return (
            <button
              key={e}
              type="button"
              onClick={() => onChange({ ...filtros, estado: e as Filtros["estado"] })}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-label-lg font-semibold transition-all duration-200",
                activo
                  ? "border-transparent text-white"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 hover:text-primary",
              )}
              style={activo ? { backgroundColor: color } : undefined}
            >
              {e !== "Todos" && (
                <span
                  className={cn("size-2 rounded-full", !activo && "")}
                  style={{ backgroundColor: activo ? "#fff" : color }}
                />
              )}
              {e}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative">
          <select
            value={filtros.tipo}
            onChange={(ev) => onChange({ ...filtros, tipo: ev.target.value as Filtros["tipo"] })}
            className={cn(inputCls, "pr-10")}
            aria-label="Filtrar por tipo"
          >
            <option value="Todos">Todos los tipos</option>
            {tiposProyecto.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <MaterialIcon
            name="expand_more"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
        </div>

        <div className="relative">
          <select
            value={filtros.municipio}
            onChange={(ev) => onChange({ ...filtros, municipio: ev.target.value as Filtros["municipio"] })}
            className={cn(inputCls, "pr-10")}
            aria-label="Filtrar por municipio"
          >
            <option value="Todos">Todos los municipios</option>
            {listaMunicipios.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <MaterialIcon
            name="expand_more"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
        </div>

        <div className="relative">
          <MaterialIcon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="search"
            value={filtros.busqueda}
            onChange={(ev) => onChange({ ...filtros, busqueda: ev.target.value })}
            placeholder="Buscar proyecto…"
            className={cn(inputCls, "pl-11")}
            aria-label="Buscar proyecto"
          />
          {filtros.busqueda && (
            <button
              type="button"
              onClick={() => onChange({ ...filtros, busqueda: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-on-surface-variant hover:text-on-surface"
              aria-label="Limpiar búsqueda"
            >
              <MaterialIcon name="close" className="text-[18px]" />
            </button>
          )}
        </div>
      </div>

      <p className="text-label-md font-semibold text-on-surface-variant">
        {total} proyecto{total === 1 ? "" : "s"} encontrados
        <span className="font-normal text-on-surface-variant/70">
          {" "}
          · colección pública verificable
        </span>
      </p>
    </div>
  );
}