import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase de SEMTA
// Las variables de entorno se definen en .env.local (dev) o Vercel (prod)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const VARIABLES_REQUERIDAS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

function configurado(): boolean {
  return VARIABLES_REQUERIDAS.every((v) => Boolean(process.env[v]));
}

if (!configurado()) {
  throw new Error(
    "Faltan variables de entorno del SDK web de Firebase. " +
      "Configura NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, " +
      "STORAGE_BUCKET, MESSAGING_SENDER_ID y APP_ID en .env.local (dev) " +
      "o en Vercel → Settings → Environment Variables (prod).",
  );
}

const appConfig = firebaseConfig as Record<string, string>;

// Singleton: evita inicializar Firebase más de una vez (Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(appConfig) : getApp();

export const db = getFirestore(app);
export default app;
