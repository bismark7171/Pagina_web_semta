export interface IAvisoTaller {
  fecha: string;
  hora: string;
  titulo: string;
  lugar: string;
  modalidad: "Presencial" | "Híbrido" | "En línea";
  cupos: number;
  estado: "Abierto" | "En curso" | "Convocatoria";
}

export const agendaTalleres: IAvisoTaller[] = [
  {
    fecha: "2026-10-15",
    hora: "09:00 - 13:00",
    titulo: "Huertos urbanos biointensivos para balcones y patios",
    lugar: "Casa SEMTA · Sopocachi",
    modalidad: "Presencial",
    cupos: 20,
    estado: "Abierto",
  },
  {
    fecha: "2026-10-22",
    hora: "15:00 - 18:00",
    titulo: "Producción de biol y microorganismos de montaña",
    lugar: "Casa SEMTA · Sopocachi",
    modalidad: "Presencial",
    cupos: 16,
    estado: "Abierto",
  },
  {
    fecha: "2026-10-29",
    hora: "18:30 - 20:00",
    titulo: "Cosecha de agua de lluvia en tu vivienda (webinar)",
    lugar: "Plataforma en línea",
    modalidad: "En línea",
    cupos: 60,
    estado: "Abierto",
  },
  {
    fecha: "2026-11-05",
    hora: "09:00 - 12:30",
    titulo: "Bioconstrucción con tierra y adobe",
    lugar: "Casa SEMTA · Sopocachi",
    modalidad: "Presencial",
    cupos: 18,
    estado: "Convocatoria",
  },
  {
    fecha: "2026-11-12",
    hora: "10:00 - 14:00",
    titulo: "Feria de semillas nativas y bio-insumos",
    lugar: "Patio Casa SEMTA · Sopocachi",
    modalidad: "Presencial",
    cupos: 80,
    estado: "Convocatoria",
  },
  {
    fecha: "2026-11-19",
    hora: "09:00 - 13:00",
    titulo: "Secadores solares y conservación de alimentos",
    lugar: "Casa SEMTA · Sopocachi",
    modalidad: "Híbrido",
    cupos: 24,
    estado: "Convocatoria",
  },
];
