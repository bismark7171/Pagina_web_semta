/**
 * test/components/CasaSemta.test.tsx
 * Tests de los componentes de la subpágina Casa SEMTA:
 * CasaHero, CasaFaq, ServicioCard.
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CasaHero from "@/components/casa-semta/CasaHero";
import CasaFaq from "@/components/casa-semta/CasaFaq";
import ServicioCard from "@/components/casa-semta/ServicioCard";
import type { IServicioCasa } from "@/types";

const servicioMock: IServicioCasa = {
  titulo: "Alquiler de Salas y Espacios",
  descripcion: "Infraestructura para talleres y eventos.",
  imagen: "https://lh3.googleusercontent.com/espacio",
  alt: "Sala de eventos en Casa SEMTA",
  badgeIcono: "meeting_room",
  badgeTexto: "Espacios",
  modalidadLabel: "Modalidad",
  modalidad: "Por hora o jornada",
  checks: ["Proyector incluido", "Cafetería"],
};

describe("CasaHero", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<CasaHero />);
    expect(container).toBeTruthy();
  });

  it("muestra el título principal", () => {
    render(<CasaHero />);
    // El h1 está dividido en texto + <span>agroecológico</span>, así que
    // buscamos por rol/heading y validamos el contenido normalizado.
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("agroecológico");
    expect(h1.textContent).toContain("Un corazón");
    expect(h1.textContent).toContain("en La Paz");
  });

  it("muestra los botones de acción", () => {
    render(<CasaHero />);
    expect(screen.getByText("Reservar Espacio")).toBeInTheDocument();
    expect(screen.getByText("Agenda de Talleres")).toBeInTheDocument();
  });

  it("muestra la dirección de casa también en métricas", () => {
    render(<CasaHero />);
    expect(screen.getByText(/Alfredo Ascarrunz/)).toBeInTheDocument();
  });
});

describe("CasaFaq", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<CasaFaq />);
    expect(container).toBeTruthy();
  });

  it("muestra al menos una pregunta", () => {
    render(<CasaFaq />);
    const preguntas = screen.getAllByRole("button");
    expect(preguntas.length).toBeGreaterThan(0);
  });

  it("la primera pregunta está abierta por defecto", () => {
    render(<CasaFaq />);
    const primera = screen.getAllByRole("button")[0];
    expect(primera).toHaveAttribute("aria-expanded", "true");
  });

  it("abre y cierra las preguntas al hacer click", () => {
    render(<CasaFaq />);
    const primera = screen.getAllByRole("button")[0];
    fireEvent.click(primera);
    expect(primera).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(primera);
    expect(primera).toHaveAttribute("aria-expanded", "true");
  });
});

describe("ServicioCard", () => {
  it("renderiza sin errores", () => {
    render(<ServicioCard servicio={servicioMock} />);
    expect(screen.getByText(servicioMock.titulo)).toBeInTheDocument();
  });

  it("muestra la descripción", () => {
    render(<ServicioCard servicio={servicioMock} />);
    expect(screen.getByText(servicioMock.descripcion)).toBeInTheDocument();
  });

  it("muestra los checks del servicio", () => {
    render(<ServicioCard servicio={servicioMock} />);
    expect(screen.getByText("Proyector incluido")).toBeInTheDocument();
    expect(screen.getByText("Cafetería")).toBeInTheDocument();
  });

  it("muestra la modalidad", () => {
    render(<ServicioCard servicio={servicioMock} />);
    expect(screen.getByText(servicioMock.modalidad)).toBeInTheDocument();
  });

  it("el botón de reserva enlaza a /reservar", () => {
    render(<ServicioCard servicio={servicioMock} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/reservar");
  });

  it("el botón de reserva tiene aria-label con el título", () => {
    render(<ServicioCard servicio={servicioMock} />);
    expect(screen.getByLabelText(`Reservar: ${servicioMock.titulo}`)).toBeInTheDocument();
  });
});
