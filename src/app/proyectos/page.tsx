import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import ProjectsStats from "@/components/projects/ProjectsStats";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Proyectos e Impacto Comunitario",
  description:
    "Banco público de proyectos de SEMTA: cosecha de agua, microriego, agroecología, bofedales, liderazgo de mujeres y tecnologías solares en Bolivia.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Proyectos", href: "/proyectos" }]}
        badge={{ icono: "agriculture", text: "Banco Público de Proyectos" }}
        titulo={
          <>
            Proyectos e{" "}
            <span className="text-primary-fixed">Impacto Comunitario</span>
          </>
        }
        descripcion="Catálogo verificable de intervenciones de SEMTA con sus metas, cooperantes y estados. Filtra por tipo, municipio o estado y abre la ficha técnica de cada iniciativa."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <ProjectsStats />
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface-container-lowest pb-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop pt-12">
          <ProjectsExplorer />
        </div>
      </section>
    </>
  );
}