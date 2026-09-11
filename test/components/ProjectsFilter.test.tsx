/**
 * test/components/ProjectsFilter.test.tsx
 * Tests de componente para ProjectsFilter.
 *
 * Verifica: renderizado, callbacks de filtro, chips de estado,
 * selects de tipo/municipio, campo de búsqueda.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsFilter, { type Filtros } from "@/components/projects/ProjectsFilter";

const filtrosIniciales: Filtros = {
  estado: "Todos",
  tipo: "Todos",
  municipio: "Todos",
  busqueda: "",
};

const municipiosTest = ["Batallas", "Achacachi", "Patacamaya", "Tiwanaku"];

describe("ProjectsFilter — renderizado", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={53}
        municipios={municipiosTest}
      />,
    );
    expect(container).toBeTruthy();
  });

  it("muestra el contador de proyectos", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={53}
        municipios={municipiosTest}
      />,
    );
    expect(screen.getByText(/53 proyectos encontrados/i)).toBeInTheDocument();
  });

  it("muestra 'proyecto' en singular cuando total es 1", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={1}
        municipios={municipiosTest}
      />,
    );
    expect(screen.getByText(/1 proyecto encontrado/i)).toBeInTheDocument();
  });

  it("muestra el chip 'Todos' activo por defecto", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={10}
        municipios={municipiosTest}
      />,
    );
    // El primer chip debe ser "Todos"
    const chips = screen.getAllByRole("button");
    expect(chips[0]).toHaveTextContent("Todos");
  });

  it("muestra chips de todos los estados", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={10}
        municipios={municipiosTest}
      />,
    );
    expect(screen.getByRole("button", { name: /Todos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /En Ejecución/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Concluido/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Planificado/i })).toBeInTheDocument();
  });

  it("muestra los municipios en el select", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={10}
        municipios={municipiosTest}
      />,
    );
    expect(screen.getByDisplayValue("Todos los municipios")).toBeInTheDocument();
    for (const m of municipiosTest) {
      expect(screen.getByRole("option", { name: m })).toBeInTheDocument();
    }
  });
});

describe("ProjectsFilter — interacciones", () => {
  it("llama onChange al hacer click en chip de estado", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={onChange}
        total={10}
        municipios={municipiosTest}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Concluido/i }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ estado: "Concluido" }));
  });

  it("llama onChange al cambiar el select de tipo", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={onChange}
        total={10}
        municipios={municipiosTest}
      />,
    );
    await user.selectOptions(screen.getByLabelText(/Filtrar por tipo/i), "Agua y Riego");
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ tipo: "Agua y Riego" }));
  });

  it("llama onChange al cambiar el select de municipio", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={onChange}
        total={10}
        municipios={municipiosTest}
      />,
    );
    await user.selectOptions(screen.getByLabelText(/Filtrar por municipio/i), "Batallas");
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ municipio: "Batallas" }));
  });

  it("llama onChange al escribir en el campo de búsqueda", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={onChange}
        total={10}
        municipios={municipiosTest}
      />,
    );
    await user.type(screen.getByPlaceholderText(/Buscar proyecto/i), "agua");
    expect(onChange).toHaveBeenCalled();
  });

  it("muestra botón de limpiar búsqueda cuando hay texto", () => {
    render(
      <ProjectsFilter
        filtros={{ ...filtrosIniciales, busqueda: "agua" }}
        onChange={vi.fn()}
        total={5}
        municipios={municipiosTest}
      />,
    );
    expect(screen.getByLabelText(/Limpiar búsqueda/i)).toBeInTheDocument();
  });

  it("NO muestra botón de limpiar cuando búsqueda está vacía", () => {
    render(
      <ProjectsFilter
        filtros={filtrosIniciales}
        onChange={vi.fn()}
        total={10}
        municipios={municipiosTest}
      />,
    );
    expect(screen.queryByLabelText(/Limpiar búsqueda/i)).not.toBeInTheDocument();
  });
});
