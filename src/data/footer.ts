/**
 * src/data/footer.ts
 * Enlaces, datos de contacto y estructura de navegación para el pie de página.
 */

export const footerColumns = [
  {
    title: "Institución",
    links: [
      { label: "Quiénes Somos", href: "/nosotros" },
      { label: "Proyectos en Territorio", href: "/proyectos" },
      { label: "Transparencia y Cuentas", href: "/transparencia" },
      { label: "Casa SEMTA (Sopocachi)", href: "/casa-semta" },
      { label: "Pasantías 340h", href: "/pasantias" },
    ],
  },
  {
    title: "Servicios y Recursos",
    links: [
      { label: "Biblioteca Digital", href: "/biblioteca" },
      { label: "Cursos y Certificaciones", href: "/cursos" },
      { label: "Verificar Certificado QR", href: "/verificar-certificado" },
      { label: "Agenda de Talleres", href: "/agenda" },
      { label: "Reservar Espacios", href: "/reservar" },
    ],
  },
  {
    title: "Comunidad y Contacto",
    links: [
      { label: "Noticias y Novedades", href: "/noticias" },
      { label: "Escríbenos", href: "/contacto" },
      { label: "Política de Privacidad", href: "/privacidad" },
    ],
  },
];

export const footerContact = {
  direccion: "Av. Ecuador 2450, Sopocachi, La Paz - Bolivia",
  telefono: "+591 2 2412345",
  email: "info@semta.org.bo",
};

export const footerSocials = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter / X", href: "#", icon: "x" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

export const footerData = {
  heading: "SEMTA - Servicios Múltiples de Tecnologías Apropiadas",
  subheading:
    "Organización no gubernamental boliviana sin fines de lucro con Personería Jurídica reconocida. Trabajamos desde 1980 junto a comunidades andinas y valles en agroecología, microriego y tecnologías apropiadas.",
  columns: footerColumns,
  contact: footerContact,
  socials: footerSocials,
};

export default footerColumns;
