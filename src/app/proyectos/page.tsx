import type { Metadata } from "next";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos de Impacto Territorial",
  description:
    "Catálogo de iniciativas ejecutadas y activas de SEMTA en seguridad hídrica, agroecología y energías renovables en Bolivia.",
};

export default function ProyectosPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-container-semta px-gutter-desktop">
        <ProjectsExplorer projects={projects} />
      </div>
    </div>
  );
}
