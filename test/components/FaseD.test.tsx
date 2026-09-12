/**
 * test/components/FaseD.test.tsx
 * Fase D: lightbox (GaleriaEspacios + PhotoEssay) y MapaBolivia Leaflet.
 */

import type { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MapaBolivia, { type MunicipioMapa } from "@/components/home/MapaBolivia";
import MapaBoliviaInner from "@/components/home/MapaBoliviaInner";
import PhotoEssay from "@/components/home/PhotoEssay";
import GaleriaEspacios from "@/components/casa-semta/GaleriaEspacios";
import { casaSemtaPhotogrid } from "@/data/casaSemta";

// ─── Mocks: Leaflet no corre en jsdom ─────────────────────────────────────────
// react-leaflet se reemplaza por componentes que solo pasan children;
// leaflet por un stub con divIcon e Icon.Default de mentira.
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: ReactNode }) => children,
  TileLayer: () => null,
  Marker: ({ children }: { children?: ReactNode }) => children,
  Tooltip: ({ children }: { children?: ReactNode }) => children,
  ZoomControl: () => null,
}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: () => ({}),
    Icon: { Default: { prototype: {}, mergeOptions: () => {} } },
  },
}));

// El wrapper carga el mapa con next/dynamic ssr:false — en tests lo anulamos.
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => () => null,
}));

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

describe("MapaBolivia — wrapper Leaflet", () => {
  const municipiosPrueba: MunicipioMapa[] = [
    { id: "batallas", nombre: "Batallas", cantidadProyectos: 2 },
    { id: "colomi", nombre: "Colomi", cantidadProyectos: 1 },
  ];

  it("renderiza el encabezado con el conteo de municipios", () => {
    render(<MapaBolivia municipios={municipiosPrueba} />);
    expect(
      screen.getByRole("heading", { name: /Presencia SEMTA en Bolivia/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/2 municipios con proyectos/)).toBeInTheDocument();
  });

  it("muestra la leyenda de presencia SEMTA", () => {
    render(<MapaBolivia municipios={[]} />);
    expect(screen.getByText(/Municipios con presencia SEMTA/)).toBeInTheDocument();
  });
});

describe("MapaBoliviaInner — mapa Leaflet", () => {
  const municipiosPrueba: MunicipioMapa[] = [
    {
      id: "batallas",
      nombre: "Batallas",
      cantidadProyectos: 2,
      ubicacion: { lat: -16.3, lng: -68.3 },
    },
    { id: "colomi", nombre: "Colomi", cantidadProyectos: 1 },
    { id: "sin-coords", nombre: "Desconocido", cantidadProyectos: 4 },
  ];

  it("crea marcadores solo para municipios con coordenadas", () => {
    render(<MapaBoliviaInner municipios={municipiosPrueba} />);
    expect(screen.getByText("Batallas")).toBeInTheDocument();
    expect(screen.getByText("Colomi")).toBeInTheDocument();
    // El tercero no tiene coords ni fallback → no aparece
    expect(screen.queryByText("Desconocido")).not.toBeInTheDocument();
  });

  it("usa plural según la cantidad de proyectos", () => {
    render(<MapaBoliviaInner municipios={municipiosPrueba} />);
    expect(screen.getByText("2 proyectos")).toBeInTheDocument();
    expect(screen.getByText("1 proyecto")).toBeInTheDocument();
  });

  it("muestra placeholder cuando no hay municipios con coords", () => {
    render(
      <MapaBoliviaInner municipios={[{ id: "sin-coords", nombre: "X", cantidadProyectos: 1 }]} />,
    );
    expect(screen.getByText(/Mapa de cobertura en preparación/)).toBeInTheDocument();
  });
});
