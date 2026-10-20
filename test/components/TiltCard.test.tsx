import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TiltCard } from "@/components/ui/TiltCard";

describe("TiltCard component tests", () => {
  it("renderiza sus hijos sin romperse", () => {
    render(
      <TiltCard maxDeg={4}>
        <div data-testid="child-content">Contenido 2.5D</div>
      </TiltCard>,
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Contenido 2.5D")).toBeInTheDocument();
  });

  it("acepta clases personalizadas y las aplica", () => {
    const { container } = render(
      <TiltCard className="custom-card-class">
        <p>Texto de prueba</p>
      </TiltCard>,
    );

    expect(container.firstChild).toHaveClass("custom-card-class");
  });
});
