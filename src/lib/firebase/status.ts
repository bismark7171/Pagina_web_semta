/**
 * status.ts
 * Diagnóstico server-side del estado de Firebase para verificar en Vercel
 * que las variables de entorno quedaron bien configuradas.
 *
 * SOLO corre en el servidor (Server Components, API Routes, build).
 * Nunca devuelve valores secretos — solo booleanos y conteos.
 */

import { getAdminDb } from "./admin";

export interface FirebaseStatus {
  /** Variables del SDK web (NEXT_PUBLIC_FIREBASE_*) presentes o no */
  webConfigurado: boolean;
  /** Variables del Admin SDK (FIREBASE_*) presentes o no */
  adminConfigurado: boolean;
  /** Firestore responde a una lectura mínima */
  firestoreDisponible: boolean;
  /** Nº de proyectos en la colección "proyectos" (si admin OK) */
  totalProyectos: number | null;
  error: string | null;
}

const WEB_VARS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

const ADMIN_VARS = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
] as const;

export function webConfigurado(): boolean {
  return WEB_VARS.every((v) => Boolean(process.env[v]));
}

export function adminConfigurado(): boolean {
  return ADMIN_VARS.every((v) => Boolean(process.env[v]));
}

export function varsFaltantesAdmin(): string[] {
  return ADMIN_VARS.filter((v) => !process.env[v]);
}

export function varsFaltantesWeb(): string[] {
  return WEB_VARS.filter((v) => !process.env[v]);
}

export async function getFirebaseStatus(): Promise<FirebaseStatus> {
  const base: FirebaseStatus = {
    webConfigurado: webConfigurado(),
    adminConfigurado: adminConfigurado(),
    firestoreDisponible: false,
    totalProyectos: null,
    error: null,
  };

  if (!adminConfigurado()) {
    return {
      ...base,
      error: `Faltan variables Admin: ${varsFaltantesAdmin().join(", ")}`,
    };
  }

  try {
    const db = getAdminDb();
    const snap = await db.collection("proyectos").count().get();
    base.firestoreDisponible = true;
    base.totalProyectos = snap.data().count;
  } catch (err) {
    base.error = err instanceof Error ? err.message : "No se pudo conectar con Firestore";
  }

  return base;
}
