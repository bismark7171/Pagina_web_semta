/**
 * src/data/pasantias.ts
 * Información de la convocatoria de pasantías técnicas y universitarias de 340 horas.
 */

export const pasantiasData = {
  duracion: "340 horas académicas",
  modalidad: "Campo y Gabinete",
  regiones: ["Altiplano Norte", "Altiplano Central", "Valles Interandinos"],
  areas: [
    {
      icono: "water_drop",
      label: "Gestión Integral del Agua y Riego",
      descripcion:
        "Levantamiento topográfico, dimensionamiento de atajados, monitoreo de calidad de agua y aforos de vertientes.",
    },
    {
      icono: "grass",
      label: "Agroecología y Suelos Vivos",
      descripcion:
        "Ensayos de bioinsumos, muestreo de microbiología de suelos, manejo integrado de plagas y bancos de semillas.",
    },
    {
      icono: "solar_power",
      label: "Energías Renovables y Tecnologías Apropiadas",
      descripcion:
        "Diseño e instalación de bombas solares, secadores solares de alimentos y biodigestores comunitarios.",
    },
    {
      icono: "diversity_3",
      label: "Desarrollo Comunitario y Género",
      descripcion:
        "Facilitación de metodologías participativas, diagnóstico comunal y fortalecimiento de lideresas indígenas.",
    },
  ],
  requisitos: [
    "Estudiantes de último año o egresados de Agronomía, Ing. Ambiental, Civil, Sociología o afines.",
    "Compromiso ético con las comunidades campesinas y disposición para trabajo en campo en altura.",
    "Carta de presentación institucional o académica emitida por la universidad o instituto técnico.",
    "Conocimiento básico de aymara o quechua es altamente valorado.",
  ],
  beneficios: [
    "Certificado oficial de 340 horas avalado con código QR para convalidación académica universitaria.",
    "Cobertura de viáticos de traslado a campo, alimentación y hospedaje en campamentos comunitarios.",
    "Tutoría personalizada por ingenieros y especialistas con más de 15 años de trayectoria.",
    "Posibilidad de inserción en bolsa de trabajo y proyectos contratados de la institución.",
  ],
  pasos: [
    {
      numero: "01",
      titulo: "Postulación Online",
      descripcion:
        "Completa el formulario de postulación adjuntando tu hoja de vida y carta de tu casa de estudios.",
    },
    {
      numero: "02",
      titulo: "Entrevista Técnica",
      descripcion:
        "Conversatorio con el equipo técnico y asignación de línea temática según vocación e interés.",
    },
    {
      numero: "03",
      titulo: "Inducción y Salida a Campo",
      descripcion:
        "Capacitación en salvaguardas comunitarias, protocolos de seguridad y despliegue territorial.",
    },
    {
      numero: "04",
      titulo: "Informe y Certificación",
      descripcion:
        "Presentación del informe final de prácticas y emisión de certificado institucional de 340 horas con QR.",
    },
  ],
};

export default pasantiasData;
