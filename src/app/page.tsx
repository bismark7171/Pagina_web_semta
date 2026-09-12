import HeroSlider from "@/components/home/HeroSlider";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import LineasDeAccion from "@/components/home/LineasDeAccion";
import MapaBolivia from "@/components/home/MapaBolivia";
import PhotoEssay from "@/components/home/PhotoEssay";
import DualCallout from "@/components/home/DualCallout";
import Transparencia from "@/components/home/Transparencia";
import HomeCta from "@/components/home/HomeCta";
import { adminGetAllProjects, adminGetMunicipios } from "@/lib/firebase/adminProjectService";
import { projects as staticProjects } from "@/data/projects";
import type { MunicipioMapa } from "@/components/home/MapaBolivia";

// ISR 5 min — mismo ciclo que /proyectos
export const revalidate = 300;

export default async function HomePage() {
  // Calcular municipios con proyectos para el mapa
  let municipiosMapa: MunicipioMapa[] = [];
  let totalProyectos: number | undefined;
  let totalMunicipios: number | undefined;

  try {
    const [fps, municipiosMap] = await Promise.all([adminGetAllProjects(), adminGetMunicipios()]);

    totalProyectos = fps.length;

    // Obtener colección completa de municipios con coordenadas desde Firestore
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const db = getAdminDb();
    const snap = await db.collection("municipios").get();

    // Mapa: municipioId → { nombre, ubicacion }
    const municipioData: Record<string, { nombre: string; lat?: number; lng?: number }> = {};
    snap.docs.forEach((doc) => {
      const d = doc.data() as Record<string, unknown>;
      const id = (d.municipioId as string) ?? doc.id;
      const ub = (d.ubicacion as Record<string, number>) ?? {};
      municipioData[id] = {
        nombre: (d.nombre as string) ?? id,
        lat: typeof ub.lat === "number" ? ub.lat : undefined,
        lng: typeof ub.lng === "number" ? ub.lng : undefined,
      };
    });

    // Contar proyectos por municipio
    const conteo: Record<string, number> = {};
    for (const fp of fps) {
      for (const mId of fp.municipioIds) {
        conteo[mId] = (conteo[mId] ?? 0) + 1;
      }
    }

    municipiosMapa = Object.entries(conteo).map(([id, cantidadProyectos]) => ({
      id,
      nombre: municipiosMap[id] ?? municipioData[id]?.nombre ?? id,
      cantidadProyectos,
      ubicacion: municipioData[id]
        ? { lat: municipioData[id].lat, lng: municipioData[id].lng }
        : undefined,
    }));
    totalMunicipios = municipiosMapa.length;
  } catch {
    // Fallback: municipios de los proyectos estáticos
    const conteoStatic: Record<string, number> = {};
    for (const p of staticProjects) {
      conteoStatic[p.municipio] = (conteoStatic[p.municipio] ?? 0) + 1;
    }
    municipiosMapa = Object.entries(conteoStatic).map(([nombre, cantidadProyectos]) => ({
      id: nombre.toLowerCase().replace(/ /g, "_"),
      nombre,
      cantidadProyectos,
    }));
    totalProyectos = staticProjects.length;
    totalMunicipios = municipiosMapa.length;
  }

  return (
    <>
      <HeroSlider />
      <ImpactMetrics totalProyectos={totalProyectos} totalMunicipios={totalMunicipios} />
      <LineasDeAccion />
      <MapaBolivia municipios={municipiosMapa} className="bg-surface-container-lowest py-16" />
      <PhotoEssay />
      <DualCallout />
      <Transparencia />
      <HomeCta />
    </>
  );
}
