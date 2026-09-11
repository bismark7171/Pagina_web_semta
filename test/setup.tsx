import "@testing-library/jest-dom";
import React from "react";

// ─── Mock: next/image ─────────────────────────────────────────────────────────
// Evita errores de server-side rendering en jsdom
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill: _fill,
    sizes: _sizes,
    priority: _priority,
    onError,
    className,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    onError?: () => void;
    className?: string;
  }) => {
    return React.createElement("img", { src, alt, onError, className });
  },
}));

// ─── Mock: next/navigation ────────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// ─── Mock: ResizeObserver ─────────────────────────────────────────────────────
// @headlessui/react usa ResizeObserver para posicionar menús/dialogs
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver =
  globalThis.ResizeObserver ?? (ResizeObserverMock as unknown as typeof ResizeObserver);

// ─── Mock: IntersectionObserver ───────────────────────────────────────────────
// framer-motion lo usa para whileInView (FadeIn) y useInView (CountUp)
class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ??
  (IntersectionObserverMock as unknown as typeof IntersectionObserver);

// ─── Mock: Firebase ───────────────────────────────────────────────────────────
// Los tests de lógica y UI no necesitan Firebase real
vi.mock("@/lib/firebase/config", () => ({
  db: {},
}));

vi.mock("@/lib/firebase/admin", () => ({
  getAdminDb: vi.fn(),
}));
