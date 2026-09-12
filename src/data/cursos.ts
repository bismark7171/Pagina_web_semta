/**
 * cursos.ts
 * Datos estáticos de fallback para la página de Cursos y Certificaciones.
 * Se usan cuando Firestore no está disponible.
 * En producción, la página carga desde Firestore via cursosService + cursosAdapter.
 */

import type { ICurso } from "@/types";

export const cursosFallback: ICurso[] = [
  {
    id: "fallback-curso-001",
    nombre: "Formación de Formadores en Género y Desarrollo Rural",
    modulos: [
      "Módulo 1: Perspectiva de Género en el Desarrollo Rural",
      "Módulo 2: Metodologías Participativas con Comunidades",
      "Módulo 3: Diseño de Talleres Comunitarios",
      "Módulo 4: Monitoreo y Evaluación con Enfoque de Género",
    ],
    fechaInicio: "01/03/2025",
    fechaFin: "30/05/2025",
    cargaHoraria: 120,
    plataforma: "ZOOM",
    duracionTexto: "3 meses",
    estaActivo: true,
  },
  {
    id: "fallback-curso-002",
    nombre: "Técnicas de Cosecha de Agua y Microriego Comunitario",
    modulos: [
      "Módulo 1: Hidrología de Cuencas Altoandinas",
      "Módulo 2: Diseño de Atajados y Qochas",
      "Módulo 3: Instalación de Sistemas de Aspersión",
      "Módulo 4: Gestión Comunitaria del Agua",
    ],
    fechaInicio: "15/04/2025",
    fechaFin: "15/07/2025",
    cargaHoraria: 160,
    plataforma: "Presencial",
    duracionTexto: "3 meses",
    estaActivo: true,
  },
  {
    id: "fallback-curso-003",
    nombre: "Agroecología y Producción de Bioinsumos",
    modulos: [
      "Módulo 1: Fundamentos de Agroecología Andina",
      "Módulo 2: Producción de Biol y Microorganismos",
      "Módulo 3: Manejo Integrado de Plagas",
    ],
    fechaInicio: "01/02/2025",
    fechaFin: "28/02/2025",
    cargaHoraria: 40,
    plataforma: "Presencial",
    duracionTexto: "1 mes",
    estaActivo: false,
  },
];

/** Garantías que se muestran en la sección de confianza */
export const garantiasCertificacion = [
  {
    icono: "verified",
    titulo: "Certificado con QR único",
    descripcion:
      "Cada certificado tiene un código QR irrepetible verificable en la app SEMTA. Imposible de falsificar.",
  },
  {
    icono: "history_edu",
    titulo: "Aval institucional de 40 años",
    descripcion:
      "SEMTA opera desde 1982. Los certificados llevan el respaldo de décadas de trabajo técnico en Bolivia.",
  },
  {
    icono: "groups",
    titulo: "Docentes con experiencia en campo",
    descripcion:
      "No teoría de aula: formadores que trabajan en territorio con comunidades campesinas e indígenas.",
  },
  {
    icono: "public",
    titulo: "Verificación pública permanente",
    descripcion:
      "Cualquier persona puede verificar la autenticidad de un certificado SEMTA desde la app, sin límite de tiempo.",
  },
];
