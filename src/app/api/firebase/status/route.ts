import { NextResponse } from "next/server";
import { getFirebaseStatus } from "@/lib/firebase/status";

// Siempre en vivo para diagnosticar el entorno de Vercel
export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getFirebaseStatus();
  return NextResponse.json(status);
}
