/**
 * src/data/agenda.ts
 * Talleres, charlas y webinars programados de SEMTA.
 */

export interface AgendaTaller {
  titulo: string;
  fecha: string; // ISO YYYY-MM-DD
  horario: string;
  hora?: string;
  lugar: string;
  modalidad: string;
  cupos: string;
  costo: string;
  estado: "Abierto" | "En curso" | "Convocatoria";
  descripcion: string;
  enlace: string;
}

export const agendaTalleres: AgendaTaller[] = [
  {
    titulo: "Diseño y Mantenimiento de Huertos Urbanos Agroecológicos",
    fecha: "2025-04-18",
    horario: "09:00 - 13:00",
    hora: "09:00 - 13:00",
    lugar: "Casa SEMTA, Sopocachi (La Paz)",
    modalidad: "Presencial",
    cupos: "15 personas",
    costo: "Aporte solidario Bs. 50",
    estado: "Abierto",
    descripcion:
      "Aprende a diseñar tu huerto en espacios reducidos, preparar sustratos vivos, compostaje casero y control orgánico de plagas.",
    enlace: "/contacto?taller=huertos-urbanos",
  },
  {
    titulo: "Cosecha de Agua de Lluvia y Filtración Biológica",
    fecha: "2025-04-26",
    horario: "14:30 - 18:30",
    hora: "14:30 - 18:30",
    lugar: "Auditorio Casa SEMTA & Patio Bioclimático",
    modalidad: "Presencial y transmisión",
    cupos: "25 personas",
    costo: "Gratuito con registro previo",
    estado: "Abierto",
    descripcion:
      "Técnicas accesibles de captación de techos, cálculo de volumen de almacenamiento y filtros de arena para uso domiciliario y riego.",
    enlace: "/contacto?taller=cosecha-agua",
  },
  {
    titulo: "Sistemas Agroforestales Sucesionales en Valles Secos",
    fecha: "2025-05-10",
    horario: "08:30 - 17:00",
    hora: "08:30 - 17:00",
    lugar: "Finca Demostrativa SEMTA (Luribay)",
    modalidad: "Práctica de campo",
    cupos: "20 personas",
    costo: "Bs. 120 (incluye transporte y almuerzo)",
    estado: "Convocatoria",
    descripcion:
      "Jornada práctica de poda, estratificación y diseño de consorcios de frutales y especies fijadoras de nitrógeno.",
    enlace: "/contacto?taller=agroforesteria",
  },
  {
    titulo: "Seminario Virtual: Soberanía de Semillas Nativas Frente a la Sequía",
    fecha: "2025-05-22",
    horario: "18:30 - 20:30",
    hora: "18:30 - 20:30",
    lugar: "Plataforma Virtual Zoom / YouTube Live",
    modalidad: "Online",
    cupos: "Ilimitado",
    costo: "Ingreso libre",
    estado: "Abierto",
    descripcion:
      "Mesa redonda con custodias y custodios comunitarios de semillas de quinua, papa nativa y forrajes del Altiplano.",
    enlace: "/contacto?taller=semillas-nativas",
  },
];

export default agendaTalleres;
