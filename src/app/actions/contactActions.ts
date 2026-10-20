"use server";

import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function enviarMensajeContacto(formData: {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}) {
  try {
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      return { success: false, error: "Por favor, completa los campos requeridos." };
    }

    if (!isFirebaseAdminConfigured()) {
      console.warn("Firebase Admin no está configurado. Simulando envío de mensaje.");
      // Simulamos latencia
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    }

    const db = getAdminDb();

    // Guardar en la colección 'mensajes_contacto'
    await db.collection("mensajes_contacto").add({
      ...formData,
      fechaEnvio: new Date().toISOString(),
      leido: false,
    });

    return { success: true };
  } catch (error) {
    console.error("Error al guardar el mensaje de contacto:", error);
    return { success: false, error: "Ocurrió un error al enviar el mensaje. Inténtalo de nuevo." };
  }
}
