/**
 * projectAdapter.ts
 * Convierte FirestoreProject (estructura real de Firestore/Flutter)
 * al formato IProject que usan los componentes de la web.
 *
 * Centraliza el mapeo para que si cambia el esquema de Firestore
 * solo se actualice aquí, sin tocar los componentes UI.
 */

import type { FirestoreProject } from "./projectService";
import type { IProject, ProjectEstado, ProjectTipo } from "@/types";

// Mapeo de estados Firestore → estados UI
const estadoMap: Record<string, ProjectEstado> = {
  PLANIFICADO:    "Planificado",
  EN_EJECUCION:   "En Ejecución",
  CONCLUIDO:      "Concluido",
  SUSPENDIDO:     "Suspendido",
  CANCELADO:      "Cancelado",
  // Por si vienen en formato legible directamente
  "Planificado":  "Planificado",
  "En Ejecución": "En Ejecución",
  "Concluido":    "Concluido",
  "Suspendido":   "Suspendido",
  "Cancelado":    "Cancelado",
};

// Mapeo de tipos Firestore → tipos UI
const tipoMap: Record<string, ProjectTipo> = {
  "agua-y-riego":       "Agua y Riego",
  "agroecologia":       "Agroecología",
  "bofedales":          "Manejo de Bofedales",
  "mujeres":            "Liderazgo de Mujeres",
  "tecnologias":        "Tecnologías Solares",
  // Por si el ID coincide con el nombre del tipo directamente
  "Agua y Riego":       "Agua y Riego",
  "Agroecología":       "Agroecología",
  "Manejo de Bofedales":"Manejo de Bofedales",
  "Liderazgo de Mujeres":"Liderazgo de Mujeres",
  "Tecnologías Solares": "Tecnologías Solares",
};

/**
 * Convierte un proyecto de Firestore al formato IProject de la UI.
 *
 * @param fp - Proyecto tal como viene de Firestore
 * @param municipiosMap - mapa { municipioId: nombre } para resolver nombres
 * @param financiadoresMap - mapa { financiadorId: nombre }
 * @param tiposMap - mapa { tipoProyectoId: nombre }
 */
export function adaptProject(
  fp: FirestoreProject,
  municipiosMap: Record<string, string> = {},
  financiadoresMap: Record<string, string> = {},
  tiposMap: Record<string, string> = {},
): IProject {
  // Resolver nombre del municipio principal
  const municipioNombre =
    fp.municipioIds.length > 0
      ? (municipiosMap[fp.municipioIds[0]] ?? fp.municipioIds[0])
      : "Bolivia";

  // Resolver nombre del financiador
  const financiadorNombre =
    financiadoresMap[fp.financiadorId] ?? fp.financiadorId ?? "";

  // Resolver nombre del tipo
  const tipoNombre = tiposMap[fp.tipoProyectoId] ?? fp.tipoProyectoId ?? "";

  // Mapear estado
  const estado: ProjectEstado = estadoMap[fp.estado] ?? "Planificado";

  // Mapear tipo — buscar en el mapa o intentar match directo
  const tipo: ProjectTipo =
    tipoMap[fp.tipoProyectoId] ??
    tipoMap[tipoNombre] ??
    "Agua y Riego";

  // Imagen: usar primera de la galería o placeholder SEMTA
  const imagen =
    fp.imageUrls?.length > 0
      ? fp.imageUrls[0]
      : "https://lh3.googleusercontent.com/aida-public/AB6AXuAQK5n6LW2ug_oRYK5IdsciuHh4IGzYPamNMQftWe2uDHCGiFRaenQy_906-80zMpEthY3DQqSKjB8qZNAIRbm9UkSd-jzV0DgyJHG3fJMgdZiJS_Ug4k6qxfpB_AvCh7ZtRNY0DaC4RpubslxGgmno6Lf569s6CH13a5VrOLJJ4sWS4ZkEnWIKCOkeYnM_hAZmUBnHB029RLPFhW6JMaQltvrrXFE4gw5uFbrL5XxTJkM2MBN9Nw";

  // Texto de búsqueda combinado para el filtro client-side
  const search = [
    fp.nombre,
    fp.descripcion,
    fp.objetivo,
    municipioNombre,
    financiadorNombre,
    tipoNombre,
    fp.proyectoId,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id:           fp.proyectoId,
    titulo:       fp.nombre,
    descripcion:  fp.descripcion || fp.objetivo,
    estado,
    tipo,
    municipio:    municipioNombre,
    financiador:  financiadorNombre,
    cooperante:   financiadorNombre,
    beneficiarios: fp.beneficiarios || "Familias beneficiadas",
    gestion:      String(fp.anio),
    ubicacion:    municipioNombre + ", Bolivia",
    imagen,
    alt:          `Proyecto SEMTA: ${fp.nombre} en ${municipioNombre}`,
    codigo:       `ID: ${fp.proyectoId}`,
    boton:        "Ficha Técnica",
    search,
  };
}

/** Adapta un array completo de proyectos Firestore */
export function adaptProjects(
  fps: FirestoreProject[],
  municipiosMap: Record<string, string> = {},
  financiadoresMap: Record<string, string> = {},
  tiposMap: Record<string, string> = {},
): IProject[] {
  return fps.map((fp) =>
    adaptProject(fp, municipiosMap, financiadoresMap, tiposMap),
  );
}
