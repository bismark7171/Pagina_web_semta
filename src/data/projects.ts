/**
 * src/data/projects.ts
 * Catálogo estático de respaldo de proyectos ejecutados y en curso de SEMTA.
 */

import type { IProject, ProjectEstado } from "@/types";

export const proyectoEstados: Record<string, { color: string; tint: string }> = {
  Concluido: { color: "#0d631b", tint: "rgba(13, 99, 27, 0.14)" },
  "En Ejecución": { color: "#b96b00", tint: "rgba(185, 107, 0, 0.14)" },
  "En ejecucion": { color: "#b96b00", tint: "rgba(185, 107, 0, 0.14)" },
  Planificado: { color: "#1b628b", tint: "rgba(27, 98, 139, 0.14)" },
};

export const projects: IProject[] = [
  {
    id: "P-001",
    titulo: "Cosecha de Agua y Microriego en Batallas",
    descripcion:
      "Construcción de atajados familiares impermeabilizados con geomembrana y sistemas de riego por goteo para mitigación de sequías extremas.",
    estado: "Concluido",
    tipo: "Agua y Riego",
    municipio: "Batallas",
    financiador: "COSUDE",
    cooperante: "COSUDE",
    beneficiarios: "420 Familias",
    gestion: "2023",
    ubicacion: "Batallas, La Paz",
    imagen:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    alt: "Sistema de cosecha de agua comunitaria en Batallas",
    codigo: "ID: P-001",
    boton: "Ficha Técnica",
    search: "cosecha de agua y microriego en batallas cosude concluido agua y riego la paz",
    destacado: true,
  },
  {
    id: "P-002",
    titulo: "Bioinsumos y Resiliencia Agroecológica en Achacachi",
    descripcion:
      "Instalación de biofábricas comunitarias para producción de bioles, caldos minerales y microorganismos nativos de montaña.",
    estado: "En Ejecución",
    tipo: "Agroecología",
    municipio: "Achacachi",
    financiador: "Unión Europea",
    cooperante: "Unión Europea",
    beneficiarios: "650 Productores",
    gestion: "2024",
    ubicacion: "Achacachi, La Paz",
    imagen:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
    alt: "Parcela agroecológica demostrativa en Achacachi",
    codigo: "ID: P-002",
    boton: "Ficha Técnica",
    search: "bioinsumos y resiliencia agroecologica en achacachi union europea en ejecucion",
    destacado: true,
  },
  {
    id: "P-003",
    titulo: "Bombeo Solar y Riego Presurizado en Patacamaya",
    descripcion:
      "Sistemas fotovoltaicos sumergibles de bombeo de agua subterránea para abastecimiento de huertos familiares y ganado lechero.",
    estado: "Planificado",
    tipo: "Tecnologías Solares",
    municipio: "Patacamaya",
    financiador: "Pan para el Mundo",
    cooperante: "Pan para el Mundo",
    beneficiarios: "310 Familias",
    gestion: "2025",
    ubicacion: "Patacamaya, La Paz",
    imagen:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    alt: "Paneles solares y sistema de bombeo de agua en Patacamaya",
    codigo: "ID: P-003",
    boton: "Ficha Técnica",
    search: "bombeo solar y riego presurizado en patacamaya pan para el mundo planificado",
  },
  {
    id: "P-004",
    titulo: "Empoderamiento y Liderazgo de Mujeres Rurales en Tiwanaku",
    descripcion:
      "Fortalecimiento de asociaciones de mujeres campesinas productoras de hortalizas bajo carpas solares y comercialización asociativa.",
    estado: "En Ejecución",
    tipo: "Liderazgo de Mujeres",
    municipio: "Tiwanaku",
    financiador: "MISEREOR",
    cooperante: "MISEREOR",
    beneficiarios: "380 Mujeres Lideresas",
    gestion: "2024",
    ubicacion: "Tiwanaku, La Paz",
    imagen:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    alt: "Mujeres campesinas en asamblea comunitaria en Tiwanaku",
    codigo: "ID: P-004",
    boton: "Ficha Técnica",
    search: "empoderamiento y liderazgo de mujeres rurales en tiwanaku misereor en ejecucion",
    destacado: true,
  },
  {
    id: "P-005",
    titulo: "Recuperación y Manejo Integral de Bofedales en Sajama",
    descripcion:
      "Conservación comunitaria de humedales de altura y bofedales andinos para preservación del hábitat de camélidos y recarga hídrica.",
    estado: "Concluido",
    tipo: "Agua y Riego",
    municipio: "Curahuara de Carangas",
    financiador: "HELVETAS",
    cooperante: "HELVETAS",
    beneficiarios: "290 Familias Originarias",
    gestion: "2023",
    ubicacion: "Sajama, Oruro",
    imagen:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    alt: "Bofedal andino protegido al pie del nevado Sajama",
    codigo: "ID: P-005",
    boton: "Ficha Técnica",
    search: "recuperacion y manejo integral de bofedales en sajama helvetas concluido oruro",
  },
  {
    id: "P-006",
    titulo: "Invernaderos Familiares Bioclimáticos en Viacha",
    descripcion:
      "Construcción y manejo de walipinis subterráneos con masa térmica para cultivo de hortalizas y plantas medicinales a 4.000 msnm.",
    estado: "Concluido",
    tipo: "Agroecología",
    municipio: "Viacha",
    financiador: "COSUDE",
    cooperante: "COSUDE",
    beneficiarios: "510 Familias",
    gestion: "2022",
    ubicacion: "Viacha, La Paz",
    imagen:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    alt: "Walipini invernadero bioclimático familiar en Viacha",
    codigo: "ID: P-006",
    boton: "Ficha Técnica",
    search: "invernaderos familiares bioclimaticos en viacha cosude concluido agroecologia",
  },
];

export default projects;

/** Orden canónico de estados para los chips del filtro. */
export const proyectoEstadosOrden: ProjectEstado[] = ["Planificado", "En Ejecución", "Concluido"];

/** Tipos únicos presentes en el catálogo (para el filtro). */
export const tiposProyecto: string[] = [...new Set(projects.map((p) => p.tipo))];

/** Municipios únicos presentes en el catálogo (respaldo del filtro). */
export const municipiosProyecto: string[] = [...new Set(projects.map((p) => p.municipio))].sort();
