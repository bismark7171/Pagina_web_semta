/**
 * src/data/noticias.ts
 * Artículos y noticias institucionales de SEMTA.
 */

export interface NoticiaItem {
  id: string;
  titulo: string;
  resumen: string;
  categoria: string;
  fecha: string; // ISO YYYY-MM-DD
  imagen: string;
  alt: string;
}

export const noticias: NoticiaItem[] = [
  {
    id: "noticia-feria-semillas-2025",
    titulo: "Encuentro Regional de Custodios de Semillas Nativas reúne a más de 20 comunidades",
    resumen:
      "Agricultoras y agricultores de Batallas, Achacachi y Tiwanaku intercambiaron más de 80 variedades nativas de papa, quinua y tarwi, fortaleciendo la soberanía alimentaria.",
    categoria: "Biodiversidad",
    fecha: "2025-03-28",
    imagen:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
    alt: "Feria comunitaria de intercambio de semillas nativas en el altiplano",
  },
  {
    id: "noticia-cosecha-agua-mitigacion",
    titulo: "Finaliza con éxito la instalación de 50 atajados familiares para cosecha de agua",
    resumen:
      "Las obras benefician a familias de zonas áridas de Oruro que sufren los efectos prolongados de la sequía andina, garantizando agua para hortalizas y ganado.",
    categoria: "Seguridad Hídrica",
    fecha: "2025-02-14",
    imagen:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    alt: "Atajado familiar de agua de lluvia en el altiplano de Oruro",
  },
  {
    id: "noticia-liderazgo-mujeres-agroecologicas",
    titulo: "Graduación de la tercera cohorte de la Escuela de Lideresas Comunitarias",
    resumen:
      "45 lideresas indígenas concluyeron el ciclo formativo en gobernanza del agua, administración comunitaria y biopreparados en Casa SEMTA.",
    categoria: "Liderazgo",
    fecha: "2025-01-20",
    imagen:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    alt: "Lideresas campesinas recibiendo sus certificaciones en Casa SEMTA",
  },
  {
    id: "noticia-invernaderos-bioclimaticos",
    titulo: "Nuevas pruebas técnicas demuestran 14°C de diferencia térmica en walipinis",
    resumen:
      "El equipo técnico evaluó el comportamiento térmico de los invernaderos subterráneos frente a heladas de -8°C en el altiplano central.",
    categoria: "Investigación",
    fecha: "2024-12-05",
    imagen:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    alt: "Medición de temperatura interior en invernadero walipini",
  },
];

export default noticias;
