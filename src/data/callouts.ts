import type { ICallout } from '@/types';

export const callouts: ICallout[] = [
  {
    chip: "Formación de Nuevos Talentos", titulo: "Pasantías Profesionales de 340 Horas", descripcion: "Convocatoria abierta para estudiantes y egresados de Agronomía, Ingeniería Ambiental, Sociología y Trabajo Social. Adquiere experiencia directa en comunidades del Altiplano con tutoría técnica especializada.", icono: "school",
    checks: ["Certificación institucional verificable con código único QR.", "Cobertura de viáticos de campo en zonas de intervención.", "Tutoría académica para tesis o proyectos de grado."], botones: [{ text: "Postular a la Convocatoria", path: "/pasantias", tipo: "primary" }, { text: "Verificar certificación", path: "/verificar-certificado", tipo: "ghost" }],
  },
  {
    chip: "Espacio Institucional en Sopocachi", titulo: "Casa SEMTA: Encuentro & Bio-Mercado", descripcion: "Un punto de articulación ecológica en el corazón de La Paz. Ofrecemos alquiler de salones equipados para talleres de la sociedad civil, vivero demostrativo y tienda permanente de productos agroecológicos campesinos.", icono: "storefront",
    checks: ["Salón auditorio bioclimático con proyector y audio profesional.", "Catering agroecológico con insumos de huertos propios.", "Punto de venta directo para organizaciones campesinas."], botones: [{ text: "Reservar Salones o Visitas", path: "/casa-semta", tipo: "secondary" }],
  },
];