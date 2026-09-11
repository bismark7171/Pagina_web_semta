/**
 * test/accessibility/a11y.test.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * TESTS DE ACCESIBILIDAD con axe-core
 *
 * La investigación confirmó (medium.com/@echilaka, browserstack.com 2026):
 *   "Axe runs more rules, produces fewer false positives, and plugs into
 *    your test suite."
 *
 * Usamos vitest-axe (wrapper de axe-core para Vitest) para detectar
 * violaciones WCAG automáticamente en cada componente.
 *
 * Qué garantiza:
 *   - Imágenes tienen texto alternativo (alt)
 *   - Botones e inputs tienen labels accesibles
 *   - Estructura semántica correcta (headings, landmarks)
 *   - ARIA attributes son válidos
 *
 * NOTA: axe-core cubre ~57% de los problemas WCAG automáticamente.
 * La accesibilidad completa requiere prueba manual con lectores de pantalla.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { AxeResults } from "axe-core";
import type { IProject } from "@/types";

// ── Componentes a testear ────────────────────────────────────────────────────
import ContactoForm from "@/components/forms/ContactoForm";
import VerificarCertificado from "@/components/verificar/VerificarCertificado";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsStats from "@/components/projects/ProjectsStats";

// ─── Helper: falla el test si hay violaciones y muestra mensaje claro ─────────

function expectNoA11yViolations(results: AxeResults) {
  if (results.violations.length === 0) return;

  const messages = results.violations.map((v) => {
    const nodes = v.nodes.map((n) => `    → ${n.html}`).join("\n");
    return `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n${nodes}`;
  });

  throw new Error(
    `Se encontraron ${results.violations.length} violación(es) de accesibilidad:\n\n${messages.join("\n\n")}`,
  );
}

// ─── Dato de prueba ───────────────────────────────────────────────────────────

const proyectoMock: IProject = {
  id: "P-001",
  titulo: "Cosecha de Agua en Batallas",
  descripcion: "Construcción de atajados comunales.",
  estado: "Concluido",
  tipo: "Agua y Riego",
  municipio: "Batallas",
  financiador: "COSUDE",
  cooperante: "COSUDE",
  beneficiarios: "420 Familias",
  gestion: "2022 - 2024",
  ubicacion: "Batallas, La Paz",
  imagen: "https://lh3.googleusercontent.com/aida-public/test",
  alt: "Proyecto de cosecha de agua en la comunidad de Batallas, La Paz",
  codigo: "ID: P-001",
  boton: "Ficha Técnica",
  search: "cosecha agua batallas cosude",
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Accesibilidad — formulario de contacto", () => {
  it("ContactoForm no tiene violaciones WCAG", async () => {
    const { container } = render(<ContactoForm />);
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });
});

describe("Accesibilidad — verificador de certificado", () => {
  it("VerificarCertificado no tiene violaciones WCAG", async () => {
    const { container } = render(<VerificarCertificado />);
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });
});

describe("Accesibilidad — componentes UI", () => {
  it("Button (action) no tiene violaciones WCAG", async () => {
    const { container } = render(
      <main>
        <Button onClick={() => {}}>Guardar cambios</Button>
      </main>,
    );
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });

  it("Button (link) no tiene violaciones WCAG", async () => {
    const { container } = render(
      <main>
        <Button href="/proyectos">Ver proyectos</Button>
      </main>,
    );
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });

  it("Button deshabilitado no tiene violaciones WCAG", async () => {
    const { container } = render(
      <main>
        <Button disabled>Enviando...</Button>
      </main>,
    );
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });
});

describe("Accesibilidad — tarjetas de proyectos", () => {
  it("ProjectCard no tiene violaciones WCAG", async () => {
    const { container } = render(
      <main>
        <ul>
          <li>
            <ProjectCard project={proyectoMock} onOpen={() => {}} />
          </li>
        </ul>
      </main>,
    );
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });

  it("ProjectsStats no tiene violaciones WCAG", async () => {
    const { container } = render(
      <main>
        <ProjectsStats total={53} />
      </main>,
    );
    const results = (await axe(container)) as AxeResults;
    expectNoA11yViolations(results);
  });
});
