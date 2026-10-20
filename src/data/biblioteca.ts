/**
 * src/data/biblioteca.ts
 * Catálogo de documentos, manuales técnicos y memorias de libre descarga.
 */

import type { ILibro } from "@/types";

export const bibliotecaFallback: ILibro[] = [
  {
    id: "libro-manual-walipini",
    titulo: "Manual de Construcción y Manejo de Invernaderos Subterráneos (Walipinis)",
    autor: "Equipo Técnico SEMTA",
    gestion: "2023",
    categoria: "Tecnologías Apropiadas",
    paginas: 84,
    descripcion:
      "Guía paso a paso con planos constructivos, cálculo de masa térmica y manejo agronómico de cultivos hortícolas en el frío del altiplano.",
    portada:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    urlPdf: "https://semta-bolivia.org/docs/manual-walipinis.pdf",
    esDestacado: true,
    idioma: "Español y Aymara",
    etiquetas: ["destacado", "manual", "invernadero", "walipini"],
    icono: "menu_book",
    search:
      "manual de construcción y manejo de invernaderos subterráneos walipinis equipo técnico semta tecnologías apropiadas destacado manual invernadero walipini",
  },
  {
    id: "libro-cosecha-agua",
    titulo: "Cosecha y Almacenamiento Familiar de Agua de Lluvia en el Altiplano",
    autor: "Ing. Carlos Mendoza / SEMTA",
    gestion: "2022",
    categoria: "Agua y Riego",
    paginas: 68,
    descripcion:
      "Metodología de diseño de atajados familiares impermeabilizados, filtración biológica y sistemas de distribución por gravedad.",
    portada:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    urlPdf: "https://semta-bolivia.org/docs/cosecha-agua-semta.pdf",
    esDestacado: true,
    idioma: "Español",
    etiquetas: ["destacado", "agua", "riego", "atajados"],
    icono: "menu_book",
    search:
      "cosecha y almacenamiento familiar de agua de lluvia en el altiplano carlos mendoza semta agua y riego destacado agua riego atajados",
  },
  {
    id: "libro-memoria-40-anios",
    titulo: "Memoria Institucional: 40 Años de Historia, Resiliencia y Saberes",
    autor: "Directorio Institucional SEMTA",
    gestion: "2022",
    categoria: "Institucional",
    paginas: 120,
    descripcion:
      "Recorrido histórico desde la fundación en 1982 hasta el presente, sistematizando lecciones aprendidas y testimonios de líderes campesinos.",
    portada:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    urlPdf: "https://semta-bolivia.org/docs/memoria-40-anios.pdf",
    esDestacado: false,
    idioma: "Español",
    etiquetas: ["historia", "memoria", "institucional"],
    icono: "book",
    search:
      "memoria institucional 40 años de historia resiliencia y saberes directorio institucional semta institucional historia memoria institucional",
  },
  {
    id: "libro-guia-bioinsumos",
    titulo: "Guía Práctica para la Elaboración Comunitaria de Bioinsumos y Abonos Líquidos",
    autor: "Unidad Agroecológica SEMTA",
    gestion: "2024",
    categoria: "Agroecología",
    paginas: 52,
    descripcion:
      "Fórmulas y procedimientos para elaborar bioles, caldos sulfocálcicos y bokashi utilizando materias primas locales de fácil acceso.",
    portada:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    urlPdf: "https://semta-bolivia.org/docs/guia-bioinsumos.pdf",
    esDestacado: false,
    idioma: "Español",
    etiquetas: ["bioinsumos", "abono", "agroecologia"],
    icono: "menu_book",
    search:
      "guía práctica para la elaboración comunitaria de bioinsumos y abonos líquidos unidad agroecológica semta agroecología bioinsumos abono agroecologia",
  },
  {
    id: "libro-estados-financieros-2023",
    titulo: "Auditoría Financiera y Reporte de Transparencia Gestión 2023",
    autor: "Auditoría Externa Independiente",
    gestion: "2024",
    categoria: "Transparencia",
    paginas: 44,
    descripcion:
      "Informe con dictamen limpio sobre el uso de recursos y ejecución presupuestaria de proyectos de cooperación.",
    portada:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    urlPdf: "https://semta-bolivia.org/docs/auditoria-2023.pdf",
    esDestacado: false,
    idioma: "Español",
    etiquetas: ["transparencia", "finanzas", "auditoria"],
    icono: "account_balance",
    search:
      "auditoría financiera y reporte de transparencia gestión 2023 auditoría externa independiente transparencia transparencia finanzas auditoria",
  },
];

export default bibliotecaFallback;
