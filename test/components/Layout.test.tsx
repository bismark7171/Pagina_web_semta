/**
 * test/components/Layout.test.tsx
 * Smoke tests de los componentes de layout:
 * Header, MobileDrawer, Footer, FloatingChat.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "@/components/layout/Header";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/layout/FloatingChat";
import { BackToTop } from "@/components/layout/BackToTop";
import { headerCta } from "@/data/menuItems";

describe("Header", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<Header />);
    expect(container).toBeTruthy();
  });

  it("muestra la navegación principal", () => {
    render(<Header />);
    expect(screen.getByLabelText("Principal")).toBeInTheDocument();
  });

  it("muestra el botón de abrir menú en móvil", () => {
    render(<Header />);
    expect(screen.getByLabelText("Abrir menú")).toBeInTheDocument();
  });

  it("el CTA del header mantiene el enlace de headerCta", () => {
    render(<Header />);
    const ctaLinks = screen.getAllByText(headerCta.label);
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0].closest("a")).toHaveAttribute("href", headerCta.href);
  });
});

describe("MobileDrawer", () => {
  it("cerrado no muestra la navegación móvil", () => {
    render(<MobileDrawer open={false} onClose={vi.fn()} />);
    expect(screen.queryByLabelText("Principal móvil")).toBeNull();
  });

  it("abierto muestra la navegación móvil", () => {
    render(<MobileDrawer open={true} onClose={vi.fn()} />);
    expect(screen.getAllByLabelText("Principal móvil")).toBeTruthy();
  });

  it("abierto muestra el botón de cerrar", () => {
    render(<MobileDrawer open={true} onClose={vi.fn()} />);
    expect(screen.getAllByLabelText("Cerrar menú").length).toBeGreaterThan(0);
  });

  it("abierto mantiene el CTA", () => {
    render(<MobileDrawer open={true} onClose={vi.fn()} />);
    expect(screen.getAllByText(headerCta.label).length).toBeGreaterThan(0);
  });

  it("llama onClose al presionar cerrar", () => {
    const onClose = vi.fn();
    render(<MobileDrawer open={true} onClose={onClose} />);
    fireEvent.click(screen.getAllByLabelText("Cerrar menú")[0]);
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Footer", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<Footer />);
    expect(container).toBeTruthy();
  });

  it("muestra el logo SEMTA", () => {
    render(<Footer />);
    expect(screen.getAllByText("SEMTA").length).toBeGreaterThan(0);
  });

  it("muestra el subheading", () => {
    render(<Footer />);
    expect(screen.getByText(/Construimos resiliencia agroecológica/)).toBeInTheDocument();
  });

  it("tiene enlace a privacidad", () => {
    render(<Footer />);
    const link = screen.getAllByRole("link").find((l) => l.getAttribute("href") === "/privacidad");
    expect(link).toBeTruthy();
  });

  it("tiene enlace a transparencia", () => {
    render(<Footer />);
    const link = screen
      .getAllByRole("link")
      .find((l) => l.getAttribute("href") === "/transparencia");
    expect(link).toBeTruthy();
  });
});

describe("FloatingChat", () => {
  it("renderiza sin errores", () => {
    const { container } = render(<FloatingChat />);
    expect(container).toBeTruthy();
  });

  it("muestra el botón flotante", () => {
    render(<FloatingChat />);
    expect(screen.getByLabelText("Abrir contacto rápido")).toBeInTheDocument();
  });

  it("abre el panel al hacer click", () => {
    render(<FloatingChat />);
    const btn = screen.getByLabelText("Abrir contacto rápido");
    fireEvent.click(btn);
    expect(screen.getByText("SEMTA responde")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp directo")).toBeInTheDocument();
  });

  it("cierra el panel con el botón de cerrar", async () => {
    render(<FloatingChat />);
    fireEvent.click(screen.getByLabelText("Abrir contacto rápido"));
    const btn = screen.getByLabelText("Cerrar panel de contacto");
    fireEvent.click(btn);
    // El botón flotante vuelve a su estado "abrir" tras cerrar el panel.
    await waitFor(() => {
      expect(screen.getByLabelText("Abrir contacto rápido")).toBeInTheDocument();
    });
  });
});

describe("BackToTop", () => {
  it("no aparece sin scroll", () => {
    render(<BackToTop />);
    expect(screen.queryByLabelText("Volver arriba")).not.toBeInTheDocument();
  });

  it("aparece al hacer scroll", () => {
    Object.defineProperty(window, "scrollY", { value: 400, configurable: true });
    render(<BackToTop />);
    fireEvent.scroll(window);
    expect(screen.getByLabelText("Volver arriba")).toBeInTheDocument();
  });
});
