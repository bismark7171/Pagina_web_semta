/**
 * adminBibliotecaService.ts
 * Lee libros desde Firestore usando Firebase Admin (servidor).
 * Espejo exacto de adminProjectService.ts.
 *
 * Colección Firestore: "libros"
 * Campos espejo de semta/lib/features/biblioteca/data/libro.dart:
 *   titulo, autor, descripcion, urlPdf, urlPortada, categoria,
 *   fechaPublicacion, fechaCreacion, numeroPaginas, idioma,
 *   etiquetas, esPublico, creadoPor
 *
 * Solo lee documentos con esPublico === true.
 * La gestión completa (crear, editar, eliminar) la hace el sistema maestro Flutter.
 */

import { getAdminDb } from "./admin";

const COL = "libros";

// ─── Tipo Firestore (espejo del modelo Dart) ──────────────────────────────────

export interface FirestoreLibro {
  /** Documento ID de Firestore — también guardado como campo 'id' */
  _docId: string;
  id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  urlPdf: string;
  urlPortada: string | null;
  categoria: string;
  fechaPublicacion: string; // ISO string
  fechaCreacion: string; // ISO string
  numeroPaginas: number;
  idioma: string;
  etiquetas: string[];
  esPublico: boolean;
  creadoPor: string;
}

// ─── Helper de parseo ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromAdminDoc(doc: any): FirestoreLibro {
  const d = doc.data() as Record<string, unknown>;

  function parseDate(raw: unknown): string {
    if (!raw) return new Date().toISOString();
    if (typeof raw === "string") return raw;
    if (typeof (raw as { toDate?: () => Date }).toDate === "function") {
      return (raw as { toDate: () => Date }).toDate().toISOString();
    }
    return new Date().toISOString();
  }

  return {
    _docId: doc.id,
    id: (d.id as string) ?? doc.id,
    titulo: (d.titulo as string) ?? "",
    autor: (d.autor as string) ?? "",
    descripcion: (d.descripcion as string) ?? "",
    urlPdf: (d.urlPdf as string) ?? "",
    urlPortada: (d.urlPortada as string | null) ?? null,
    categoria: (d.categoria as string) ?? "Otro",
    fechaPublicacion: parseDate(d.fechaPublicacion),
    fechaCreacion: parseDate(d.fechaCreacion),
    numeroPaginas:
      typeof d.numeroPaginas === "number" ? d.numeroPaginas : Number(d.numeroPaginas) || 0,
    idioma: (d.idioma as string) ?? "Español",
    etiquetas: Array.isArray(d.etiquetas) ? (d.etiquetas as string[]) : [],
    esPublico: typeof d.esPublico === "boolean" ? d.esPublico : true,
    creadoPor: (d.creadoPor as string) ?? "",
  };
}

// ─── Servicios públicos (solo lectura) ───────────────────────────────────────

/**
 * Todos los libros públicos ordenados por fecha de creación descendente.
 * Equivalente a BibliotecaService.getLibrosPublicos() del Flutter.
 */
export async function adminGetLibrosPublicos(): Promise<FirestoreLibro[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COL)
    .where("esPublico", "==", true)
    .orderBy("fechaCreacion", "desc")
    .get();
  return snap.docs.map(fromAdminDoc);
}

/**
 * Libros filtrados por categoría.
 * Equivalente a BibliotecaService.getLibrosPorCategoria() del Flutter.
 */
export async function adminGetLibrosPorCategoria(categoria: string): Promise<FirestoreLibro[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(COL)
    .where("esPublico", "==", true)
    .where("categoria", "==", categoria)
    .orderBy("fechaCreacion", "desc")
    .get();
  return snap.docs.map(fromAdminDoc);
}
