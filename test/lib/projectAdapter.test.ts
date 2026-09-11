/**
 * test/lib/projectAdapter.test.ts
 * Tests para el adaptador Firestore → IProject.
 * Sin Firebase, sin DOM — lógica pura.
 *
 * Espejo del patrón en semta/test/models/project_test.dart
 */

import { describe, it, expect } from "vitest";
import { adaptProject, adaptProjects } from "@/lib/firebase/projectAdapter";
import { FALLBACK_IMAGE } from "@/lib/images";
import type { FirestoreProject } from "@/lib/firebase/projectService";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeFirestoreProject(overrides: Partial<FirestoreProject> = {}): FirestoreProject {
  return {
    proyectoId: "TEST-001",
    nombre: "Cosecha de Agua en Batallas",
    tipoProyectoId: "agua-y-riego",
    municipioIds: ["batallas"],
    comunidadIds: ["comunidad-a"],
    anio: 2023,
    descripcion: "Construcción de atajados comunales",
    objetivo: "Mejorar el acceso al agua",
    beneficiarios: "420 Familias",
    presupuesto: 150000,
    moneda: "Bs",
    financiadorId: "cosude",
    estado: "CONCLUIDO",
    resultados: "Se construyeron 4 atajados",
    leccionesAprendidas: "Participación comunitaria clave",
    presupuestoPorAnio: {},
    imageUrls: [],
    ...overrides,
  };
}

