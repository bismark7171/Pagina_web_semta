/**
 * biblioteca.ts
 * Datos estáticos de fallback para la Biblioteca Digital.
 *
 * Se usan cuando Firestore no está disponible (dev sin credenciales,
 * build CI, error de red). En producción Vercel, la página siempre
 * carga desde Firestore via adminBibliotecaService + bibliotecaAdapter.
 *
 * ⚠️  No eliminar — son el fallback del Server Component.
 * ✅  Mantener en sync con la estructura real de Firestore.
 */

import type { ILibro } from "@/types";

export const bibliotecaFallback: ILibro[] = [
  {
    id: "fallback-001",
    titulo: "Memoria SEMTA 2024",
    autor: "SEMTA",
    descripcion:
      "Balance anual de programas, resultados en territorio y estados financieros auditados.",
    categoria: "Memoria Institucional",
    etiquetas: ["destacado", "institucional", "2024"],
    gestion: "2024",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: true,
    icono: "book",
    search: "memoria semta 2024 institucional balance anual",
  },
  {
    id: "fallback-002",
    titulo: "Guía de Cosecha de Agua en el Altiplano",
    autor: "Equipo Técnico SEMTA",
    descripcion:
      "Criterios de diseño de atajados, qochas y microriego comunitario para comunidades del altiplano boliviano.",
    categoria: "Manual Técnico",
    etiquetas: ["destacado", "agua", "microriego", "técnico"],
    gestion: "2022",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: true,
    icono: "menu_book",
    search: "guia cosecha agua altiplano microriego atajados técnico",
  },
  {
    id: "fallback-003",
    titulo: "Cierre de Gestión 2023",
    autor: "SEMTA",
    descripcion: "Ejecución presupuestaria certificada por auditoría independiente.",
    categoria: "Estados Financieros",
    etiquetas: ["financiero", "auditado"],
    gestion: "2023",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: false,
    icono: "account_balance",
    search: "cierre gestion 2023 estados financieros auditado presupuesto",
  },
  {
    id: "fallback-004",
    titulo: "Biofertilizantes y Microorganismos",
    autor: "Equipo Técnico SEMTA",
    descripcion: "Recetario práctico de producción casera de biol y microorganismos de montaña.",
    categoria: "Manual Técnico",
    etiquetas: ["agroecología", "bioinsumos", "técnico"],
    gestion: "2022",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: false,
    icono: "biotech",
    search: "biofertilizantes microorganismos biol agroecologia manual técnico",
  },
  {
    id: "fallback-005",
    titulo: "Estatuto Orgánico SEMTA",
    autor: "SEMTA",
    descripcion: "Estatuto, reglamento interno y acreditaciones vigentes.",
    categoria: "Documento de Gestión",
    etiquetas: ["gobernanza", "institucional"],
    gestion: "2021",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: false,
    icono: "badge",
    search: "estatuto organico semta reglamento interno acreditaciones gobernanza",
  },
  {
    id: "fallback-006",
    titulo: "Línea Base de Bofedales Altoandinos",
    autor: "Equipo de Investigación SEMTA",
    descripcion:
      "Estudio de capacidad de carga y restauración de humedales en cuencas intervenidas.",
    categoria: "Estudios",
    etiquetas: ["bofedales", "humedales", "investigación"],
    gestion: "2020",
    paginas: 0,
    idioma: "Español",
    portada: null,
    urlPdf: "",
    esDestacado: false,
    icono: "analytics",
    search: "linea base bofedales altoandinos humedales restauracion investigacion",
  },
];
