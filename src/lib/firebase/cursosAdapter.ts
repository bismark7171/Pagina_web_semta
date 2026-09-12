/**
 * cursosAdapter.ts
 * Convierte FirestoreCurso → ICurso (formato UI).
 * Espejo del patrón projectAdapter / bibliotecaAdapter.
 *
 * Los componentes React nunca tocan FirestoreCurso directamente.
 */

import type { FirestoreCurso } from "./cursosService";
import type { ICurso } from "@/types";

// ─── Helpers de fecha ─────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/**
 * Calcula texto de duración entre dos fechas.
 * Ej: "3 semanas", "2 meses", "6 días"
 */
function calcularDuracion(inicio: string, fin: string): string {
  try {
    const ms = new Date(fin).getTime() - new Date(inicio).getTime();
    if (isNaN(ms) || ms <= 0) return "—";
    const dias = Math.round(ms / (1000 * 60 * 60 * 24));
    if (dias < 7) return `${dias} día${dias !== 1 ? "s" : ""}`;
    if (dias < 30) {
      const semanas = Math.round(dias / 7);
      return `${semanas} semana${semanas !== 1 ? "s" : ""}`;
    }
    const meses = Math.round(dias / 30);
    return `${meses} mes${meses !== 1 ? "es" : ""}`;
  } catch {
    return "—";
  }
}

// ─── Adaptador ────────────────────────────────────────────────────────────────

export function adaptCurso(fc: FirestoreCurso): ICurso {
  const ahora = Date.now();
  const estaActivo = new Date(fc.fechaFin).getTime() >= ahora;

  return {
    id: fc.id,
    nombre: fc.nombre,
    modulos: fc.modulos,
    fechaInicio: formatDate(fc.fechaInicio),
    fechaFin: formatDate(fc.fechaFin),
    cargaHoraria: fc.cargaHoraria,
    plataforma: fc.plataforma,
    duracionTexto: calcularDuracion(fc.fechaInicio, fc.fechaFin),
    estaActivo,
  };
}

export function adaptCursos(cursos: FirestoreCurso[]): ICurso[] {
  return cursos.map(adaptCurso);
}
