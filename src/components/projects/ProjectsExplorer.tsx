"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IProject } from "@/types";
import { proyectoEstados } from "@/data/projects";
import ProjectsFilter, { type Filtros } from "./ProjectsFilter";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const filtrosIniciales: Filtros = {
  estado: "Todos",
  tipo: "Todos",
  municipio: "Todos",
  busqueda: "",
};

interface Props {
  /** Lista de proyectos inyectada desde el Server Component.
   *  Si no se pasa, usa los datos estáticos de muestra (fallback). */
  projects: IProject[];
  municipios?: string[];
}

export default function ProjectsExplorer({ projects, municipios }: Props) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciales);
  const [selected, setSelected] = useState<IProject | null>(null);

  // Construir lista dinámica de municipios únicos desde los proyectos
  const municipiosList = useMemo(() => {
    if (municipios && municipios.length > 0) return municipios;
    return [...new Set(projects.map((p) => p.municipio))].sort();
  }, [projects, municipios]);

  const filtrados = useMemo(() => {
    const q = filtros.busqueda.trim().toLowerCase();
    return projects.filter((p) => {
      if (filtros.estado !== "Todos" && p.estado !== filtros.estado) return false;
      if (filtros.tipo !== "Todos" && p.tipo !== filtros.tipo) return false;
      if (filtros.municipio !== "Todos" && p.municipio !== filtros.municipio) return false;
      if (q && !p.search.toLowerCase().includes(q) && !p.titulo.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filtros, projects]);

  return (
    <div>
      <ProjectsFilter
        filtros={filtros}
        onChange={setFiltros}
        total={filtrados.length}
        municipios={municipiosList}
      />

      {filtrados.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <MaterialIcon name="search_off" className="text-[30px]" />
          </span>
          <h3 className="mt-4 font-headline-md text-on-surface">Sin resultados</h3>
          <p className="mt-1 max-w-sm text-body-sm text-on-surface-variant">
            No encontramos proyectos con esos filtros. Intenta ampliar la búsqueda o limpiar los criterios.
          </p>
          <button
            type="button"
            onClick={() => setFiltros(filtrosIniciales)}
            className="mt-6 rounded-full border-2 border-primary px-5 py-2 text-label-lg font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtrados.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={p} onOpen={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
