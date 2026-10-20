/**
 * src/data/callouts.ts
 * Secciones de llamada a la acción dual (Formación / Casa SEMTA).
 */

export interface CalloutItem {
  titulo: string;
  icono: string;
  chip: string;
  descripcion: string;
  checks: string[];
  botones: Array<{
    text: string;
    path: string;
    tipo: "primary" | "ghost";
  }>;
}

export const callouts: CalloutItem[] = [
  {
    titulo: "Formación Técnica y Certificaciones Comunitarias",
    icono: "school",
    chip: "Capacitación Práctica",
    descripcion:
      "Programas certificados en agroecología andina, gestión integral del agua y diseño de tecnologías limpias con validez académica.",
    checks: [
      "Modalidades presenciales y semipresenciales en campo",
      "Carga horaria verificable con código QR institucional",
      "Docentes técnicos con experiencia de más de 20 años en terreno",
    ],
    botones: [
      { text: "Explorar cursos", path: "/cursos", tipo: "primary" },
      { text: "Verificar certificación", path: "/verificar-certificado", tipo: "ghost" },
    ],
  },
  {
    titulo: "Casa SEMTA: Espacio de Hospedaje y Encuentros",
    icono: "cottage",
    chip: "Hospedaje & Eventos",
    descripcion:
      "Alojamiento sostenible, auditorio equipado y áreas verdes en Sopocachi (La Paz) para talleres, investigadores y delegaciones.",
    checks: [
      "Habitaciones confortables en zona residencial céntrica",
      "Salas para conferencias, talleres y asambleas institucionales",
      "Comedor con alimentación saludable e ingredientes agroecológicos",
    ],
    botones: [
      { text: "Conocer Casa SEMTA", path: "/casa-semta", tipo: "primary" },
      { text: "Reservar sala", path: "/reservar", tipo: "ghost" },
    ],
  },
];

export default callouts;
