import Image from "next/image";
import { proyectoEstados } from "@/data/projects";
import type { IProject } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: IProject;
  onOpen: () => void;
}) {
  const estado = proyectoEstados[project.estado];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-high">
        <Image
          src={project.imagen}
          alt={project.alt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label-md font-semibold"
          style={{ backgroundColor: estado.tint, color: estado.color }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: estado.color }}
          />
          {project.estado}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
          {project.municipio} · {project.gestion}
        </p>
        <h3 className="mt-2 font-headline-md leading-snug text-on-surface">
          {project.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-body-sm leading-relaxed text-on-surface-variant">
          {project.descripcion}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex items-center gap-1.5 text-label-md font-semibold text-on-surface-variant">
            <MaterialIcon name="group" className="text-[1.1em] text-primary" />
            {project.beneficiarios}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
          >
            {project.boton}
            <MaterialIcon name="arrow_forward" className="text-[1em]" />
          </button>
        </div>
      </div>
    </article>
  );
}