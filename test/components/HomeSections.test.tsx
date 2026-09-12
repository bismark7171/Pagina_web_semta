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
    expect(screen.getByText(/Historias que el campo/)).toBeInTheDocument();
  });

  it("muestra las estadísticas rápidas", () => {
    render(<PhotoEssay />);
    expect(screen.getByText("Activos en Campo")).toBeInTheDocument();
    expect(screen.getByText("Familias Beneficiadas")).toBeInTheDocument();
    expect(screen.getByText("14,280+")).toBeInTheDocument();
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
    expect(screen.getByText(/Con el apoyo de la cooperación internacional/)).toBeInTheDocument();
  });

  it("lista los cooperantes (duplicados por el loop del marquee)", () => {
    render(<CooperantesCarousel />);
    // Cada nombre se repite para el efecto infinito.
    expect(screen.getAllByText("COSUDE").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Unión Europea").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Misereor").length).toBeGreaterThanOrEqual(1);
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
    expect(screen.getByText(/Feria de semillas/)).toBeInTheDocument();
    expect(screen.getByText(/Casa SEMTA inaugura/)).toBeInTheDocument();
    // La más antigua (custodios de semillas, 2026-08-21) no debe aparecer.
    expect(screen.queryByText(/Custodios de semillas/)).not.toBeInTheDocument();
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
    expect(screen.getByText(/co-construimos con comunidades/i)).toBeInTheDocument();
    const enlace = screen.getByText("Conocer nuestra historia").closest("a");
    expect(enlace).not.toBeNull();
    expect(enlace).toHaveAttribute("href", "/nosotros");
  });
});