const municipiosMap: Record<string, string> = { batallas: "Batallas", achacachi: "Achacachi" };
const financiadoresMap: Record<string, string> = {
  cosude: "COSUDE",
  "pan-para-el-mundo": "Pan para el Mundo",
};
const tiposMap: Record<string, string> = {
  "agua-y-riego": "Agua y Riego",
  agroecologia: "Agroecología",
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("adaptProject — mapeo de campos", () => {
  it("mapea proyectoId → id", () => {
    const result = adaptProject(makeFirestoreProject());
    expect(result.id).toBe("TEST-001");
  });

  it("mapea nombre → titulo", () => {
    const result = adaptProject(makeFirestoreProject());
    expect(result.titulo).toBe("Cosecha de Agua en Batallas");
  });

  it("resuelve nombre de municipio con el mapa", () => {
    const result = adaptProject(makeFirestoreProject(), municipiosMap);
    expect(result.municipio).toBe("Batallas");
  });

  it("usa el municipioId cuando no está en el mapa", () => {
    const fp = makeFirestoreProject({ municipioIds: ["quime"] });
    const result = adaptProject(fp, municipiosMap);
    expect(result.municipio).toBe("quime");
  });

  it("usa 'Bolivia' cuando municipioIds está vacío", () => {
    const fp = makeFirestoreProject({ municipioIds: [] });
    const result = adaptProject(fp);
    expect(result.municipio).toBe("Bolivia");
  });

  it("resuelve nombre del financiador con el mapa", () => {
    const result = adaptProject(makeFirestoreProject(), {}, financiadoresMap);
    expect(result.financiador).toBe("COSUDE");
  });

  it("mapea anio → gestion como string", () => {
    const result = adaptProject(makeFirestoreProject({ anio: 2025 }));
    expect(result.gestion).toBe("2025");
  });
});

describe("adaptProject — mapeo de estados", () => {
  const casos: Array<[string, string]> = [
    ["CONCLUIDO", "Concluido"],
    ["EN_EJECUCION", "En Ejecución"],
    ["PLANIFICADO", "Planificado"],
    ["SUSPENDIDO", "Suspendido"],
    ["CANCELADO", "Cancelado"],
  ];

  for (const [firestoreEstado, uiEstado] of casos) {
    it(`estado Firestore "${firestoreEstado}" → UI "${uiEstado}"`, () => {
      const fp = makeFirestoreProject({ estado: firestoreEstado });
      const result = adaptProject(fp);
      expect(result.estado).toBe(uiEstado);
    });
  }

  it("estado desconocido → 'Planificado' como fallback", () => {
    const fp = makeFirestoreProject({ estado: "DESCONOCIDO" });
    const result = adaptProject(fp);
    expect(result.estado).toBe("Planificado");
  });
});

describe("adaptProject — mapeo de tipos", () => {
  const casos: Array<[string, string]> = [
    ["agua-y-riego", "Agua y Riego"],
    ["agroecologia", "Agroecología"],
    ["bofedales", "Manejo de Bofedales"],
    ["mujeres", "Liderazgo de Mujeres"],
    ["tecnologias", "Tecnologías Solares"],
  ];

  for (const [tipoId, tipoUi] of casos) {
    it(`tipoProyectoId "${tipoId}" → "${tipoUi}"`, () => {
      const fp = makeFirestoreProject({ tipoProyectoId: tipoId });
      const result = adaptProject(fp);
      expect(result.tipo).toBe(tipoUi);
    });
  }

  it("tipo desconocido → 'Agua y Riego' como fallback", () => {
    const fp = makeFirestoreProject({ tipoProyectoId: "desconocido" });
    const result = adaptProject(fp);
    expect(result.tipo).toBe("Agua y Riego");
  });
});

describe("adaptProject — imágenes", () => {
  it("normaliza URL de Google Drive a lh3", () => {
    const fp = makeFirestoreProject({
      imageUrls: ["https://drive.google.com/file/d/IMGID123/view"],
    });
    const result = adaptProject(fp);
    expect(result.imagen).toBe("https://lh3.googleusercontent.com/d/IMGID123");
  });

  it("pasa sin cambios URL de lh3 permitida", () => {
    const url = "https://lh3.googleusercontent.com/aida-public/imagen";
    const fp = makeFirestoreProject({ imageUrls: [url] });
    const result = adaptProject(fp);
    expect(result.imagen).toBe(url);
  });

  it("usa FALLBACK cuando imageUrls está vacío", () => {
    const fp = makeFirestoreProject({ imageUrls: [] });
    const result = adaptProject(fp);
    expect(result.imagen).toBe(FALLBACK_IMAGE);
  });

  it("usa FALLBACK cuando imageUrls es undefined", () => {
    const fp = makeFirestoreProject({ imageUrls: undefined as unknown as string[] });
    const result = adaptProject(fp);
    expect(result.imagen).toBe(FALLBACK_IMAGE);
  });

  it("usa solo la primera imagen del array", () => {
    const url1 = "https://lh3.googleusercontent.com/primera";
    const url2 = "https://lh3.googleusercontent.com/segunda";
    const fp = makeFirestoreProject({ imageUrls: [url1, url2] });
    const result = adaptProject(fp);
    expect(result.imagen).toBe(url1);
  });
});

describe("adaptProject — campo search (para filtros cliente)", () => {
  it("incluye el nombre en search en minúsculas", () => {
    const fp = makeFirestoreProject({ nombre: "Proyecto SEMTA Batallas" });
    const result = adaptProject(fp, municipiosMap, financiadoresMap, tiposMap);
    expect(result.search).toContain("proyecto semta batallas");
  });

  it("incluye el nombre del municipio en search", () => {
    const result = adaptProject(makeFirestoreProject(), municipiosMap);
    expect(result.search).toContain("batallas");
  });

  it("incluye el proyectoId en search", () => {
    const result = adaptProject(makeFirestoreProject());
    expect(result.search).toContain("test-001");
  });
});

describe("adaptProjects — array completo", () => {
  it("adapta un array vacío a array vacío", () => {
    expect(adaptProjects([])).toEqual([]);
  });

  it("adapta múltiples proyectos correctamente", () => {
    const fps = [
      makeFirestoreProject({ proyectoId: "P-001" }),
      makeFirestoreProject({ proyectoId: "P-002", estado: "EN_EJECUCION" }),
      makeFirestoreProject({ proyectoId: "P-003", municipioIds: ["achacachi"] }),
    ];
    const result = adaptProjects(fps, municipiosMap, financiadoresMap, tiposMap);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("P-001");
    expect(result[1].estado).toBe("En Ejecución");
    expect(result[2].municipio).toBe("Achacachi");
  });

  it("el número de proyectos adaptados es igual al de entrada", () => {
    const fps = Array.from({ length: 53 }, (_, i) =>
      makeFirestoreProject({ proyectoId: `PRJ-${String(i).padStart(3, "0")}` }),
    );
    const result = adaptProjects(fps);
    expect(result).toHaveLength(53);
  });
});

describe("adaptProject — integridad de datos reales de Firestore", () => {
  // Proyectos representativos de la BD real de SEMTA
  const proyectosReales: FirestoreProject[] = [
    {
      proyectoId: "PRJ-2023-01",
      nombre: "Cosecha de Agua y Microriego en 4 Comunidades de Batallas",
      tipoProyectoId: "agua-y-riego",
      municipioIds: ["batallas"],
      comunidadIds: [],
      anio: 2022,
      descripcion:
        "Construcción de atajados comunales, instalación de 32 km de tubería para aspersión.",
      objetivo: "Mejorar seguridad hídrica de 420 familias",
      beneficiarios: "420 Familias Originarias",
      presupuesto: 250000,
      moneda: "Bs",
      financiadorId: "cosude",
      estado: "CONCLUIDO",
      resultados: "4 atajados construidos",
      leccionesAprendidas: "Participación comunitaria",
      presupuestoPorAnio: {},
      imageUrls: ["https://lh3.googleusercontent.com/aida-public/imagen_batallas"],
    },
    {
      proyectoId: "PRJ-2024-04",
      nombre: "Transición Agroecológica y Bioinsumos en Tierras Altas",
      tipoProyectoId: "agroecologia",
      municipioIds: ["achacachi"],
      comunidadIds: ["comunidad-b"],
      anio: 2024,
      descripcion: "Montaje de 6 biofábricas comunitarias.",
      objetivo: "Reducir agroquímicos en 80%",
      beneficiarios: "650 Productores Orgánicos",
      presupuesto: 0,
      moneda: "Bs",
      financiadorId: "union-europea",
      estado: "EN_EJECUCION",
      resultados: "",
      leccionesAprendidas: "",
      presupuestoPorAnio: {},
      imageUrls: [],
    },
  ];

  for (const fp of proyectosReales) {
    it(`${fp.proyectoId}: adaptProject no lanza errores`, () => {
      expect(() => adaptProject(fp, municipiosMap, financiadoresMap, tiposMap)).not.toThrow();
    });

    it(`${fp.proyectoId}: id y titulo no están vacíos`, () => {
      const result = adaptProject(fp, municipiosMap, financiadoresMap, tiposMap);
      expect(result.id).toBeTruthy();
      expect(result.titulo).toBeTruthy();
    });

    it(`${fp.proyectoId}: ubicacion contiene Bolivia`, () => {
      const result = adaptProject(fp, municipiosMap, financiadoresMap, tiposMap);
      expect(result.ubicacion).toContain("Bolivia");
    });
  }
});
