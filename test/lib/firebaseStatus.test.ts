/**
 * test/lib/firebaseStatus.test.ts
 * Fase E: diagnóstico de variables de entorno / conectividad Firestore.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  adminConfigurado,
  getFirebaseStatus,
  varsFaltantesAdmin,
  varsFaltantesWeb,
  webConfigurado,
} from "@/lib/firebase/status";
import { getAdminDb } from "@/lib/firebase/admin";

const WEB_VARS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const ADMIN_VARS = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];

beforeEach(() => {
  vi.resetModules();
  WEB_VARS.forEach((v) => delete process.env[v]);
  ADMIN_VARS.forEach((v) => delete process.env[v]);
});

describe("webConfigurado", () => {
  it("false si faltan todas las variables NEXT_PUBLIC_FIREBASE_*", () => {
    expect(webConfigurado()).toBe(false);
    expect(varsFaltantesWeb()).toEqual(WEB_VARS);
  });

  it("true si están las 6 variables web", () => {
    WEB_VARS.forEach((v) => (process.env[v] = "presente"));
    expect(webConfigurado()).toBe(true);
    expect(varsFaltantesWeb()).toEqual([]);
  });
});

describe("adminConfigurado", () => {
  it("false si faltan las variables Admin", () => {
    process.env.FIREBASE_PROJECT_ID = "semta-test";
    expect(adminConfigurado()).toBe(false);
    expect(varsFaltantesAdmin()).toEqual(["FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"]);
  });

  it("true si están las 3 variables Admin", () => {
    ADMIN_VARS.forEach((v) => (process.env[v] = "presente"));
    expect(adminConfigurado()).toBe(true);
    expect(varsFaltantesAdmin()).toEqual([]);
  });
});

describe("getFirebaseStatus", () => {
  it("reporta vars faltantes sin conectar si falta Admin config", async () => {
    process.env.FIREBASE_PROJECT_ID = "semta-test";
    const status = await getFirebaseStatus();

    expect(status.adminConfigurado).toBe(false);
    expect(status.firestoreDisponible).toBe(false);
    expect(status.totalProyectos).toBeNull();
    expect(status.error).toContain("FIREBASE_PRIVATE_KEY");
  });

  it("cuenta proyectos si Firestore responde", async () => {
    ADMIN_VARS.forEach((v) => (process.env[v] = "presente"));

    const fakeCount = {
      get: vi.fn(async () => ({ data: () => ({ count: 3 }) })),
    };
    const fakeCollection = {
      count: vi.fn(() => fakeCount),
    };
    const fakeDb = {
      collection: vi.fn(() => fakeCollection),
    };
    vi.mocked(getAdminDb).mockReturnValue(fakeDb as never);

    const status = await getFirebaseStatus();
    expect(status.adminConfigurado).toBe(true);
    expect(status.firestoreDisponible).toBe(true);
    expect(status.totalProyectos).toBe(3);
    expect(status.error).toBeNull();
  });

  it("reporta colección vacía como 0 proyectos", async () => {
    ADMIN_VARS.forEach((v) => (process.env[v] = "presente"));

    const fakeDb = {
      collection: vi.fn(() => ({
        count: () => ({
          get: vi.fn(async () => ({ data: () => ({ count: 0 }) })),
        }),
      })),
    };
    vi.mocked(getAdminDb).mockReturnValue(fakeDb as never);

    const status = await getFirebaseStatus();
    expect(status.firestoreDisponible).toBe(true);
    expect(status.totalProyectos).toBe(0);
  });

  it("captura errores de conexión", async () => {
    ADMIN_VARS.forEach((v) => (process.env[v] = "presente"));
    vi.mocked(getAdminDb).mockImplementation(() => {
      throw new Error("getaddrinfo ENOTFOUND firestore");
    });

    const status = await getFirebaseStatus();
    expect(status.firestoreDisponible).toBe(false);
    expect(status.error).toContain("ENOTFOUND");
  });
});
