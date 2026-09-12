/**
 * cursosService.ts
 * Lee cursos desde Firestore usando Firebase Admin (Server Component).
 * Espejo exacto del modelo Curso en semta/lib/features/certificaciones/data/certificado.dart
 *
 * Colección Firestore: "cursos"
 * Campos: nombre, modulos[], fechaInicio, fechaFin, cargaHoraria, plataforma, activo
 *
 * La web SOLO lee (lectura pública de cursos activos).
 * La gestión completa (crear, emitir, verificar QR) la hace el sistema maestro Flutter.
 */

import { getAdminDb } from "./admin";

// ─── Tipo (espejo del modelo Dart) ───────────────────────────────────────────

export interface FirestoreCurso {
  id: string;
  nombre: string;
  modulos: string[];
  fechaInicio: string; // ISO string
  fechaFin: string;
  cargaHoraria: number;
  plataforma: string;
  activo: boolean;
}

// ─── Helper de parseo ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDoc(doc: any): FirestoreCurso {
  const d = doc.data() as Record<string, unknown>;

  // Firestore puede guardar fechas como ISO string o Timestamp
  function parseDate(raw: unknown): string {
    if (!raw) return new Date().toISOString();
    if (typeof raw === "string") return raw;
    // Firestore Admin Timestamp tiene .toDate()
    if (typeof (raw as { toDate?: () => Date }).toDate === "function") {
      return (raw as { toDate: () => Date }).toDate().toISOString();
    }
    return new Date().toISOString();
  }

  return {
    id: doc.id,
    nombre: (d.nombre as string) ?? "",
    modulos: Array.isArray(d.modulos) ? (d.modulos as string[]) : [],
    fechaInicio: parseDate(d.fechaInicio),
    fechaFin: parseDate(d.fechaFin),
    cargaHoraria: typeof d.cargaHoraria === "number" ? d.cargaHoraria : 0,
    plataforma: (d.plataforma as string) ?? "ZOOM",
    activo: typeof d.activo === "boolean" ? d.activo : true,
  };
}

// ─── Servicio ─────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los cursos ACTIVOS para mostrar en la web de marketing.
 * ISR 10 minutos — cuando se crea un curso en Flutter, la web lo muestra
 * en máximo 10 minutos sin deploy.
 */
export async function adminGetCursosActivos(): Promise<FirestoreCurso[]> {
  const db = getAdminDb();
  const snap = await db.collection("cursos").where("activo", "==", true).get();

  return snap.docs.map(fromDoc).sort((a, b) => {
    // Más recientes primero
    return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
  });
}
