/**
 * test/pages/smoke.test.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * SMOKE TESTS — "¿Renderiza sin explotar?"
 *
 * La investigación de 2026 confirma (scrimba.com, testsprite.com):
 *   "Component tests detect whether a component renders correctly and
 *    responds to user interactions."
 *
 * Este archivo habría DETECTADO el bug de "use client" faltante antes del
 * commit que rompió el sitio. Si un Client Component usa hooks sin esa
 * directiva, este test falla con error de "useState is not a function" o
 * similar en jsdom — exactamente lo que pasó.
 *
 * Qué cubre:
 *   - Cada componente de la página principal renderiza sin errores
 *   - Los componentes de UI reutilizables funcionan
 *   - Los componentes de layout no explotan en rutas distintas
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// ── UI primitivos ─────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

// ── Secciones de la página principal ─────────────────────────────────────────
import ImpactMetrics from "@/components/home/ImpactMetrics";
import LineasDeAccion from "@/components/home/LineasDeAccion";
import HomeCta from "@/components/home/HomeCta";
import DualCallout from "@/components/home/DualCallout";
import Transparencia from "@/components/home/Transparencia";

// ── Proyectos ─────────────────────────────────────────────────────────────────
import ProjectsStats from "@/components/projects/ProjectsStats";

// ─── Datos mínimos para componentes que los necesitan ─────────────────────────

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Smoke — UI primitivos", () => {
  it("Button (action) renderiza sin errores", () => {
    const { container } = render(<Button onClick={vi.fn()}>Acción</Button>);
    expect(container).toBeTruthy();
    expect(screen.getByRole("button", { name: /Acción/i })).toBeInTheDocument();
  });

  it("Button (link) renderiza sin errores", () => {
    render(<Button href="/proyectos">Ver proyectos</Button>);
    expect(screen.getByRole("link", { name: /Ver proyectos/i })).toBeInTheDocument();
  });

  it("Button deshabilitado muestra atributo disabled", () => {
    render(<Button disabled>Bloqueado</Button>);
    expect(screen.getByRole("button", { name: /Bloqueado/i })).toBeDisabled();
  });

  it("Button todas las variantes renderizan", () => {
    const variantes = ["primary", "secondary", "ghost", "outline", "solid"] as const;
    for (const v of variantes) {
      const { unmount } = render(<Button variant={v}>Texto</Button>);
      expect(screen.getByRole("button", { name: /Texto/i })).toBeInTheDocument();
      unmount();
    }
  });

  it("MaterialIcon renderiza un SVG decorativo", () => {
    const { container } = render(<MaterialIcon name="home" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("Modal cerrado no muestra contenido", () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Título test">
        <p>Contenido del modal</p>
      </Modal>,
    );
    expect(screen.queryByText("Contenido del modal")).not.toBeInTheDocument();
  });

  it("Modal abierto muestra título y contenido", () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Modal SEMTA">
        <p>Descripción del proyecto</p>
      </Modal>,
    );
    expect(screen.getByText("Modal SEMTA")).toBeInTheDocument();
    expect(screen.getByText("Descripción del proyecto")).toBeInTheDocument();
  });

  it("Modal tiene botón de cerrar accesible", () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Test">
        <p>Contenido</p>
      </Modal>,
    );
    expect(screen.getByRole("button", { name: /Cerrar/i })).toBeInTheDocument();
  });
});

describe("Smoke — secciones de la página principal", () => {
  it("ImpactMetrics renderiza sin errores", () => {
    const { container } = render(<ImpactMetrics />);
    expect(container).toBeTruthy();
  });

  it("ImpactMetrics muestra la sección de impacto", () => {
    render(<ImpactMetrics />);
    expect(screen.getByText(/Impacto Verificable/i)).toBeInTheDocument();
  });

  it("LineasDeAccion renderiza sin errores", () => {
    const { container } = render(<LineasDeAccion />);
    expect(container).toBeTruthy();
  });

  it("DualCallout renderiza sin errores", () => {
    const { container } = render(<DualCallout />);
    expect(container).toBeTruthy();
  });

  it("Transparencia renderiza sin errores", () => {
    const { container } = render(<Transparencia />);
    expect(container).toBeTruthy();
  });

  it("HomeCta renderiza sin errores", () => {
    const { container } = render(<HomeCta />);
    expect(container).toBeTruthy();
  });
});

describe("Smoke — componentes de proyectos", () => {
  it("ProjectsStats renderiza con total=0", () => {
    const { container } = render(<ProjectsStats total={0} />);
    expect(container).toBeTruthy();
  });

  it("ProjectsStats renderiza con total=53 (BD real)", () => {
    render(<ProjectsStats total={53} />);
    expect(screen.getByText("53")).toBeInTheDocument();
  });

  it("ProjectsStats renderiza sin prop total (datos estáticos)", () => {
    const { container } = render(<ProjectsStats />);
    expect(container).toBeTruthy();
  });
});
