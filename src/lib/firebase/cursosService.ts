/**
 * src/lib/firebase/cursosService.ts
 * Lee cursos desde Firestore usando Firebase Admin (servidor).
 */

import { getAdminDb } from "./admin";

const COL_CURSOS = "cursos";

/** Curso crudo de Firestore — los derivados (duración, estado, fechas) los calcula el adapter. */
export interface FirestoreCurso {
  _docId?: string;
  id: string;
  nombre: string;
  descripcion?: string;
  modulos?: Array<string | { titulo: string; detalle?: string }>;
  fechaInicio?: string; // ISO
  fechaFin?: string; // ISO
  cargaHoraria?: number;
  plataforma?: string;
  activo?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromAdminCursoDoc(doc: any): FirestoreCurso {
  const d = doc.data() as Record<string, unknown>;
  return {
    _docId: doc.id,
    id: (d.id as string) ?? doc.id,
    nombre: (d.nombre as string) ?? (d.titulo as string) ?? "",
    descripcion: (d.descripcion as string) ?? "",
    modulos: Array.isArray(d.modulos)
      ? (d.modulos as Array<string | { titulo: string; detalle?: string }>)
      : [],
    fechaInicio: (d.fechaInicio as string) ?? "",
    fechaFin: (d.fechaFin as string) ?? "",
    cargaHoraria: typeof d.cargaHoraria === "number" ? d.cargaHoraria : 40,
    plataforma: (d.plataforma as string) ?? "",
    activo:
      typeof d.activo === "boolean"
        ? d.activo
        : typeof d.estaActivo === "boolean"
          ? d.estaActivo
          : true,
  };
}

export async function adminGetCursosActivos(): Promise<FirestoreCurso[]> {
  const db = getAdminDb();
  let snap;
  try {
    snap = await db.collection(COL_CURSOS).get();
  } catch (err) {
    console.warn("[cursosService] Error al consultar cursos:", err);
    return [];
  }
  return snap.docs.map(fromAdminCursoDoc);
}
