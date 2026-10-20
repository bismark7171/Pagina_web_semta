/**
 * src/data/cursos.ts
 * Catálogo de cursos, talleres de especialización y garantías de certificación SEMTA.
 */

import type { ICurso } from "@/types";

export const cursosFallback: ICurso[] = [
  {
    id: "curso-agroecologia-andina",
    nombre: "Especialización en Agroecología Andina y Manejo de Suelos Vivos",
    descripcion:
      "Técnicas avanzadas de regeneración biológica del suelo, bioles enriquecidos, manejo integrado de plagas nativas y rotación de cultivos en altura.",
    estaActivo: true,
    fechaInicio: "15 Mayo 2025",
    fechaFin: "15 Junio 2025",
    cargaHoraria: 80,
    duracionTexto: "5 semanas (híbrido)",
    modalidad: "Semipresencial con talleres de campo",
    plataforma: "Campus SEMTA / Luribay",
    ctaTexto: "Inscribirme al curso",
    modulos: [
      {
        titulo: "Módulo 1: Microbiología y Enmiendas Orgánicas",
        detalle: "Captura de microorganismos de bosque, compostaje aeróbico y bocashi andino.",
      },
      {
        titulo: "Módulo 2: Manejo Ecológico de Plagas y Enfermedades",
        detalle: "Caldos minerales (sulfo-cálcico, bordelés) y extractos botánicos de la región.",
      },
      {
        titulo: "Módulo 3: Diseño de Parcelas Agroecológicas Resilientes",
        detalle: "Curvas de nivel, barreras vivas y cortinas rompevientos contra heladas.",
      },
    ],
  },
  {
    id: "curso-cosecha-agua",
    nombre: "Técnicas de Cosecha de Agua y Microriego Tecnificado",
    descripcion:
      "Diseño participativo, dimensionamiento hidrológico y construcción de atajados familiares y sistemas de riego presurizado por goteo.",
    estaActivo: true,
    fechaInicio: "01 Junio 2025",
    fechaFin: "28 Junio 2025",
    cargaHoraria: 60,
    duracionTexto: "4 semanas",
    modalidad: "Práctica intensiva en comunidades",
    plataforma: "Altiplano Central",
    ctaTexto: "Inscribirme al curso",
    modulos: [
      {
        titulo: "Módulo 1: Hidrología Comunitaria y Captación",
        detalle: "Cálculo de escorrentía, geomembranas y protección de cuencas aportantes.",
      },
      {
        titulo: "Módulo 2: Microriego por Goteo y Aspersión de Bajo Costo",
        detalle: "Instalación de cabezales de filtrado, tuberías y emisores de bajo mantenimiento.",
      },
    ],
  },
  {
    id: "curso-genero-liderazgo",
    nombre: "Liderazgo Rural, Género y Gobernanza Comunitaria del Agua",
    descripcion:
      "Fortalecimiento de capacidades directivas para dirigentas comunitarias, gestión de conflictos socioambientales y derechos colectivos.",
    estaActivo: false,
    fechaInicio: "10 Octubre 2024",
    fechaFin: "15 Noviembre 2024",
    cargaHoraria: 40,
    duracionTexto: "4 semanas",
    modalidad: "Presencial comunitario",
    plataforma: "Casa SEMTA",
    ctaTexto: "Ver contenido del curso",
    modulos: [
      {
        titulo: "Módulo 1: Derechos Colectivos y Participación de la Mujer",
        detalle: "Marcos legales, usos y costumbres y liderazgo transformador.",
      },
      {
        titulo: "Módulo 2: Comités Comunitarios de Agua",
        detalle: "Estatutos, tarifas solidarias y mantenimiento preventivo con enfoque de género.",
      },
    ],
  },
];

export const garantiasCertificacion = [
  {
    icono: "qr_code_2",
    titulo: "Código QR Único",
    descripcion:
      "Cada certificado porta un hash criptográfico y enlace público directo en semta-bolivia.org/verificar.",
  },
  {
    icono: "history_edu",
    titulo: "40 Años de Respaldo",
    descripcion:
      "Avalado por la personería jurídica histórica y el equipo de especialistas reconocidos de SEMTA.",
  },
  {
    icono: "landscape",
    titulo: "Horas Reales de Campo",
    descripcion:
      "Garantía de práctica directa en parcelas campesinas e instalaciones técnicas demostrativas.",
  },
  {
    icono: "verified_user",
    titulo: "Inalterable y Seguro",
    descripcion:
      "Registro en base de datos protegida contra falsificaciones, emitido por firma autorizada.",
  },
];

export default cursosFallback;
