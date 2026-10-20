/**
 * test/components/UI.test.tsx
 * Smoke tests de los primitivos UI que no estaban cubiertos:
 * Badge, SectionLabel, Container, PageHero, Logo.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Logo } from "@/components/ui/Logo";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";

describe("Badge", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<Badge>Nuevo</Badge>);
    expect(container).toBeTruthy();
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
  });

  it("aplica la variante outline", () => {
    const { container } = render(<Badge variant="outline">Verificado</Badge>);
    expect(screen.getByText("Verificado")).toBeInTheDocument();
    expect(container.querySelector(".test-clase, span")).toBeInTheDocument();
  });

  it("acepta className extra", () => {
    const { container } = render(<Badge className="test-clase">X</Badge>);
    expect(container.querySelector(".test-clase")).toBeInTheDocument();
  });
});

describe("SectionLabel", () => {
  it("renderiza el texto del children", () => {
    render(<SectionLabel>Áreas Estratégicas</SectionLabel>);
    expect(screen.getByText("Áreas Estratégicas")).toBeInTheDocument();
  });

  it("muestra icono cuando se pasa prop icono", () => {
    const { container } = render(<SectionLabel icono="agriculture">Áreas</SectionLabel>);
    expect(container.textContent).toContain("agriculture");
  });
});

describe("Container", () => {
  it("renderiza los children", () => {
    render(
      <Container>
        <p>Contenido dentro del contenedor</p>
      </Container>,
    );
    expect(screen.getByText("Contenido dentro del contenedor")).toBeInTheDocument();
  });

  it("acepta className extra", () => {
    const { container } = render(<Container className="extra-clase">x</Container>);
    expect(container.querySelector(".extra-clase")).toBeInTheDocument();
  });
});

describe("PageHero", () => {
  const props = {
    crumbs: [
      { label: "Inicio", href: "/" },
      { label: "Proyectos", href: "/proyectos" },
    ],
    titulo: <>Título de la Página</>,
    descripcion: "Descripción de la página.",
  };

  it("renderiza sin errores", () => {
    const { container } = render(<PageHero {...props} />);
    expect(container).toBeTruthy();
  });

  it("muestra el título", () => {
    render(<PageHero {...props} />);
    expect(screen.getByText("Título de la Página")).toBeInTheDocument();
  });

  it("muestra la descripción", () => {
    render(<PageHero {...props} />);
    expect(screen.getByText("Descripción de la página.")).toBeInTheDocument();
  });

  it("muestra los crumbs de navegación", () => {
    render(<PageHero {...props} />);
    expect(screen.getByLabelText("Migas de pan")).toBeInTheDocument();
  });

  it("muestra el badge cuando se pasa prop badge", () => {
    render(<PageHero {...props} badge={{ icono: "verified_user", text: "Banco Público" }} />);
    expect(screen.getByText("Banco Público")).toBeInTheDocument();
  });

  it("no muestra badge si no se pasa prop", () => {
    render(<PageHero {...props} />);
    expect(screen.queryByText(/Banco Público/i)).not.toBeInTheDocument();
  });

  it("el último crumb no es un link", () => {
    render(<PageHero {...props} />);
    const enlaces = screen.getAllByRole("link");
    expect(enlaces).toHaveLength(1);
  });
});

describe("Logo", () => {
  it("liga a la página de inicio", () => {
    render(<Logo />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("tiene aria-label SEMTA", () => {
    render(<Logo />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "SEMTA - Inicio");
  });

  it("muestra la imagen del logo", () => {
    render(<Logo />);
    expect(screen.getByAltText("Logo SEMTA")).toBeInTheDocument();
  });

  it("acepta variante light sin romper", () => {
    const { container } = render(<Logo variant="light" />);
    expect(container).toBeTruthy();
  });

  it("sin enlace renderiza div con aria-label", () => {
    render(<Logo asLink={false} />);
    expect(screen.getByLabelText("SEMTA - Inicio")).toBeInTheDocument();
  });
});

describe("FadeIn", () => {
  it("renderiza los children", () => {
    render(
      <FadeIn>
        <p>Contenido animado</p>
      </FadeIn>,
    );
    expect(screen.getByText("Contenido animado")).toBeInTheDocument();
  });
});

describe("CountUp", () => {
  it("muestra 0 como valor inicial antes de animar", () => {
    render(<CountUp value="53" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("conserva el prefijo en el valor inicial", () => {
    render(<CountUp value="+25.000" />);
    expect(screen.getByText("+0.000")).toBeInTheDocument();
  });
});
