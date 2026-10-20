/**
 * src/data/casaSemta.ts
 * Servicios y galería de espacios de Casa SEMTA en Sopocachi, La Paz.
 */

import type { IServicioCasa, ICasaPhoto } from "@/types";

export const casaSemtaServicios: IServicioCasa[] = [
  {
    titulo: "Alquiler de Salas y Auditorio",
    descripcion:
      "Ambientes confortables y equipados con proyector, audio y conectividad de alta velocidad para asambleas, talleres y eventos de cooperación.",
    imagen:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    alt: "Sala de conferencias y reuniones en Casa SEMTA",
    badgeIcono: "meeting_room",
    badgeTexto: "Eventos & Talleres",
    checks: [
      "Capacidad para 15 a 60 participantes",
      "Proyector HD, ecualizador de sonido y rotafolios",
      "Servicio de café agroecológico y refrigerios andinos",
      "Iluminación natural y ventilación bioclimática",
    ],
    modalidadLabel: "Disponibilidad",
    modalidad: "Por horas o jornadas completas",
  },
  {
    titulo: "Hospedaje Solidario e Institucional",
    descripcion:
      "Alojamiento cálido y tranquilo para investigadores, voluntarios, delegaciones comunitarias y miembros de ONGs en zona central y segura.",
    imagen:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    alt: "Habitación de hospedaje solidario en Casa SEMTA",
    badgeIcono: "hotel",
    badgeTexto: "Alojamiento",
    checks: [
      "Habitaciones simples, dobles y compartidas",
      "Agua caliente solar 24/7 y calefacción pasiva",
      "Cocina comunitaria y acceso al patio andino",
      "Ubicación céntrica en Sopocachi con transporte inmediato",
    ],
    modalidadLabel: "Tarifas",
    modalidad: "Por noche o estadías extendidas",
  },
  {
    titulo: "Tienda y Punto Agroecológico",
    descripcion:
      "Comercialización directa de productos agroecológicos producidos por asociaciones campesinas e indígenas vinculadas a los proyectos de SEMTA.",
    imagen:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    alt: "Productos andinos agroecológicos en la tienda de Casa SEMTA",
    badgeIcono: "storefront",
    badgeTexto: "Comercio Justo",
    checks: [
      "Quinua real orgánica, derivados de amaranto y cañahua",
      "Miel de bosque nativo y mermeladas artesanales",
      "Infusiones medicinales tradicionales y bioinsumos",
      "100% de ingresos retornan a las comunidades productoras",
    ],
    modalidadLabel: "Atención",
    modalidad: "Lunes a Viernes de 9:00 a 18:00",
  },
  {
    titulo: "Asesoría Técnica y Consultorías",
    descripcion:
      "Acompañamiento especializado a gobiernos locales, instituciones de desarrollo y organizaciones en agroecología, riego y cambio climático.",
    imagen:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipo técnico de SEMTA brindando asesoría especializada",
    badgeIcono: "engineering",
    badgeTexto: "Consultoría",
    checks: [
      "Diseño e ingeniería de cosecha de agua de lluvia",
      "Evaluación de impacto ambiental y resiliencia andina",
      "Sistematización de experiencias y manuales comunitarios",
      "Capacitaciones in situ a equipos técnicos municipales",
    ],
    modalidadLabel: "Modalidad",
    modalidad: "Bajo requerimiento y convenio",
  },
];

export const casaSemtaPhotogrid: ICasaPhoto[] = [
  {
    imagen:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
    alt: "Patio central bioclimático de Casa SEMTA en Sopocachi",
    caption: "Patio central con vegetación andina y luz natural",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    alt: "Auditorio principal configurado para taller participativo",
    caption: "Auditorio con capacidad para 60 personas",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    alt: "Habitación individual de hospedaje solidario",
    caption: "Habitación cómoda y silenciosa para estadías",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    alt: "Área de comedor y cocina comunitaria",
    caption: "Cocina equipada para huéspedes y eventos",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Jardín demostrativo de plantas medicinales en Casa SEMTA",
    caption: "Huerto urbano demostrativo en terraza",
  },
];

export const casaSemtaHero = {
  imagen:
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
  alt: "Patio interior bioclimático de Casa SEMTA en Sopocachi",
  direccion: "Av. Ecuador 2450, Sopocachi, La Paz",
  horario: "Lunes a Viernes 08:30 - 18:30",
};

export const casaSemtaMetrics = [
  {
    icono: "meeting_room",
    valor: "3",
    titulo: "Salas Equipadas",
    detalle: "Auditorio, taller y reuniones",
    descripcion: "Auditorio, taller y reuniones",
    color: "text-primary-fixed",
  },
  {
    icono: "bed",
    valor: "12",
    titulo: "Plazas de Hospedaje",
    detalle: "Alojamiento solidario",
    descripcion: "Alojamiento solidario",
    color: "text-secondary-fixed",
  },
  {
    icono: "storefront",
    valor: "1",
    titulo: "Punto Agroecológico",
    detalle: "Comercio justo campesino",
    descripcion: "Comercio justo campesino",
    color: "text-tertiary-fixed",
  },
  {
    icono: "solar_power",
    valor: "100%",
    titulo: "Energía Solar Activa",
    detalle: "Agua caliente y térmica",
    descripcion: "Agua caliente y térmica",
    color: "text-primary-fixed",
  },
];

export const casaSemtaFaq = [
  {
    pregunta: "¿Cómo puedo reservar una sala para un taller o reunión institucional?",
    respuesta:
      "Puedes completar el formulario en la sección de reservas o escribirnos directamente a info@semta.org.bo o por WhatsApp. Confirmamos disponibilidad en 24 horas y emitimos factura oficial.",
    icono: "event",
    color: "text-primary",
  },
  {
    pregunta: "¿Quiénes pueden acceder al hospedaje solidario?",
    respuesta:
      "Está orientado prioritariamente a investigadoras/es, delegaciones comunitarias, voluntarios, pasantes y personal de ONGs aliadas que visitan La Paz por motivos de trabajo social, ambiental o académico.",
    icono: "bed",
    color: "text-secondary",
  },
  {
    pregunta: "¿La tienda agroecológica atiende al público en general?",
    respuesta:
      "Sí, cualquier persona puede visitarnos de lunes a viernes en horario continuo para adquirir alimentos andinos limpios, miel pura, infusiones y bio-preparados directo de comunidades del Altiplano.",
    icono: "storefront",
    color: "text-tertiary",
  },
  {
    pregunta: "¿Cuentan con servicio de catering o alimentación para eventos?",
    respuesta:
      "Sí, ofrecemos menús saludables basados en producción agroecológica local andina con opciones vegetarianas y tradicionales preparadas por nuestra cocina.",
    icono: "restaurant",
    color: "text-primary",
  },
];

export default casaSemtaServicios;
