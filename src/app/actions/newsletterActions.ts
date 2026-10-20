"use server";

import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email")?.toString().trim();

    if (!email) {
      return { success: false, error: "Por favor, ingresa tu correo electrónico." };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "El correo electrónico no es válido." };
    }

    if (!isFirebaseAdminConfigured()) {
      console.warn("Firebase Admin no está configurado. Simulando suscripción.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    }

    const db = getAdminDb();
    const collectionRef = db.collection("newsletter_subscribers");

    // Check if the email already exists
    const existing = await collectionRef.where("email", "==", email).get();

    if (!existing.empty) {
      return { success: false, error: "Este correo ya está suscrito." };
    }

    // Save to Firestore
    await collectionRef.add({
      email,
      fechaSuscripcion: new Date().toISOString(),
      activo: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Error al suscribirse al boletín:", error);
    return { success: false, error: "Ocurrió un error. Inténtalo de nuevo." };
  }
}
