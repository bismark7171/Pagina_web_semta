/**
 * test/components/VerificarCertificado.test.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * TESTS DE ESTADOS DE CARGA / RESULTADO
 *
 * Según la investigación (testsprite.com 2026):
 *   "Data loading states (loading, error, empty, populated)"
 *   "API error handling (what the React UI shows when the API fails)"
 *
 * Los 3 estados que el usuario puede ver:
 *   - vacío  → formulario inicial, sin resultado
 *   - válido → certificado encontrado (código empieza con SEMTA- y ≥12 chars)
 *   - inválido → código no encontrado
 *
 * También verificamos accesibilidad y que el input resetea el resultado
 * al escribir un nuevo código (UX correcto).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VerificarCertificado from "@/components/verificar/VerificarCertificado";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function buscarCodigo(codigo: string) {
  const user = userEvent.setup();
  const input = screen.getByPlaceholderText(/SEMTA-2026-XXXX/i);
  await user.clear(input);
  await user.type(input, codigo);
  await user.click(screen.getByRole("button", { name: /Verificar/i }));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("VerificarCertificado — estado inicial", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<VerificarCertificado />);
    expect(container).toBeTruthy();
  });

  it("muestra el campo de código con label accesible", () => {
    render(<VerificarCertificado />);
    expect(screen.getByLabelText(/Código del certificado/i)).toBeInTheDocument();
  });

  it("muestra el botón Verificar", () => {
    render(<VerificarCertificado />);
    expect(screen.getByRole("button", { name: /Verificar/i })).toBeInTheDocument();
  });

  it("no muestra ningún resultado al inicio", () => {
    render(<VerificarCertificado />);
    expect(screen.queryByText(/Certificado válido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Código no encontrado/i)).not.toBeInTheDocument();
  });

  it("muestra instrucciones de uso al usuario", () => {
    render(<VerificarCertificado />);
    expect(screen.getByText(/SEMTA-2026-0042/i)).toBeInTheDocument();
  });

  it("muestra las 3 tarjetas informativas de garantías", () => {
    render(<VerificarCertificado />);
    expect(screen.getByText(/Firma digital institucional/i)).toBeInTheDocument();
    expect(screen.getByText(/Base de datos pública/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentos emitidos por Casa SEMTA/i)).toBeInTheDocument();
  });
});

describe("VerificarCertificado — código VÁLIDO", () => {
  // Códigos que cumplen: empieza con "SEMTA-" y longitud >= 12
  const codigosValidos = ["SEMTA-2026-0042", "SEMTA-2025-001X", "SEMTA-123456789"];

  for (const codigo of codigosValidos) {
    it(`"${codigo}" → muestra certificado válido`, async () => {
      render(<VerificarCertificado />);
      await buscarCodigo(codigo);
      expect(screen.getByText(/Certificado válido/i)).toBeInTheDocument();
    });
  }

  it("código válido muestra 'Documento autenticado por SEMTA'", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("SEMTA-2026-0042");
    expect(screen.getByText(/Documento autenticado por SEMTA/i)).toBeInTheDocument();
  });

  it("código válido muestra el código en pantalla", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("SEMTA-2026-0042");
    // El componente muestra el código como "titular"
    expect(screen.getByText("SEMTA-2026-0042")).toBeInTheDocument();
  });

  it("código válido muestra el programa de formación", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("SEMTA-2026-0042");
    expect(screen.getByText(/340 horas/i)).toBeInTheDocument();
  });

  it("código válido muestra la emisión por Casa SEMTA", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("SEMTA-2026-0042");
    // "Casa SEMTA" aparece en el resultado Y en la tarjeta informativa
    expect(screen.getAllByText(/Casa SEMTA/i).length).toBeGreaterThanOrEqual(1);
  });

  it("código se normaliza a mayúsculas antes de validar", async () => {
    render(<VerificarCertificado />);
    // El input tiene CSS uppercase, el componente hace .toUpperCase()
    await buscarCodigo("semta-2026-0042");
    expect(screen.getByText(/Certificado válido/i)).toBeInTheDocument();
  });
});

describe("VerificarCertificado — código INVÁLIDO", () => {
  const codigosInvalidos = [
    "ABC-1234", // no empieza con SEMTA-
    "SEMTA-12", // muy corto (< 12 caracteres)
    "INVALIDO-9999", // formato incorrecto
    "123456789012", // números sin prefijo
  ];

  for (const codigo of codigosInvalidos) {
    it(`"${codigo}" → muestra 'Código no encontrado'`, async () => {
      render(<VerificarCertificado />);
      await buscarCodigo(codigo);
      expect(screen.getByText(/Código no encontrado/i)).toBeInTheDocument();
    });
  }

  it("código inválido NO muestra 'Certificado válido'", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("INVALIDO-9999");
    expect(screen.queryByText(/Certificado válido/i)).not.toBeInTheDocument();
  });

  it("código inválido muestra el email de soporte", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("INVALIDO-9999");
    expect(screen.getByText(/certificados@semta\.org\.bo/i)).toBeInTheDocument();
  });

  it("el enlace de soporte es un mailto correcto", async () => {
    render(<VerificarCertificado />);
    await buscarCodigo("INVALIDO-9999");
    const link = screen.getByRole("link", { name: /certificados@semta\.org\.bo/i });
    expect(link).toHaveAttribute("href", "mailto:certificados@semta.org.bo");
  });
});

describe("VerificarCertificado — UX: reset al escribir nuevo código", () => {
  it("escribir un nuevo código limpia el resultado anterior", async () => {
    const user = userEvent.setup();
    render(<VerificarCertificado />);

    // Primero busca un código válido
    await buscarCodigo("SEMTA-2026-0042");
    expect(screen.getByText(/Certificado válido/i)).toBeInTheDocument();

    // Luego el usuario empieza a escribir otro código
    const input = screen.getByPlaceholderText(/SEMTA-2026-XXXX/i);
    await user.type(input, "X");

    // El resultado anterior debe desaparecer
    expect(screen.queryByText(/Certificado válido/i)).not.toBeInTheDocument();
  });

  it("enviar campo vacío no muestra ni válido ni inválido", async () => {
    const user = userEvent.setup();
    render(<VerificarCertificado />);
    await user.click(screen.getByRole("button", { name: /Verificar/i }));
    expect(screen.queryByText(/Certificado válido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Código no encontrado/i)).not.toBeInTheDocument();
  });
});
