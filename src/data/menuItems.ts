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
    label: "Comunidad",
    href: "/noticias",
    children: [
      { label: "Noticias", href: "/noticias" },
      { label: "Pasantías 340h", href: "/pasantias" },
      { label: "Agenda de Talleres", href: "/agenda" },
    ],
  },
  { label: "Nosotros", href: "/nosotros" },
];

export const headerCta = {
  label: "Verificar Certificado",
  href: "/verificar-certificado",
};