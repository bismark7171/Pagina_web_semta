/**
 * test/components/ContactoForm.test.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * TESTS DE FORMULARIO
 *
 * Según la investigación (testsprite.com 2026):
 *   "Form submission and validation" es una de las 6 categorías críticas.
 *   "Loading states, error states" deben testearse.
 *
 * Qué verificamos (siguiendo la filosofía RTL — "test lo que el usuario ve"):
 *   - Renderizado inicial: campos, labels, botón
 *   - Accesibilidad: labels asociados a inputs (for/id)
 *   - Llenado de campos: el usuario puede escribir
 *   - Envío exitoso: muestra pantalla de éxito
 *   - Pantalla de éxito: mensaje, botón "Enviar otro"
 *   - Reset: vuelve al formulario después del éxito
 *   - Props: asuntoInicial, titulo, submitText, successText
 *   - Validación HTML5: campos required
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactoForm from "@/components/forms/ContactoForm";

// ─── Helper ───────────────────────────────────────────────────────────────────

async function llenarYEnviarFormulario() {
  const user = userEvent.setup();
  // type por campo es lento — usamos tripleClick+paste pattern vía clear+type
  await user.click(screen.getByLabelText(/Nombre completo/i));
  await user.keyboard("María Condori");
  await user.click(screen.getByLabelText(/Correo electrónico/i));
  await user.keyboard("maria@test.com");
  await user.click(screen.getByLabelText(/Mensaje/i));
  await user.keyboard("Hola, tengo una consulta.");
  await user.click(screen.getByRole("button", { name: /Enviar mensaje/i }));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("ContactoForm — renderizado inicial", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<ContactoForm />);
    expect(container).toBeTruthy();
  });

  it("muestra el campo de nombre con label accesible", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
  });

  it("muestra el campo de email con label accesible", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
  });

  it("muestra el campo de teléfono con label accesible", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
  });

  it("muestra el campo de asunto con label accesible", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
  });

  it("muestra el campo de mensaje con label accesible", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  it("muestra el botón de envío", () => {
    render(<ContactoForm />);
    expect(screen.getByRole("button", { name: /Enviar mensaje/i })).toBeInTheDocument();
  });

  it("el botón de envío no está deshabilitado inicialmente", () => {
    render(<ContactoForm />);
    expect(screen.getByRole("button", { name: /Enviar mensaje/i })).not.toBeDisabled();
  });
});

describe("ContactoForm — campos required", () => {
  it("el campo nombre tiene atributo required", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeRequired();
  });

  it("el campo email tiene atributo required", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeRequired();
  });

  it("el campo mensaje tiene atributo required", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Mensaje/i)).toBeRequired();
  });

  it("el campo teléfono NO es required (opcional)", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Teléfono/i)).not.toBeRequired();
  });

  it("el campo email tiene type='email'", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Correo electrónico/i)).toHaveAttribute("type", "email");
  });

  it("el campo teléfono tiene type='tel'", () => {
    render(<ContactoForm />);
    expect(screen.getByLabelText(/Teléfono/i)).toHaveAttribute("type", "tel");
  });
});

describe("ContactoForm — llenado de campos", () => {
  it("el usuario puede escribir en el campo nombre", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    const input = screen.getByLabelText(/Nombre completo/i);
    await user.type(input, "Juan Mamani");
    expect(input).toHaveValue("Juan Mamani");
  });

  it("el usuario puede escribir en el campo email", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    const input = screen.getByLabelText(/Correo electrónico/i);
    await user.type(input, "juan@semta.org.bo");
    expect(input).toHaveValue("juan@semta.org.bo");
  });

  it("el usuario puede cambiar el asunto del select", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    await user.selectOptions(screen.getByLabelText(/Asunto/i), "Pasantías 340h");
    expect(screen.getByLabelText(/Asunto/i)).toHaveValue("Pasantías 340h");
  });

  it("el asunto tiene opciones disponibles para el select", () => {
    render(<ContactoForm />);
    expect(screen.getByRole("option", { name: "Consulta general" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Alianzas y cooperación" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pasantías 340h" })).toBeInTheDocument();
  });
});

describe("ContactoForm — envío exitoso", () => {
  it("después de enviar muestra '¡Gracias!'", async () => {
    render(<ContactoForm />);
    await llenarYEnviarFormulario();
    expect(screen.getByText(/¡Gracias!/i)).toBeInTheDocument();
  });

  it("después de enviar muestra el texto de éxito por defecto", async () => {
    render(<ContactoForm />);
    await llenarYEnviarFormulario();
    expect(screen.getByText(/Te responderemos a la brevedad/i)).toBeInTheDocument();
  });

  it("después de enviar el formulario desaparece", async () => {
    render(<ContactoForm />);
    await llenarYEnviarFormulario();
    expect(screen.queryByRole("button", { name: /Enviar mensaje/i })).not.toBeInTheDocument();
  });

  it("después de enviar aparece botón 'Enviar otro mensaje'", async () => {
    render(<ContactoForm />);
    await llenarYEnviarFormulario();
    expect(screen.getByRole("button", { name: /Enviar otro mensaje/i })).toBeInTheDocument();
  });

  it("'Enviar otro mensaje' vuelve al formulario", async () => {
    const user = userEvent.setup();
    render(<ContactoForm />);
    await llenarYEnviarFormulario();
    await user.click(screen.getByRole("button", { name: /Enviar otro mensaje/i }));
    expect(screen.getByRole("button", { name: /Enviar mensaje/i })).toBeInTheDocument();
  });
});

describe("ContactoForm — props personalizadas", () => {
  it("muestra el titulo personalizado", () => {
    render(<ContactoForm titulo="Contáctanos ahora" />);
    expect(screen.getByText("Contáctanos ahora")).toBeInTheDocument();
  });

  it("muestra el submitText personalizado", () => {
    render(<ContactoForm submitText="Reservar espacio" />);
    expect(screen.getByRole("button", { name: /Reservar espacio/i })).toBeInTheDocument();
  });

  it("muestra successText personalizado tras el envío", async () => {
    render(<ContactoForm successText="Tu reserva fue registrada." />);
    await llenarYEnviarFormulario();
    expect(screen.getByText("Tu reserva fue registrada.")).toBeInTheDocument();
  });

  it("usa asuntoInicial como valor por defecto del select", () => {
    render(<ContactoForm asuntoInicial="Voluntariado" />);
    expect(screen.getByLabelText(/Asunto/i)).toHaveValue("Voluntariado");
  });
});
