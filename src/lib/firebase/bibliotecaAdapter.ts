/**
 * src/lib/firebase/bibliotecaAdapter.ts
 * Transforma documentos FirestoreLibro al formato unificado ILibro de la UI.
 */

import type { FirestoreLibro } from "./adminBibliotecaService";
import type { ILibro } from "@/types";
import { normalizeImageUrl } from "@/lib/images";

const ICONO_POR_CATEGORIA: Record<string, string> = {
  "Memoria Institucional": "book",
  "Estados Financieros": "account_balance",
  "Manual Técnico": "menu_book",
  "Documento de Gestión": "badge",
  Estudios: "analytics",
  Publicaciones: "campaign",
  Otro: "description",
};

/** /file/d/{id}/... o ?id={id} de Drive → /file/d/{id}/preview; directas intactas. */
function toPreviewUrl(url: string): string {
  if (!url) return "";
  const porPath = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  if (porPath) return `https://drive.google.com/file/d/${porPath[1]}/preview`;
  const porQuery = url.match(/drive\.google\.com\/\S*[?&]id=([^&#]+)/);
  if (porQuery) return `https://drive.google.com/file/d/${porQuery[1]}/preview`;
  return url;
}

function yearOf(fecha?: string | null): string {
  if (!fecha) return "—";
  const d = new Date(fecha);
  return Number.isNaN(d.getTime()) ? "—" : String(d.getUTCFullYear());
}

export function adaptLibro(l: FirestoreLibro): ILibro {
  const etiquetas = l.etiquetas ?? [];
  return {
    id: l.id || l._docId,
    titulo: l.titulo,
    autor: l.autor,
    descripcion: l.descripcion ?? "",
    categoria: l.categoria,
    etiquetas,
    gestion: yearOf(l.fechaPublicacion),
    paginas: l.numeroPaginas ?? 0,
    idioma: l.idioma ?? "",
    portada: l.urlPortada ? normalizeImageUrl(l.urlPortada) : null,
    urlPdf: toPreviewUrl(l.urlPdf ?? ""),
    esDestacado: etiquetas.some((e) => e.toLowerCase() === "destacado"),
    icono: ICONO_POR_CATEGORIA[l.categoria] ?? "description",
    search: `${l.titulo} ${l.autor} ${l.categoria} ${etiquetas.join(" ")}`.toLowerCase(),
  };
}

export function adaptLibros(libros: FirestoreLibro[]): ILibro[] {
  return libros.map(adaptLibro);
}
