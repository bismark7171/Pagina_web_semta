export interface IBibliotecaDoc {
  icono: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  gestion: string;
  etiqueta: string;
}

export const bibliotecaDocs: IBibliotecaDoc[] = [
  {
    icono: "book",
    categoria: "Memoria Institucional",
    titulo: "Memoria SEMTA 2024",
    descripcion: "Balance anual de programas, resultados en territorio y estados financieros auditados.",
    gestion: "2024",
    etiqueta: "PDF",
  },
  {
    icono: "account_balance",
    categoria: "Estados Financieros",
    titulo: "Cierre de Gestión 2023",
    descripcion: "Ejecución presupuestaria certificada por auditoría independiente.",
    gestion: "2023",
    etiqueta: "PDF",
  },
  {
    icono: "menu_book",
    categoria: "Manual Técnico",
    titulo: "Guía de Cosecha de Agua en el Altiplano",
    descripcion: "Criterios de diseño de atajados, qochas y microriego comunitario.",
    gestion: "2022",
    etiqueta: "Descargable",
  },
  {
    icono: "biotech",
    categoria: "Manual Técnico",
    titulo: "Biofertilizantes y Microorganismos",
    descripcion: "Recetario práctico de producción casera de biol y microorganismos de montaña.",
    gestion: "2022",
    etiqueta: "Descargable",
  },
  {
    icono: "badge",
    categoria: "Documento de Gestión",
    titulo: "Estatuto Orgánico SEMTA",
    descripcion: "Estatuto, reglamento interno y acreditaciones vigentes.",
    gestion: "2021",
    etiqueta: "PDF",
  },
  {
    icono: "analytics",
    categoria: "Estudios",
    titulo: "Línea Base de Bofedales Altoandinos",
    descripcion: "Estudio de capacidad de carga y restauración de humedales en cuencas intervenidas.",
    gestion: "2020",
    etiqueta: "Estudio",
  },
  {
    icono: "campaign",
    categoria: "Boletín",
    titulo: "Noticias del Territorio N° 12",
    descripcion: "Cosechas de agua, ferias agroecológicas y formación de nuevos talentos.",
    gestion: "2025",
    etiqueta: "Revista",
  },
  {
    icono: "verified_user",
    categoria: "Informes",
    titulo: "Resultados Verificables por Proyecto",
    descripcion: "Fichas técnicas públicas de cada intervención con indicadores y coberturas.",
    gestion: "Actualizado",
    etiqueta: "En línea",
  },
];

export const bibliotecaDestacados = ["Memoria SEMTA 2024", "Guía de Cosecha de Agua en el Altiplano"];
