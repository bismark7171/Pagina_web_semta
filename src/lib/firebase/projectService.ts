/**
 * projectService.ts
 * Capa de acceso a datos para la colección "proyectos" de Firestore.
 * Espejo del project_service.dart de la app Flutter de SEMTA.
 *
 * Colección Firestore: "proyectos"
 * Campos clave: proyectoId, nombre, tipoProyectoId, municipioIds,
 *               comunidadIds, anio, descripcion, objetivo, beneficiarios,
 *               presupuesto, financiadorId, estado, imageUrls
 */

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface FirestoreProject {
  /** ID lógico del proyecto (ej: "CAJ-001"). Campo guardado dentro del documento. */
  proyectoId: string;
  nombre: string;
  tipoProyectoId: string;
  municipioIds: string[];
  comunidadIds: string[];
  anio: number;
  descripcion: string;
  objetivo: string;
  beneficiarios: string;
  presupuesto: number;
  moneda: string;
  financiadorId: string;
  /** PLANIFICADO | EN_EJECUCION | CONCLUIDO | SUSPENDIDO | CANCELADO */
  estado: string;
  resultados: string;
  leccionesAprendidas: string;
  presupuestoPorAnio: Record<string, number>;
  imageUrls: string[];
  /** Firestore document ID (auto-generado) */
  _docId?: string;
}

// ─── Constante de colección ───────────────────────────────────────────────────

const COL = "proyectos";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Parsea un documento Firestore a FirestoreProject de forma segura */
function fromDoc(docSnap: { id: string; data: () => Record<string, unknown> }): FirestoreProject {
  const d = docSnap.data();
  return {
    proyectoId:          (d.proyectoId  as string)  ?? docSnap.id,
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
    _docId:              docSnap.id,
  };
}

// ─── Servicio ─────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los proyectos públicos.
 * Equivalente a ProjectService.getAllProjects() en Flutter.
 */
export async function getAllProjects(opts?: { maxItems?: number }): Promise<FirestoreProject[]> {
  const constraints: QueryConstraint[] = [];
  if (opts?.maxItems) constraints.push(limit(opts.maxItems));

  const snap = await getDocs(query(collection(db, COL), ...constraints));
  return snap.docs.map(fromDoc);
}

/**
 * Obtiene un proyecto por su proyectoId lógico (ej: "CAJ-001").
 * Equivalente a ProjectService.getProjectById() en Flutter.
 */
export async function getProjectById(proyectoId: string): Promise<FirestoreProject | null> {
  // Primero intentar por ID de documento directo
  const directSnap = await getDoc(doc(db, COL, proyectoId));
  if (directSnap.exists()) return fromDoc(directSnap);

  // Si no, buscar por campo proyectoId
  const q = query(collection(db, COL), where("proyectoId", "==", proyectoId), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return fromDoc(snap.docs[0]);
}

/**
 * Obtiene proyectos filtrados por municipio.
 * Equivalente a ProjectService.getProjectsByMunicipality() en Flutter.
 */
export async function getProjectsByMunicipality(municipioId: string): Promise<FirestoreProject[]> {
  const q = query(collection(db, COL), where("municipioIds", "array-contains", municipioId));
  const snap = await getDocs(q);
  return snap.docs.map(fromDoc);
}

/**
 * Obtiene proyectos filtrados por tipo.
 * Equivalente a ProjectService.getProjectsByType() en Flutter.
 */
export async function getProjectsByType(tipoId: string): Promise<FirestoreProject[]> {
  const q = query(collection(db, COL), where("tipoProyectoId", "==", tipoId));
  const snap = await getDocs(q);
  return snap.docs.map(fromDoc);
}

/**
 * Obtiene proyectos filtrados por estado.
 * Ej: "CONCLUIDO" | "EN_EJECUCION" | "PLANIFICADO"
 */
export async function getProjectsByEstado(estado: string): Promise<FirestoreProject[]> {
  const q = query(collection(db, COL), where("estado", "==", estado));
  const snap = await getDocs(q);
  return snap.docs.map(fromDoc);
}

/**
 * Obtiene proyectos filtrados por año.
 * Equivalente a ProjectService.getProjectsByYear() en Flutter.
 */
export async function getProjectsByYear(anio: number): Promise<FirestoreProject[]> {
  const q = query(collection(db, COL), where("anio", "==", anio));
  const snap = await getDocs(q);
  return snap.docs.map(fromDoc);
}
