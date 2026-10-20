import type { INavItem } from "@/types";

export const menuItems: INavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  {
    label: "Líneas de Acción",
    href: "/#lineas-de-accion",
    children: [
      { label: "Seguridad Hídrica", href: "/#agua-riego" },
      { label: "Agroecología", href: "/#agroecologia" },
      { label: "Tecnologías Solares", href: "/#energias-renovables" },
      { label: "Gobernanza de Mujeres", href: "/#liderazgo-mujeres" },
    ],
  },
  { label: "Casa SEMTA", href: "/casa-semta" },
  { label: "Biblioteca", href: "/biblioteca" },
  {
    label: "Formación",
    href: "/cursos",
    children: [
      { label: "Cursos y Certificaciones", href: "/cursos" },
      { label: "Verificar Certificado", href: "/verificar-certificado" },
      { label: "Pasantías 340h", href: "/pasantias" },
    ],
  },
  {
    label: "Comunidad",
    href: "/noticias",
    children: [
      { label: "Noticias", href: "/noticias" },
      { label: "Agenda de Talleres", href: "/agenda" },
    ],
  },
  {
    label: "Nosotros",
    href: "/nosotros",
    children: [
      { label: "Historia y Equipo", href: "/nosotros" },
      { label: "Transparencia y Finanzas", href: "/transparencia" },
    ],
  },
];

export const headerCta = {
  label: "Contáctanos",
  href: "/contacto",
};
