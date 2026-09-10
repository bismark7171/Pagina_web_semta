import type { ILineaAccion } from '@/types';

export const lineasDeAccion: ILineaAccion[] = [
  {
    slug: "agua-y-suelo", icono: "water", badge: "Eje Vital", titulo: "Agua y Suelo", descripcion: "Cosecha de agua de lluvia, microriego familiar por goteo/aspersión, manejo de microcuencas y protección integral de vertientes altoandinas frente a sequías extremas.", stat: "14 sistemas instalados",
  },
  {
    slug: "agroecologia", icono: "potted_plant", badge: "Soberanía", titulo: "Agroecología", descripcion: "Diversificación de cultivos andinos, banco comunal de semillas nativas, huertos biointensivos protegidos y elaboración local de biofertilizantes ricos en microorganismos.", stat: "32 bio-insumos formulados",
  },
  {
    slug: "forraje-y-ganaderia", icono: "pets", badge: "Camélidos", titulo: "Forraje y Ganadería", descripcion: "Manejo regenerativo de bofedales altoandinos, henificación comunitaria, módulos de forraje verde hidropónico y medicina preventiva para camélidos y ganado bovino.", stat: "1,800 has bofedales recuperadas",
  },
  {
    slug: "mujeres-y-comunidad", icono: "diversity_1", badge: "Liderazgo", titulo: "Mujeres y Comunidad", descripcion: "Fortalecimiento organizativo, asociatividad económica de productoras rurales, derechos de tenencia y agregación de valor a la transformación de materias primas locales.", stat: "42 comités en funcionamiento",
  },
  {
    slug: "tecnologias-apropiadas", icono: "solar_power", badge: "Energía Solar & Biomasa", titulo: "Tecnologías Apropiadas y Energías Limpias", descripcion: "Desarrollo, adaptación y transferencia comunal de secadores solares familiares, cocinas mejoradas de leña eficiente, bombas de ariete hidráulico sin electricidad y biodigestores rústicos.", stat: "Cero Huella Fósil",
  },
];