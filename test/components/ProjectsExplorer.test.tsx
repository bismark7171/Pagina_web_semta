/**
 * test/components/ProjectsExplorer.test.tsx
 * Tests de integración para ProjectsExplorer (filtros + grid de cards).
 * Sin Firebase — datos mock directamente.
 *
 * Espejo de semta/test/services/project_provider_logic_test.dart
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import type { IProject } from "@/types";

// Mock de framer-motion: desactiva animaciones en tests para que
// AnimatePresence retire los elementos del DOM inmediatamente.
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      layout: _layout,
      initial: _i,
      animate: _a,
      exit: _e,
      transition: _t,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode;
      layout?: boolean;
      initial?: unknown;
      animate?: unknown;
      exit?: unknown;
      transition?: unknown;
    }) => React.createElement("div", props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// ─── Dataset de prueba ────────────────────────────────────────────────────────

const proyectosMock: IProject[] = [
  {
    id: "P-001",
    titulo: "Cosecha de Agua en Batallas",
    descripcion: "Atajados y microriego.",
    estado: "Concluido",
    tipo: "Agua y Riego",
    municipio: "Batallas",
    financiador: "COSUDE",
    cooperante: "COSUDE",
    beneficiarios: "420 Familias",
    gestion: "2022",
    ubicacion: "Batallas, La Paz",
    imagen: "https://lh3.googleusercontent.com/p1",
    alt: "img1",
    codigo: "ID: P-001",
    boton: "Ficha Técnica",
    search: "cosecha agua batallas cosude concluido",
  },
  {
    id: "P-002",
    titulo: "Bioinsumos Agroecológicos Achacachi",
    descripcion: "Biofábricas comunitarias.",
    estado: "En Ejecución",
    tipo: "Agroecología",
    municipio: "Achacachi",
    financiador: "UE",
    cooperante: "UE",
    beneficiarios: "650 Productores",
    gestion: "2024",
    ubicacion: "Achacachi, La Paz",
    imagen: "https://lh3.googleusercontent.com/p2",
    alt: "img2",
    codigo: "ID: P-002",
    boton: "Ficha Técnica",
    search: "bioinsumos agroecologia achacachi ue en ejecucion",
  },
  {
    id: "P-003",
    titulo: "Bombeo Solar Patacamaya",
    descripcion: "Sistemas fotovoltaicos.",
    estado: "Planificado",
    tipo: "Tecnologías Solares",
    municipio: "Patacamaya",
    financiador: "Pan para el Mundo",
    cooperante: "Pan para el Mundo",
    beneficiarios: "310 Familias",
    gestion: "2025",
    ubicacion: "Patacamaya, La Paz",
    imagen: "https://lh3.googleusercontent.com/p3",
    alt: "img3",
    codigo: "ID: P-003",
    boton: "Ficha Técnica",
    search: "bombeo solar patacamaya pan para el mundo planificado",
  },
  {
    id: "P-004",
    titulo: "Liderazgo Mujeres Tiwanaku",
    descripcion: "Asociaciones productivas.",
    estado: "En Ejecución",
    tipo: "Liderazgo de Mujeres",
    municipio: "Tiwanaku",
    financiador: "FOS Bélgica",
    cooperante: "FOS Bélgica",
    beneficiarios: "280 Mujeres",
    gestion: "2024",
    ubicacion: "Tiwanaku, La Paz",
    imagen: "https://lh3.googleusercontent.com/p4",
    alt: "img4",
    codigo: "ID: P-004",
    boton: "Ficha Técnica",
    search: "liderazgo mujeres tiwanaku fos belgica en ejecucion",
  },
  {
    id: "P-005",
    titulo: "Restauración Bofedales Colomi",
    descripcion: "Clausuras y revegetación.",
    estado: "Concluido",
    tipo: "Manejo de Bofedales",
    municipio: "Colomi",
    financiador: "Misereor",
    cooperante: "Misereor",
    beneficiarios: "510 Familias",
    gestion: "2021",
    ubicacion: "Colomi, Cochabamba",
    imagen: "https://lh3.googleusercontent.com/p5",
    alt: "img5",
    codigo: "ID: P-005",
    boton: "Ficha Técnica",
    search: "restauracion bofedales colomi misereor concluido",
  },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("ProjectsExplorer — renderizado inicial", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<ProjectsExplorer projects={proyectosMock} />);
    expect(container).toBeTruthy();
  });

  it("muestra todas las cards al inicio (sin filtros)", () => {
    render(<ProjectsExplorer projects={proyectosMock} />);
    // Cada card muestra su título
    expect(screen.getByText(/Cosecha de Agua en Batallas/i)).toBeInTheDocument();
    expect(screen.getByText(/Bioinsumos Agroecológicos Achacachi/i)).toBeInTheDocument();
    expect(screen.getByText(/Bombeo Solar Patacamaya/i)).toBeInTheDocument();
    expect(screen.getByText(/Liderazgo Mujeres Tiwanaku/i)).toBeInTheDocument();
    expect(screen.getByText(/Restauración Bofedales Colomi/i)).toBeInTheDocument();
  });

  it("muestra el contador correcto de proyectos", () => {
    render(<ProjectsExplorer projects={proyectosMock} />);
    expect(screen.getByText(/5 proyectos encontrados/i)).toBeInTheDocument();
  });

  it("lista vacía muestra mensaje sin resultados", () => {
    render(<ProjectsExplorer projects={[]} />);
    expect(screen.getByText(/Sin resultados/i)).toBeInTheDocument();
  });
});

describe("ProjectsExplorer — filtro por estado", () => {
  it("filtra por estado 'Concluido' → muestra 2 proyectos", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.click(screen.getByRole("button", { name: /Concluido/i }));
    // P-001 y P-005 son Concluido
    await waitFor(
      () => {
        expect(screen.getByText(/Cosecha de Agua en Batallas/i)).toBeInTheDocument();
        expect(screen.getByText(/Restauración Bofedales Colomi/i)).toBeInTheDocument();
        expect(screen.queryByText(/Bioinsumos Agroecológicos Achacachi/i)).not.toBeInTheDocument();
        expect(screen.getByText(/2 proyectos encontrados/i)).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
  }, 10000);

  it("filtra por estado 'En Ejecución' → muestra 2 proyectos", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.click(screen.getByRole("button", { name: /En Ejecución/i }));
    await waitFor(() => {
      expect(screen.getByText(/Bioinsumos Agroecológicos Achacachi/i)).toBeInTheDocument();
      expect(screen.getByText(/Liderazgo Mujeres Tiwanaku/i)).toBeInTheDocument();
      expect(screen.queryByText(/Cosecha de Agua en Batallas/i)).not.toBeInTheDocument();
    });
  });

  it("vuelve a mostrar todos al hacer click en 'Todos'", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.click(screen.getByRole("button", { name: /Concluido/i }));
    await user.click(screen.getByRole("button", { name: /^Todos$/i }));
    await waitFor(() => {
      expect(screen.getByText(/5 proyectos encontrados/i)).toBeInTheDocument();
    });
  });
});

describe("ProjectsExplorer — filtro por tipo", () => {
  it("filtra por tipo 'Agua y Riego' → solo P-001", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.selectOptions(screen.getByLabelText(/Filtrar por tipo/i), "Agua y Riego");
    await waitFor(() => {
      expect(screen.getByText(/Cosecha de Agua en Batallas/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bioinsumos Agroecológicos/i)).not.toBeInTheDocument();
      expect(screen.getByText(/1 proyecto encontrado/i)).toBeInTheDocument();
    });
  });
});

describe("ProjectsExplorer — búsqueda de texto", () => {
  it("busca por 'agua' → muestra P-001", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.type(screen.getByPlaceholderText(/Buscar proyecto/i), "agua");
    await waitFor(() => {
      expect(screen.getByText(/Cosecha de Agua en Batallas/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bioinsumos Agroecológicos/i)).not.toBeInTheDocument();
    });
  });

  it("búsqueda sin resultados muestra mensaje vacío con botón limpiar", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.type(screen.getByPlaceholderText(/Buscar proyecto/i), "xyzabc999");
    expect(screen.getByText(/Sin resultados/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpiar filtros/i })).toBeInTheDocument();
  });

  it("limpiar filtros restaura todos los proyectos", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    await user.type(screen.getByPlaceholderText(/Buscar proyecto/i), "xyzabc999");
    expect(screen.getByText(/Sin resultados/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Limpiar filtros/i }));
    expect(screen.getByText(/5 proyectos encontrados/i)).toBeInTheDocument();
  });
});

describe("ProjectsExplorer — modal de detalle", () => {
  it("abre el modal al hacer click en 'Ficha Técnica'", async () => {
    const user = userEvent.setup();
    render(<ProjectsExplorer projects={proyectosMock} />);
    const botones = screen.getAllByRole("button", { name: /Ficha Técnica/i });
    await user.click(botones[0]);
    // El modal muestra el título completo del proyecto
    expect(screen.getAllByText(/Cosecha de Agua en Batallas/i).length).toBeGreaterThan(1);
  });
});

describe("ProjectsExplorer — municipios dinámicos", () => {
  it("usa la lista de municipios pasada como prop", () => {
    const municipios = ["Batallas", "Achacachi", "Oruro"];
    render(<ProjectsExplorer projects={proyectosMock} municipios={municipios} />);
    expect(screen.getByRole("option", { name: "Oruro" })).toBeInTheDocument();
  });

  it("infiere municipios únicos de los proyectos cuando no se pasa la prop", () => {
    render(<ProjectsExplorer projects={proyectosMock} />);
    // Todos los municipios del mock deben estar disponibles
    expect(screen.getByRole("option", { name: "Batallas" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Achacachi" })).toBeInTheDocument();
  });
});
