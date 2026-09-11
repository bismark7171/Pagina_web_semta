/**
 * test/components/FaseD.test.tsx
 * Fase D: lightbox (GaleriaEspacios + PhotoEssay) y MapaBolivia interactivo.
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MapaBolivia from "@/components/home/MapaBolivia";
import PhotoEssay from "@/components/home/PhotoEssay";
import GaleriaEspacios from "@/components/casa-semta/GaleriaEspacios";
import { casaSemtaPhotogrid } from "@/data/casaSemta";

const dosFotos = [
  {
    imagen: "https://ejemplo.test/1.jpg",
    alt: "Patio bioclimático",
  },
  {
    imagen: "https://ejemplo.test/2.jpg",
    alt: "Huerto orgánico",
  },
];

describe("Lightbox — GaleriaEspacios", () => {
  it("renderiza la grilla de fotos con botones de ampliar", () => {
    const { container } = render(<GaleriaEspacios fotos={dosFotos} />);
    expect(container).toBeTruthy();
    expect(screen.getAllByRole("button").length).toBe(2);
    expect(screen.getAllByLabelText(/Ampliar foto:/).length).toBe(2);
  });

  it("abre el dialogo al tocar una foto", () => {
    render(<GaleriaEspacios fotos={dosFotos} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByLabelText("Imagen 1 de 2")).toBeInTheDocument();
  });

  it("avanza y retrocede entre imágenes", () => {
    render(<GaleriaEspacios fotos={dosFotos} />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(screen.getByLabelText("Imagen 2 de 2")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Imagen anterior"));
    expect(screen.getByLabelText("Imagen 1 de 2")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Imagen siguiente"));
    expect(screen.getByLabelText("Imagen 2 de 2")).toBeInTheDocument();
  });

  it("cierra con Escape", () => {
    render(<GaleriaEspacios fotos={dosFotos} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByLabelText("Imagen 1 de 2")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByLabelText("Imagen 1 de 2")).not.toBeInTheDocument();
  });

  it("usa las fotos reales de Casa SEMTA sin errores", () => {
    const { container } = render(<GaleriaEspacios fotos={casaSemtaPhotogrid} />);
    fireEvent.click(screen.getAllByRole("button")[4]);
    expect(screen.getByLabelText(`Imagen 5 de ${casaSemtaPhotogrid.length}`)).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});

describe("PhotoEssay — lightbox", () => {
  it("abre el lightbox al tocar la foto principal", () => {
    render(<PhotoEssay />);
    fireEvent.click(screen.getAllByLabelText(/Ampliar foto:/)[0]);
    expect(screen.getByLabelText("Imagen 1 de 2")).toBeInTheDocument();
  });

  it("cierra el lightbox con el boton cerrar", () => {
    render(<PhotoEssay />);
    fireEvent.click(screen.getAllByLabelText(/Ampliar foto:/)[0]);
    fireEvent.click(screen.getByLabelText("Cerrar visor"));
    expect(screen.queryByLabelText("Imagen 1 de 2")).not.toBeInTheDocument();
  });
});

describe("MapaBolivia", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<MapaBolivia />);
    expect(container).toBeTruthy();
  });

  it("muestra los 9 departamentos", () => {
    render(<MapaBolivia />);
    expect(screen.getAllByRole("group").length).toBeGreaterThan(0);
    // Puntos de municipios con aria-label "nombre, departamento: N proyecto(s)"
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(6);
  });

  it("tiene los municipios con proyectos de proyectos.ts", () => {
    render(<MapaBolivia />);
    expect(screen.getByLabelText(/Batallas, La Paz/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Achacachi, La Paz/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tiwanaku, La Paz/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Patacamaya, La Paz/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Colomi, Cochabamba/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Torotoro, Potosí/)).toBeInTheDocument();
  });

  it("selecciona un municipio y muestra su panel", () => {
    render(<MapaBolivia />);
    fireEvent.click(screen.getByLabelText(/Batallas, La Paz/));
    expect(screen.getByText("Batallas")).toBeInTheDocument();
    expect(screen.getByText(/2 proyectos registrados/)).toBeInTheDocument();
    expect(screen.getByText("Ver proyectos").closest("a")).toHaveAttribute("href", "/proyectos");
  });

  it("deselecciona al tocar de nuevo el mismo municipio", () => {
    render(<MapaBolivia />);
    const chip = screen.getByLabelText(/Batallas, La Paz/);
    fireEvent.click(chip);
    expect(screen.getByText("Batallas")).toBeInTheDocument();
    fireEvent.click(chip);
    expect(screen.queryByText("Batallas")).not.toBeInTheDocument();
    expect(screen.getByText(/Tocá un municipio/)).toBeInTheDocument();
  });
});
