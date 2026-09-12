import type { INavItem } from "@/types";

export const menuItems: INavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  {
    label: "Líneas de Acción",
    href: "/#lineas-de-accion",
    children: [
      { label: "Agua y Suelo", href: "/#agua-y-suelo" },
      { label: "Agroecología", href: "/#agroecologia" },
      { label: "Forraje y Ganadería", href: "/#forraje-y-ganaderia" },
      { label: "Mujeres y Comunidad", href: "/#mujeres-y-comunidad" },
      {
        label: "Tecnologías Apropiadas",
        href: "/#tecnologias-apropiadas",
      },
    ],
  },
  { label: "Casa SEMTA", href: "/casa-semta" },
  { label: "Biblioteca", href: "/biblioteca" },
  {
    label: "Formación",
    href: "/cursos",
    children: [
      { label: "Cursos y Certificaciones", href: "/cursos" },
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
      { label: "Nosotros", href: "/nosotros" },
      { label: "Transparencia", href: "/transparencia" },
    ],
  },
];

export const headerCta = {
  label: "Contáctanos",
  href: "/contacto",
};
