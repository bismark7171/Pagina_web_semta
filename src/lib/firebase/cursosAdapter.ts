/**
 * src/lib/firebase/cursosAdapter.ts
 * Transforma FirestoreCurso (crudo) a ICurso para la UI:
 * fechas a DD/MM/YYYY, duración calculada y estado activo derivado.
 */

import type { FirestoreCurso } from "./cursosService";
import type { ICurso } from "@/types";

function formatFecha(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

function calcularDuracion(inicio?: string, fin?: string): string {
  const a = inicio ? new Date(inicio) : null;
  const b = fin ? new Date(fin) : null;
  if (!a || !b || Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return "—";
  const dias = Math.round((b.getTime() - a.getTime()) / 86400000);
  if (dias < 0) return "—";
  if (dias < 7) return dias === 1 ? "1 día" : `${dias} días`;
  if (dias < 30) {
    const s = Math.max(1, Math.round(dias / 7));
    return s === 1 ? "1 semana" : `${s} semanas`;
  }
  const m = Math.max(1, Math.round(dias / 30));
  return m === 1 ? "1 mes" : `${m} meses`;
}

export function adaptCurso(c: FirestoreCurso): ICurso {
  const fin = c.fechaFin ? new Date(c.fechaFin) : null;
  const finValida = fin && !Number.isNaN(fin.getTime()) ? fin : null;
  return {
    id: c.id || c._docId || "",
    nombre: c.nombre || "",
    descripcion: c.descripcion ?? "",
    modulos: c.modulos ?? [],
    fechaInicio: formatFecha(c.fechaInicio),
    fechaFin: formatFecha(c.fechaFin),
    cargaHoraria: c.cargaHoraria ?? 0,
    plataforma: c.plataforma ?? "",
    modalidad: "Presencial",
    ctaTexto: "Inscribirme al curso",
    duracionTexto: calcularDuracion(c.fechaInicio, c.fechaFin),
    estaActivo: finValida ? finValida.getTime() > Date.now() : false,
  };
}

export function adaptCursos(cursos: FirestoreCurso[]): ICurso[] {
  return cursos.map(adaptCurso);
}
