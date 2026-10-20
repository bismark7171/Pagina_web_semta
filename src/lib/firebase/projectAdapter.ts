/**
 * src/lib/firebase/projectAdapter.ts
 * Transforma documentos FirestoreProject (shape crudo Flutter) al formato
 * unificado IProject de la UI.
 * Espejo del patrón en semta/test/models/project_test.dart
 */

import type { FirestoreProject } from "./projectService";
import type { IProject, ProjectEstado, ProjectTipo } from "@/types";
import { FALLBACK_IMAGE, normalizeImageUrl } from "@/lib/images";

const ESTADO_MAP: Record<string, ProjectEstado> = {
  CONCLUIDO: "Concluido",
  EN_EJECUCION: "En Ejecución",
  PLANIFICADO: "Planificado",
  SUSPENDIDO: "Suspendido",
  CANCELADO: "Cancelado",
};

const TIPO_MAP: Record<string, ProjectTipo> = {
  "agua-y-riego": "Agua y Riego",
  agroecologia: "Agroecología",
  bofedales: "Manejo de Bofedales",
  mujeres: "Liderazgo de Mujeres",
  tecnologias: "Tecnologías Solares",
};

export function adaptProject(
  fp: FirestoreProject,
  municipiosMap: Record<string, string> = {},
  financiadoresMap: Record<string, string> = {},
  tiposMap: Record<string, string> = {},
): IProject {
  const munName =
    (fp.municipioIds ?? [])
      .map((id) => municipiosMap[id] ?? id)
      .filter(Boolean)
      .join(", ") || "Bolivia";
  const finName =
    (fp.financiadorId ? (financiadoresMap[fp.financiadorId] ?? fp.financiadorId) : "") ||
    "Cooperación Internacional";
  const tipoName =
    (fp.tipoProyectoId
      ? (tiposMap[fp.tipoProyectoId] ?? TIPO_MAP[fp.tipoProyectoId])
      : undefined) ?? "Agua y Riego";
  const estadoUi: ProjectEstado = (fp.estado ? ESTADO_MAP[fp.estado] : undefined) ?? "Planificado";
  const imagen =
    fp.imageUrls && fp.imageUrls.length > 0 ? normalizeImageUrl(fp.imageUrls[0]) : FALLBACK_IMAGE;

  return {
    id: fp.proyectoId || fp._docId || "",
    titulo: fp.nombre || "Proyecto SEMTA",
    descripcion: fp.descripcion || "",
    estado: estadoUi,
    tipo: tipoName as ProjectTipo,
    municipio: munName,
    financiador: finName,
    cooperante: finName,
    beneficiarios: fp.beneficiarios || "Comunidades participantes",
    gestion: String(fp.anio ?? ""),
    ubicacion: munName === "Bolivia" ? "Bolivia" : `${munName}, Bolivia`,
    imagen,
    alt: fp.nombre ? `Proyecto SEMTA: ${fp.nombre}` : "Proyecto SEMTA",
    codigo: fp.proyectoId ? `ID: ${fp.proyectoId}` : "",
    boton: "Ficha Técnica",
    search:
      `${fp.proyectoId ?? ""} ${fp.nombre ?? ""} ${fp.descripcion ?? ""} ${munName} ${finName} ${tipoName} ${estadoUi}`.toLowerCase(),
  };
}

export function adaptProjects(
  fps: FirestoreProject[],
  municipiosMap: Record<string, string> = {},
  financiadoresMap: Record<string, string> = {},
  tiposMap: Record<string, string> = {},
): IProject[] {
  return fps.map((fp) => adaptProject(fp, municipiosMap, financiadoresMap, tiposMap));
}
