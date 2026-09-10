export const siteDetails = {
  siteName: "SEMTA",
  // En producción cambiar a https://semta.org.bo cuando tengas dominio propio
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pagina-web-semta.vercel.app",
  metadata: {
    title: "SEMTA · Siembra de Resiliencia Agroecológica en Bolivia",
    description:
      "SEMTA (Servicios Múltiples de Tecnologías Apropiadas). 40+ años fortaleciendo la resiliencia agroecológica comunitaria, la seguridad hídrica y las tecnologías apropiadas en el Altiplano y Valles de Bolivia.",
  },
  contacto: {
    email: "info@semta.org.bo",
    telefono: "+591 2 241 2345",
    direccion: "Calle Alfredo Ascarrunz N° 2675, Sopocachi, La Paz, Bolivia",
    horario: "Lun a Vie: 08:30 - 18:00",
  },
  redes: [
    { nombre: "Facebook", icono: "facebook", url: "https://facebook.com" },
    { nombre: "Instagram", icono: "instagram", url: "https://instagram.com" },
    { nombre: "LinkedIn", icono: "linkedin", url: "https://linkedin.com" },
    { nombre: "YouTube", icono: "youtube", url: "https://youtube.com" },
    { nombre: "WhatsApp", icono: "whatsapp", url: "https://wa.me/59122412345" },
  ],
};