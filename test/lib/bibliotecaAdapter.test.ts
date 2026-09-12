/**
 * test/lib/bibliotecaAdapter.test.ts
 * Tests para el adaptador Firestore → ILibro.
 * Mismo patrón que projectAdapter.test.ts.
 * Sin Firebase, sin DOM — lógica pura.
 */

import { describe, it, expect } from "vitest";
import { adaptLibro, adaptLibros } from "@/lib/firebase/bibliotecaAdapter";
import type { FirestoreLibro } from "@/lib/firebase/adminBibliotecaService";

// ─── Helper ───────────────────────────────────────────────────────────────────

function makeLibro(overrides: Partial<FirestoreLibro> = {}): FirestoreLibro {
  return {
    _docId: "doc-001",
    id: "LIB-MEM-2024-001",
    titulo: "Memoria SEMTA 2024",
    autor: "SEMTA",
    descripcion: "Balance anual de programas y resultados.",
    urlPdf: "https://drive.google.com/file/d/PDFID123/view",
    urlPortada: null,
    categoria: "Memoria Institucional",
    fechaPublicacion: "2024-01-15T00:00:00.000Z",
    fechaCreacion: "2024-01-15T00:00:00.000Z",
    numeroPaginas: 120,
    idioma: "Español",
    etiquetas: ["destacado", "institucional"],
    esPublico: true,
    creadoPor: "admin",
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("adaptLibro — mapeo de campos básicos", () => {
  it("mapea id correctamente (campo id tiene prioridad sobre _docId)", () => {
    const result = adaptLibro(makeLibro({ id: "LIB-001", _docId: "firestore-doc" }));
    expect(result.id).toBe("LIB-001");
  });

  it("usa _docId como fallback cuando id está vacío", () => {
    const result = adaptLibro(makeLibro({ id: "" }));
    expect(result.id).toBe("doc-001");
  });

  it("mapea titulo", () => {
    expect(adaptLibro(makeLibro()).titulo).toBe("Memoria SEMTA 2024");
  });

  it("mapea autor", () => {
    expect(adaptLibro(makeLibro()).autor).toBe("SEMTA");
  });

  it("mapea descripcion", () => {
    expect(adaptLibro(makeLibro()).descripcion).toBe("Balance anual de programas y resultados.");
  });

  it("mapea categoria", () => {
    expect(adaptLibro(makeLibro()).categoria).toBe("Memoria Institucional");
  });

  it("mapea paginas desde numeroPaginas", () => {
    expect(adaptLibro(makeLibro({ numeroPaginas: 85 })).paginas).toBe(85);
  });

  it("mapea idioma", () => {
    expect(adaptLibro(makeLibro({ idioma: "Quechua" })).idioma).toBe("Quechua");
  });

  it("mapea etiquetas correctamente", () => {
    const result = adaptLibro(makeLibro({ etiquetas: ["manual", "técnico"] }));
    expect(result.etiquetas).toEqual(["manual", "técnico"]);
  });
});

describe("adaptLibro — gestion (año de publicación)", () => {
  it("extrae el año de fechaPublicacion como string", () => {
    expect(adaptLibro(makeLibro({ fechaPublicacion: "2022-06-01T00:00:00.000Z" })).gestion).toBe(
      "2022",
    );
  });

  it("devuelve '—' para fecha inválida", () => {
    expect(adaptLibro(makeLibro({ fechaPublicacion: "invalid-date" })).gestion).toBe("—");
  });
});

describe("adaptLibro — URL de PDF (Google Drive → preview)", () => {
  it("convierte /file/d/{ID}/view → /file/d/{ID}/preview", () => {
    const result = adaptLibro(
      makeLibro({
        urlPdf: "https://drive.google.com/file/d/PDFID123/view",
      }),
    );
    expect(result.urlPdf).toBe("https://drive.google.com/file/d/PDFID123/preview");
  });

  it("convierte URL con ?id= a formato preview", () => {
    const result = adaptLibro(
      makeLibro({
        urlPdf: "https://drive.google.com/uc?id=PDFID456&export=download",
      }),
    );
    expect(result.urlPdf).toBe("https://drive.google.com/file/d/PDFID456/preview");
  });

  it("pasa URLs directas sin modificar", () => {
    const url = "https://semta.org.bo/docs/memoria.pdf";
    expect(adaptLibro(makeLibro({ urlPdf: url })).urlPdf).toBe(url);
  });

  it("devuelve string vacío para urlPdf vacío", () => {
    expect(adaptLibro(makeLibro({ urlPdf: "" })).urlPdf).toBe("");
  });
});

describe("adaptLibro — portada", () => {
  it("devuelve null cuando no hay urlPortada", () => {
    expect(adaptLibro(makeLibro({ urlPortada: null })).portada).toBeNull();
  });

  it("normaliza URL de Drive a lh3 para portada", () => {
    const result = adaptLibro(
      makeLibro({
        urlPortada: "https://drive.google.com/file/d/IMGID789/view",
      }),
    );
    expect(result.portada).toBe("https://lh3.googleusercontent.com/d/IMGID789");
  });

  it("pasa URL de lh3 directamente", () => {
    const url = "https://lh3.googleusercontent.com/aida-public/imagen";
    expect(adaptLibro(makeLibro({ urlPortada: url })).portada).toBe(url);
  });
});

describe("adaptLibro — esDestacado (etiqueta 'destacado')", () => {
  it("es true cuando etiquetas incluye 'destacado'", () => {
    expect(adaptLibro(makeLibro({ etiquetas: ["destacado", "pdf"] })).esDestacado).toBe(true);
  });

  it("es true con 'Destacado' en mayúscula (case-insensitive)", () => {
    expect(adaptLibro(makeLibro({ etiquetas: ["Destacado"] })).esDestacado).toBe(true);
  });

  it("es false cuando no tiene la etiqueta", () => {
    expect(adaptLibro(makeLibro({ etiquetas: ["manual", "técnico"] })).esDestacado).toBe(false);
  });

  it("es false cuando etiquetas está vacío", () => {
    expect(adaptLibro(makeLibro({ etiquetas: [] })).esDestacado).toBe(false);
  });
});

describe("adaptLibro — icono por categoría", () => {
  const casos: [string, string][] = [
    ["Memoria Institucional", "book"],
    ["Estados Financieros", "account_balance"],
    ["Manual Técnico", "menu_book"],
    ["Documento de Gestión", "badge"],
    ["Estudios", "analytics"],
    ["Publicaciones", "campaign"],
    ["Otro", "description"],
    ["Categoría Desconocida", "description"], // fallback
  ];

  for (const [categoria, icono] of casos) {
    it(`"${categoria}" → icono "${icono}"`, () => {
      expect(adaptLibro(makeLibro({ categoria })).icono).toBe(icono);
    });
  }
});

describe("adaptLibro — campo search (para filtros)", () => {
  it("incluye titulo en search en minúsculas", () => {
    const result = adaptLibro(makeLibro({ titulo: "Memoria SEMTA 2024" }));
    expect(result.search).toContain("memoria semta 2024");
  });

  it("incluye autor en search", () => {
    const result = adaptLibro(makeLibro({ autor: "Equipo Técnico" }));
    expect(result.search).toContain("equipo técnico");
  });

  it("incluye categoria en search", () => {
    const result = adaptLibro(makeLibro({ categoria: "Manual Técnico" }));
    expect(result.search).toContain("manual técnico");
  });

  it("incluye etiquetas en search", () => {
    const result = adaptLibro(makeLibro({ etiquetas: ["cosecha", "agua"] }));
    expect(result.search).toContain("cosecha");
    expect(result.search).toContain("agua");
  });
});

describe("adaptLibros — array completo", () => {
  it("adapta array vacío a array vacío", () => {
    expect(adaptLibros([])).toEqual([]);
  });

  it("adapta múltiples libros correctamente", () => {
    const libros = [
      makeLibro({ id: "L-001", titulo: "Libro 1" }),
      makeLibro({ id: "L-002", titulo: "Libro 2", etiquetas: ["destacado"] }),
      makeLibro({ id: "L-003", categoria: "Estudios" }),
    ];
    const result = adaptLibros(libros);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("L-001");
    expect(result[1].esDestacado).toBe(true);
    expect(result[2].icono).toBe("analytics");
  });

  it("el total adaptado es igual al de entrada", () => {
    const libros = Array.from({ length: 20 }, (_, i) =>
      makeLibro({ id: `LIB-${String(i).padStart(3, "0")}` }),
    );
    expect(adaptLibros(libros)).toHaveLength(20);
  });
});
