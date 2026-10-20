/**
 * test/components/HomeSections.test.tsx
 * Smoke + interacción de las secciones del home sin testear:
 * HeroSlider (slider principal), PhotoEssay y las secciones de la Fase C
 * (CooperantesCarousel, HomeNoticias, QuienesSomos).
 */

import { describe, it, expect, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import HeroSlider from "@/components/home/HeroSlider";
import PhotoEssay from "@/components/home/PhotoEssay";
import CooperantesCarousel from "@/components/home/CooperantesCarousel";
import HomeNoticias from "@/components/home/HomeNoticias";
import QuienesSomos from "@/components/home/QuienesSomos";

describe("HeroSlider", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<HeroSlider />);
    expect(container).toBeTruthy();
  });

  it("muestra un slide inicial con botones", () => {
    render(<HeroSlider />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("tiene indicadores de navegación accesibles", () => {
    render(<HeroSlider />);
    // El label "Ir al slide N" se repite: barra de progreso desktop + dots.
    expect(screen.getAllByLabelText("Ir al slide 1").length).toBeGreaterThan(0);
  });

  it("cambia de slide al hacer click en el indicador", () => {
    render(<HeroSlider />);
    // Click en el dot (último elemento con ese label, fuera de la barra md).
    const dots = screen.getAllByLabelText("Ir al slide 2");
    fireEvent.click(dots[dots.length - 1]);
    // El contador muestra el slide actual: "02 — 03"
    expect(screen.getByText(/02 — 03/)).toBeInTheDocument();
  });

  it("avanza de slide automáticamente", () => {
    vi.useFakeTimers();
    render(<HeroSlider />);
    expect(screen.getByText(/01 — 03/)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(screen.getByText(/02 — 03/)).toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe("PhotoEssay", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<PhotoEssay />);
    expect(container).toBeTruthy();
  });

  it("muestra el título de la sección", () => {
    render(<PhotoEssay />);
    expect(screen.getByText(/Historias desde el/)).toBeInTheDocument();
  });

  it("muestra la foto destacada y las crónicas", () => {
    render(<PhotoEssay />);
    expect(screen.getByText(/Cosechando la lluvia/)).toBeInTheDocument();
    const enlace = screen.getByText("Ver todas las crónicas").closest("a");
    expect(enlace).not.toBeNull();
    expect(enlace).toHaveAttribute("href", "/noticias");
  });
});

describe("CooperantesCarousel", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<CooperantesCarousel />);
    expect(container).toBeTruthy();
  });

  it("tiene label de sección accesible", () => {
    render(<CooperantesCarousel />);
    expect(screen.getByLabelText("Instituciones cooperantes")).toBeInTheDocument();
  });

  it("muestra el titular de cooperación internacional", () => {
    render(<CooperantesCarousel />);
    expect(screen.getByText(/Cooperantes y Aliados Internacionales/)).toBeInTheDocument();
  });

  it("lista los cooperantes de la fuente única", () => {
    render(<CooperantesCarousel />);
    expect(screen.getAllByText(/COSUDE/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Unión Europea/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/MISEREOR/).length).toBeGreaterThanOrEqual(1);
  });
});

describe("HomeNoticias", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<HomeNoticias />);
    expect(container).toBeTruthy();
  });

  it("muestra el título de la sección", () => {
    render(<HomeNoticias />);
    expect(screen.getByText(/Noticias de/)).toBeInTheDocument();
  });

  it("muestra un enlace a /noticias", () => {
    render(<HomeNoticias />);
    const enlace = screen.getByText("Ver todas las noticias").closest("a");
    expect(enlace).not.toBeNull();
    expect(enlace).toHaveAttribute("href", "/noticias");
  });

  it("muestra solo las 3 noticias más recientes", () => {
    render(<HomeNoticias />);
    expect(screen.getByText(/Custodios de Semillas/)).toBeInTheDocument();
    expect(screen.getByText(/atajados familiares/)).toBeInTheDocument();
    // La más antigua (walipinis, 2024-12-05) no debe aparecer.
    expect(screen.queryByText(/walipinis/i)).not.toBeInTheDocument();
  });
});

describe("QuienesSomos", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<QuienesSomos />);
    expect(container).toBeTruthy();
  });

  it("muestra 'Quiénes somos' y el conteo de años", () => {
    render(<QuienesSomos />);
    expect(screen.getByText(/Quiénes somos/i)).toBeInTheDocument();
    const anios = new Date().getFullYear() - 1982;
    expect(screen.getByText(new RegExp(`${anios}\\+ años`))).toBeInTheDocument();
  });

  it("resume la misión y enlaza a /nosotros", () => {
    render(<QuienesSomos />);
    expect(screen.getByText(/seguridad hídrica/i)).toBeInTheDocument();
    const enlace = screen.getByText("Conocer nuestra historia").closest("a");
    expect(enlace).not.toBeNull();
    expect(enlace).toHaveAttribute("href", "/nosotros");
  });
});
