/**
 * src/lib/firebase/adminProjectService.ts
 * Lee proyectos, municipios, financiadores y tipos desde Firestore usando Firebase Admin (servidor).
 */

import { getAdminDb } from "./admin";
import type { FirestoreProject } from "@/types";

const COL_PROYECTOS = "proyectos";
const COL_MUNICIPIOS = "municipios";
const COL_FINANCIADORES = "financiadores";
const COL_TIPOS = "tipos_proyecto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromAdminProjectDoc(doc: any): FirestoreProject {
  const d = doc.data() as Record<string, unknown>;
  return {
    _docId: doc.id,
    id: (d.id as string) ?? doc.id,
    titulo: (d.titulo as string) ?? (d.nombre as string) ?? "",
    descripcion: (d.descripcion as string) ?? "",
    estado: (d.estado as "Concluido" | "En Ejecución" | "Planificado") ?? "En Ejecución",
    tipoId: (d.tipoId as string) ?? (d.tipo as string) ?? "",
    municipioIds: Array.isArray(d.municipioIds)
      ? (d.municipioIds as string[])
      : d.municipio
        ? [String(d.municipio)]
        : [],
    financiadorId: (d.financiadorId as string) ?? (d.financiador as string) ?? "",
    beneficiarios: (d.beneficiarios as string) ?? "",
    gestion: (d.gestion as string) ?? (d.anio as string) ?? new Date().getFullYear().toString(),
    ubicacion: (d.ubicacion as string) ?? "",
    imagenUrl: (d.imagenUrl as string) ?? (d.imagen as string) ?? "",
    codigo: (d.codigo as string) ?? `ID: ${doc.id}`,
    esPublico: typeof d.esPublico === "boolean" ? d.esPublico : true,
  };
}

export async function adminGetAllProjects(): Promise<FirestoreProject[]> {
  const db = getAdminDb();
  let snap;
  try {
    snap = await db.collection(COL_PROYECTOS).where("esPublico", "==", true).get();
  } catch (err) {
    console.warn("[adminProjectService] Fallback general:", err);
    snap = await db.collection(COL_PROYECTOS).get();
  }
  if (snap.empty) {
    snap = await db.collection(COL_PROYECTOS).get();
  }
  return snap.docs.map(fromAdminProjectDoc);
}

export async function adminGetMunicipios(): Promise<Record<string, string>> {
  try {
    const db = getAdminDb();
    const snap = await db.collection(COL_MUNICIPIOS).get();
    const map: Record<string, string> = {};
    snap.docs.forEach((doc) => {
      const d = doc.data();
      map[doc.id] = (d.nombre as string) ?? doc.id;
    });
    return map;
  } catch {
    return {};
  }
}

export async function adminGetFinanciadores(): Promise<Record<string, string>> {
  try {
    const db = getAdminDb();
    const snap = await db.collection(COL_FINANCIADORES).get();
    const map: Record<string, string> = {};
    snap.docs.forEach((doc) => {
      const d = doc.data();
      map[doc.id] = (d.nombre as string) ?? doc.id;
    });
    return map;
  } catch {
    return {};
  }
}

export async function adminGetTiposProyecto(): Promise<Record<string, string>> {
  try {
    const db = getAdminDb();
    const snap = await db.collection(COL_TIPOS).get();
    const map: Record<string, string> = {};
    snap.docs.forEach((doc) => {
      const d = doc.data();
      map[doc.id] = (d.nombre as string) ?? doc.id;
    });
    return map;
  } catch {
    return {};
  }
}
