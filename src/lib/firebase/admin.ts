/**
 * admin.ts
 * Firebase Admin SDK — solo corre en el servidor (Next.js Server Components, API Routes).
 * NUNCA se envía al browser. Las credenciales son privadas.
 *
 * Equivalente al patrón backend de la app Flutter SEMTA pero para Next.js.
 */

import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// ─── Singleton ────────────────────────────────────────────────────────────────

let adminApp: App;
let adminDb: Firestore;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  // Las variables de entorno privadas (sin NEXT_PUBLIC_) solo existen en el servidor
  const projectId  = process.env.FIREBASE_PROJECT_ID!;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
  // Vercel guarda el private key con \n escapados — hay que reemplazarlos
  const privateKey  = (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Faltan variables de entorno Firebase Admin. " +
      "Configura FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY."
    );
  }

  adminApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });

  return adminApp;
}

export function getAdminDb(): Firestore {
  if (adminDb) return adminDb;
  getAdminApp();
  adminDb = getFirestore();
  return adminDb;
}
