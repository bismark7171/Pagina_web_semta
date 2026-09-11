/**
 * adminProjectService.ts
 * Lee proyectos desde Firestore usando Firebase Admin (servidor).
 * Se usa en Server Components de Next.js con ISR — los datos
 * se cachean y se regeneran automáticamente cada 5 minutos.
 *
 * El visitante NUNCA hace una petición directa a Firestore.
 * Solo el servidor de Vercel habla con Firebase.
 */

import { getAdminDb } from "./admin";
import type { FirestoreProject } from "./projectService";

const COL = "proyectos";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromAdminDoc(doc: any): FirestoreProject {
  const d = doc.data() as Record<string, unknown>;
  return {
    proyectoId:          (d.proyectoId  as string)  ?? doc.id,
    nombre:              (d.nombre      as string)  ?? "",
    tipoProyectoId:      (d.tipoProyectoId as string) ?? "",
    municipioIds:        Array.isArray(d.municipioIds)  ? (d.municipioIds as string[])  : [],
    comunidadIds:        Array.isArray(d.comunidadIds)  ? (d.comunidadIds as string[])  : [],
    anio:                typeof d.anio === "number" ? d.anio : Number(d.anio) || 0,
    descripcion:         (d.descripcion         as string) ?? "",
    objetivo:            (d.objetivo            as string) ?? "",
    beneficiarios:       (d.beneficiarios       as string) ?? "",
    presupuesto:         typeof d.presupuesto === "number" ? d.presupuesto : Number(d.presupuesto) || 0,
    moneda:              (d.moneda              as string) ?? "Bs",
    financiadorId:       (d.financiadorId       as string) ?? "",
    estado:              (d.estado              as string) ?? "PLANIFICADO",
    resultados:          (d.resultados          as string) ?? "",
    leccionesAprendidas: (d.leccionesAprendidas as string) ?? "",
    presupuestoPorAnio:  (d.presupuestoPorAnio as Record<string, number>) ?? {},
    imageUrls:           Array.isArray(d.imageUrls) ? (d.imageUrls as string[]) : [],
    _docId:              doc.id,
  };
}

// ─── Servicios públicos (solo lectura) ───────────────────────────────────────

/**
 * Todos los proyectos — usado en /proyectos con ISR 5 min.
 * Equivalente a ProjectService.getAllProjects() del Flutter.
 */
export async function adminGetAllProjects(): Promise<FirestoreProject[]> {
  const db = getAdminDb();
  const snap = await db.collection(COL).get();
  return snap.docs.map(fromAdminDoc);
}

/**
 * Proyecto individual por proyectoId — usado en /proyectos/[id] (futuro).
 */
export async function adminGetProjectById(proyectoId: string): Promise<FirestoreProject | null> {
  const db = getAdminDb();

  // Buscar por campo proyectoId (igual que en Flutter)
  const snap = await db
    .collection(COL)
    .where("proyectoId", "==", proyectoId)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return fromAdminDoc(snap.docs[0]);
}

/**
 * Catálogos: financiadores (para resolver nombres en las cards)
 */
export async function adminGetFinanciadores(): Promise<Record<string, string>> {
  const db = getAdminDb();
  const snap = await db.collection("financiadores").get();
  const map: Record<string, string> = {};
  snap.docs.forEach((doc) => {
    const d = doc.data();
    const id = (d.financiadorId as string) ?? doc.id;
    map[id] = (d.nombre as string) ?? "";
  });
  return map;
}

/**
 * Catálogos: municipios (para resolver nombres en las cards)
 */
export async function adminGetMunicipios(): Promise<Record<string, string>> {
  const db = getAdminDb();
  const snap = await db.collection("municipios").get();
  const map: Record<string, string> = {};
  snap.docs.forEach((doc) => {
    const d = doc.data();
    const id = (d.municipioId as string) ?? doc.id;
    map[id] = (d.nombre as string) ?? "";
  });
  return map;
}

/**
 * Catálogos: tipos de proyecto (para filtros)
 */
export async function adminGetTiposProyecto(): Promise<Record<string, string>> {
  const db = getAdminDb();
  const snap = await db.collection("tipos_proyecto").get();
  const map: Record<string, string> = {};
  snap.docs.forEach((doc) => {
    const d = doc.data();
    const id = (d.tipoProyectoId as string) ?? doc.id;
    map[id] = (d.nombre as string) ?? "";
  });
  return map;
}
