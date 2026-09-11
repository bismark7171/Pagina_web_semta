import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import ProjectsStats from "@/components/projects/ProjectsStats";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { projects as staticProjects } from "@/data/projects";
import {
  adminGetAllProjects,
  adminGetFinanciadores,
  adminGetMunicipios,
  adminGetTiposProyecto,
} from "@/lib/firebase/adminProjectService";
import { adaptProjects } from "@/lib/firebase/projectAdapter";

export const metadata: Metadata = {
  title: "Proyectos e Impacto Comunitario",
  description:
    "Banco público de proyectos de SEMTA: cosecha de agua, microriego, agroecología, bofedales, liderazgo de mujeres y tecnologías solares en Bolivia.",
};

// ISR: revalidar cada 5 minutos
// Cuando alguien actualiza un proyecto en la app Flutter → máximo 5 min después
// la web lo muestra sin hacer deploy
export const revalidate = 300;

export default async function ProyectosPage() {
  // Intentar cargar desde Firestore — si falla, usar datos estáticos de muestra
  let proyectos = staticProjects;
  let municipiosList: string[] = [];

  try {
    const [fps, municipiosMap, financiadoresMap, tiposMap] = await Promise.all([
      adminGetAllProjects(),
      adminGetMunicipios(),
      adminGetFinanciadores(),
      adminGetTiposProyecto(),
    ]);

    if (fps.length > 0) {
      proyectos = adaptProjects(fps, municipiosMap, financiadoresMap, tiposMap);
      municipiosList = Object.values(municipiosMap).sort();
    }
  } catch (err) {
    // Si Firebase no está configurado aún, muestra los datos estáticos
    console.warn("[ProyectosPage] Usando datos estáticos — Firebase no disponible:", err);
  }

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
          <ProjectsStats total={proyectos.length} />
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface-container-lowest pb-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop pt-12">
          <ProjectsExplorer projects={proyectos} municipios={municipiosList} />
        </div>
      </section>
    </>
  );
}
