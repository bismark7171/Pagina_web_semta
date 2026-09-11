/**
 * test/components/ProjectCard.test.tsx
 * Tests de componente para ProjectCard.
 * Sin Firebase — usa datos mock directamente.
 *
 * Espejo de semta/test/widgets/project_card_test.dart
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { IProject } from "@/types";

// ─── Helper: proyecto de prueba ───────────────────────────────────────────────

function makeProject(overrides: Partial<IProject> = {}): IProject {
  return {
    id: "PRJ-2023-01",
    titulo: "Cosecha de Agua y Microriego en Batallas",
    descripcion: "Construcción de atajados comunales y 32 km de tubería para aspersión.",
    estado: "Concluido",
    tipo: "Agua y Riego",
    municipio: "Batallas",
    financiador: "COSUDE",
    cooperante: "Agencia Suiza para el Desarrollo (COSUDE)",
    beneficiarios: "420 Familias Originarias",
    gestion: "2022 - 2024",
    ubicacion: "Batallas, La Paz",
    imagen: "https://lh3.googleusercontent.com/aida-public/test-imagen",
    alt: "Proyecto de cosecha de agua en Batallas",
    codigo: "ID: PRJ-2023-01",
    boton: "Ficha Técnica",
    search: "cosecha agua microriego batallas cosude",
    ...overrides,
  };
}

// Mock para onOpen
const noop = () => {};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("ProjectCard — renderizado básico", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<ProjectCard project={makeProject()} onOpen={noop} />);
    expect(container).toBeTruthy();
  });

  it("muestra el título del proyecto", () => {
    render(<ProjectCard project={makeProject()} onOpen={noop} />);
    expect(screen.getByText(/Cosecha de Agua y Microriego en Batallas/i)).toBeInTheDocument();
  });

  it("muestra el municipio y la gestión", () => {
    render(<ProjectCard project={makeProject()} onOpen={noop} />);
    // El párrafo de metadata contiene "Batallas · 2022 - 2024"
    // Usamos getAllByText porque "Batallas" también aparece en el título
    expect(screen.getAllByText(/Batallas/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/2022 - 2024/i)).toBeInTheDocument();
  });

  it("muestra los beneficiarios", () => {
    render(<ProjectCard project={makeProject()} onOpen={noop} />);
    expect(screen.getByText(/420 Familias Originarias/i)).toBeInTheDocument();
  });

  it("muestra el texto del botón", () => {
    render(<ProjectCard project={makeProject()} onOpen={noop} />);
    expect(screen.getByRole("button", { name: /Ficha Técnica/i })).toBeInTheDocument();
  });

  it("el botón llama a onOpen al hacer click", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<ProjectCard project={makeProject()} onOpen={onOpen} />);
    await user.click(screen.getByRole("button", { name: /Ficha Técnica/i }));
    expect(onOpen).toHaveBeenCalledOnce();
  });
});

describe("ProjectCard — estados visuales (chip de estado)", () => {
  const estados: Array<IProject["estado"]> = [
    "Concluido",
    "En Ejecución",
    "Planificado",
    "Suspendido",
    "Cancelado",
  ];

  for (const estado of estados) {
    it(`muestra chip de estado "${estado}"`, () => {
      render(<ProjectCard project={makeProject({ estado })} onOpen={noop} />);
      expect(screen.getByText(estado)).toBeInTheDocument();
    });
  }
});

describe("ProjectCard — imagen con fallback", () => {
  it("muestra la imagen del proyecto", () => {
    const imagen = "https://lh3.googleusercontent.com/aida-public/test-img";
    render(<ProjectCard project={makeProject({ imagen })} onOpen={noop} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", imagen);
  });

  it("usa el alt correcto en la imagen", () => {
    render(<ProjectCard project={makeProject()} onOpen={noop} />);
    expect(screen.getByAltText(/Proyecto de cosecha de agua en Batallas/i)).toBeInTheDocument();
  });
});

describe("ProjectCard — proyectos reales de la BD SEMTA", () => {
  const proyectosReales: IProject[] = [
    makeProject({
      id: "PRJ-2023-01",
      titulo: "Cosecha de Agua y Microriego en 4 Comunidades de Batallas",
      estado: "Concluido",
      tipo: "Agua y Riego",
      municipio: "Batallas",
      beneficiarios: "420 Familias Originarias",
    }),
    makeProject({
      id: "PRJ-2024-04",
      titulo: "Transición Agroecológica y Bioinsumos en Tierras Altas",
      estado: "En Ejecución",
      tipo: "Agroecología",
      municipio: "Achacachi",
      beneficiarios: "650 Productores Orgánicos",
    }),
    makeProject({
      id: "PRJ-2025-02",
      titulo: "Bombeo Solar Fotovoltaico para Pozos Profundos",
      estado: "Planificado",
      tipo: "Tecnologías Solares",
      municipio: "Patacamaya",
      beneficiarios: "310 Familias Rurales",
    }),
    makeProject({
      id: "PRJ-2024-11",
      titulo: "Autonomía Económica y Liderazgo de Mujeres Bartolina Sisa",
      estado: "En Ejecución",
      tipo: "Liderazgo de Mujeres",
      municipio: "Tiwanaku",
      beneficiarios: "280 Mujeres Lideresas",
    }),
    makeProject({
      id: "PRJ-2023-09",
      titulo: "Restauración de Humedales Altoandinos y Forrajes",
      estado: "Concluido",
      tipo: "Manejo de Bofedales",
      municipio: "Colomi",
      beneficiarios: "510 Familias Ganaderas",
    }),
  ];

  for (const proyecto of proyectosReales) {
    it(`${proyecto.id}: se renderiza sin errores`, () => {
      const { container } = render(<ProjectCard project={proyecto} onOpen={noop} />);
      expect(container).toBeTruthy();
    });

    it(`${proyecto.id}: muestra el título`, () => {
      render(<ProjectCard project={proyecto} onOpen={noop} />);
      // Busca al menos las primeras palabras del título
      const palabras = proyecto.titulo.split(" ").slice(0, 3).join(" ");
      expect(screen.getByText(new RegExp(palabras, "i"))).toBeInTheDocument();
    });

    it(`${proyecto.id}: muestra el estado`, () => {
      render(<ProjectCard project={proyecto} onOpen={noop} />);
      expect(screen.getByText(proyecto.estado)).toBeInTheDocument();
    });
  }
});

describe("ProjectCard — títulos muy largos (anti-overflow)", () => {
  it("renderiza sin errores con título muy largo", () => {
    const titulo =
      "PROGRAMA DE DESARROLLO TERRITORIAL LICOMA CAJUATA COMPONENTE " +
      "EDUCACION COMPONENTE SALUD COMPONENTE ECONOMIA LOCAL COMPONENTE " +
      "EMPODERAMIENTO NEGOCIACION Y CIUDADANIA";
    const { container } = render(<ProjectCard project={makeProject({ titulo })} onOpen={noop} />);
    expect(container).toBeTruthy();
  });
});
