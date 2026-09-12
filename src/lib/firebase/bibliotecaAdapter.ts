/**
 * bibliotecaAdapter.ts
 * Convierte FirestoreLibro (estructura real de Firestore/Flutter)
 * al formato ILibro que usan los componentes de la web.
 *
 * Espejo exacto del patrón de projectAdapter.ts.
 * Si cambia el esquema de Firestore, solo se actualiza aquí.
 */

import type { FirestoreLibro } from "./adminBibliotecaService";
import type { ILibro, LibroCategoria } from "@/types";
import { normalizeImageUrl } from "@/lib/images";

// ─── Mapeo de categoría → icono Material ──────────────────────────────────────

const categoriaIcono: Record<string, string> = {
  "Memoria Institucional": "book",
  "Estados Financieros": "account_balance",
  "Manual Técnico": "menu_book",
  "Documento de Gestión": "badge",
  Estudios: "analytics",
  Publicaciones: "campaign",
  Otro: "description",
};

function iconoParaCategoria(categoria: string): string {
  return categoriaIcono[categoria] ?? "description";
}

// ─── Normalización de URL de PDF (Google Drive → URL directa) ────────────────

/**
 * Convierte una URL de Google Drive al formato de visualización/descarga directa.
 * Espejo de GoogleDriveHelper.convertToPdfUrl() del Flutter.
 *
 * Input:  https://drive.google.com/file/d/{ID}/view
 * Output: https://drive.google.com/file/d/{ID}/preview
 */
function normalizePdfUrl(url: string): string {
  if (!url) return "";
  // Formato /file/d/{ID}/view → /file/d/{ID}/preview (embebible)
  const match = url.match(/\/file\/d\/([^/?]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  // URL directa de exportación: /uc?id={ID}&export=download
  const idMatch = url.match(/[?&]id=([^&#]+)/);
  if (idMatch) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }
  return url; // ya es URL directa, devolver tal cual
}

// ─── Adaptador principal ──────────────────────────────────────────────────────

/**
 * Convierte un libro de Firestore al formato ILibro de la UI.
 * Los componentes React nunca tocan FirestoreLibro directamente.
 */
export function adaptLibro(fl: FirestoreLibro): ILibro {
  const anio = new Date(fl.fechaPublicacion).getFullYear();
  const gestion = isNaN(anio) ? "—" : String(anio);

  // Portada: normalizar URL de Drive → lh3, o null si no hay
  const portada = fl.urlPortada ? normalizeImageUrl(fl.urlPortada) : null;

  // PDF: convertir Drive /view → /preview para poder abrir en navegador
  const urlPdf = normalizePdfUrl(fl.urlPdf);

  // Destacado si tiene la etiqueta "destacado" (case-insensitive)
  const esDestacado = fl.etiquetas.some((t) => t.toLowerCase() === "destacado");

  // Texto de búsqueda combinado para filtros cliente
  const search = [fl.titulo, fl.autor, fl.descripcion, fl.categoria, ...fl.etiquetas]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id: fl.id || fl._docId,
    titulo: fl.titulo,
    autor: fl.autor,
    descripcion: fl.descripcion,
    categoria: fl.categoria as LibroCategoria,
    etiquetas: fl.etiquetas,
    gestion,
    paginas: fl.numeroPaginas,
    idioma: fl.idioma,
    portada,
    urlPdf,
    esDestacado,
    icono: iconoParaCategoria(fl.categoria),
    search,
  };
}

/** Adapta un array completo de libros Firestore */
export function adaptLibros(libros: FirestoreLibro[]): ILibro[] {
  return libros.map(adaptLibro);
}
