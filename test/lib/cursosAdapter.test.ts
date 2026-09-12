/**
 * test/lib/cursosAdapter.test.ts
 * Tests para el adaptador FirestoreCurso → ICurso.
 * Mismo patrón que bibliotecaAdapter.test.ts.
 */

import { describe, it, expect } from "vitest";
import { adaptCurso, adaptCursos } from "@/lib/firebase/cursosAdapter";
import type { FirestoreCurso } from "@/lib/firebase/cursosService";

function makeCurso(overrides: Partial<FirestoreCurso> = {}): FirestoreCurso {
  return {
    id: "curso-001",
    nombre: "Formación de Formadores en Género",
    modulos: ["Módulo 1: Género", "Módulo 2: Metodología"],
    fechaInicio: "2025-03-01T00:00:00.000Z",
    fechaFin: "2025-05-30T00:00:00.000Z",
    cargaHoraria: 120,
    plataforma: "ZOOM",
    activo: true,
    ...overrides,
  };
}

describe("adaptCurso — mapeo de campos", () => {
  it("mapea id", () => {
    expect(adaptCurso(makeCurso({ id: "C-001" })).id).toBe("C-001");
  });

  it("mapea nombre", () => {
    expect(adaptCurso(makeCurso()).nombre).toBe("Formación de Formadores en Género");
  });

  it("mapea modulos correctamente", () => {
    const result = adaptCurso(makeCurso({ modulos: ["M1", "M2", "M3"] }));
    expect(result.modulos).toEqual(["M1", "M2", "M3"]);
  });

  it("mapea cargaHoraria", () => {
    expect(adaptCurso(makeCurso({ cargaHoraria: 80 })).cargaHoraria).toBe(80);
  });

  it("mapea plataforma", () => {
    expect(adaptCurso(makeCurso({ plataforma: "Google Meet" })).plataforma).toBe("Google Meet");
  });
});

describe("adaptCurso — formateo de fechas", () => {
  it("formatea fechaInicio a DD/MM/YYYY", () => {
    const result = adaptCurso(makeCurso({ fechaInicio: "2025-03-01T00:00:00.000Z" }));
    expect(result.fechaInicio).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(result.fechaInicio).toContain("2025");
  });

  it("formatea fechaFin a DD/MM/YYYY", () => {
    const result = adaptCurso(makeCurso({ fechaFin: "2025-05-30T00:00:00.000Z" }));
    expect(result.fechaFin).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(result.fechaFin).toContain("2025");
  });

  it("devuelve '—' para fecha inválida", () => {
    const result = adaptCurso(makeCurso({ fechaInicio: "not-a-date" }));
    expect(result.fechaInicio).toBe("—");
  });
});

describe("adaptCurso — duracionTexto", () => {
  it("calcula duración en días para cursos cortos (< 7 días)", () => {
    const inicio = "2025-01-01T00:00:00.000Z";
    const fin = "2025-01-04T00:00:00.000Z"; // 3 días
    const result = adaptCurso(makeCurso({ fechaInicio: inicio, fechaFin: fin }));
    expect(result.duracionTexto).toContain("día");
  });

  it("calcula duración en semanas (7-29 días)", () => {
    const inicio = "2025-01-01T00:00:00.000Z";
    const fin = "2025-01-15T00:00:00.000Z"; // ~2 semanas
    const result = adaptCurso(makeCurso({ fechaInicio: inicio, fechaFin: fin }));
    expect(result.duracionTexto).toContain("semana");
  });

  it("calcula duración en meses (>= 30 días)", () => {
    const inicio = "2025-01-01T00:00:00.000Z";
    const fin = "2025-04-01T00:00:00.000Z"; // ~3 meses
    const result = adaptCurso(makeCurso({ fechaInicio: inicio, fechaFin: fin }));
    expect(result.duracionTexto).toContain("mes");
  });

  it("devuelve '—' si fecha fin es anterior a inicio", () => {
    const result = adaptCurso(
      makeCurso({
        fechaInicio: "2025-05-01T00:00:00.000Z",
        fechaFin: "2025-01-01T00:00:00.000Z",
      }),
    );
    expect(result.duracionTexto).toBe("—");
  });
});

describe("adaptCurso — estaActivo", () => {
  it("es true cuando fechaFin es futura", () => {
    const finFuturo = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    expect(adaptCurso(makeCurso({ fechaFin: finFuturo })).estaActivo).toBe(true);
  });

  it("es false cuando fechaFin ya pasó", () => {
    const finPasado = "2020-01-01T00:00:00.000Z";
    expect(adaptCurso(makeCurso({ fechaFin: finPasado })).estaActivo).toBe(false);
  });
});

describe("adaptCursos — array completo", () => {
  it("adapta array vacío", () => {
    expect(adaptCursos([])).toEqual([]);
  });

  it("adapta múltiples cursos", () => {
    const cursos = [
      makeCurso({ id: "C-001", nombre: "Curso A" }),
      makeCurso({ id: "C-002", nombre: "Curso B", cargaHoraria: 40 }),
    ];
    const result = adaptCursos(cursos);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("C-001");
    expect(result[1].cargaHoraria).toBe(40);
  });
});
