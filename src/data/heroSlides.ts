/**
 * src/data/heroSlides.ts
 * Diapositivas destacadas para el slider principal de la página de inicio.
 */

export interface HeroBoton {
  text: string;
  path: string;
  icono?: string;
}

export interface HeroSlide {
  imagen: string;
  alt: string;
  chip: string;
  titulo: string;
  descripcion: string;
  captionIcono: string;
  captionLabel: string;
  captionTitulo: string;
  captionTexto: string;
  botones: HeroBoton[];
  cta?: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
}

export const heroSlides: HeroSlide[] = [
  {
    imagen:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=85",
    alt: "Comunidades andinas cosechando cultivos nativos en el altiplano boliviano",
    chip: "Agroecología Andina",
    titulo: "40+ años sembrando soberanía alimentaria y saberes comunitarios",
    descripcion:
      "Trabajamos junto a familias campesinas e indígenas en el Altiplano y Valles de Bolivia, impulsando tecnologías agroecológicas sostenibles y resilientes.",
    captionIcono: "eco",
    captionLabel: "Impacto Territorial",
    captionTitulo: "Impacto Territorial",
    captionTexto:
      "Más de 35 municipios del Altiplano con sistemas de riego y semillas nativas protegidas.",
    botones: [
      { text: "Conoce nuestros proyectos", path: "/proyectos", icono: "arrow_forward" },
      { text: "Biblioteca Digital", path: "/biblioteca", icono: "menu_book" },
    ],
    cta: { label: "Conoce nuestros proyectos", href: "/proyectos" },
    ctaSecundario: { label: "Biblioteca Digital", href: "/biblioteca" },
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85",
    alt: "Sistemas de captación de agua y riego tecnificado en zonas rurales",
    chip: "Seguridad Hídrica",
    titulo: "Cosecha de agua y tecnologías limpias para el cambio climático",
    descripcion:
      "Diseño e implementación de atajados familiares, riego por goteo y reservorios comunitarios para garantizar agua en épocas de sequía severa.",
    captionIcono: "water_drop",
    captionLabel: "Infraestructura Comunitaria",
    captionTitulo: "Infraestructura Comunitaria",
    captionTexto:
      "1.200+ sistemas de riego e invernaderos solares construidos de forma participativa.",
    botones: [
      { text: "Ver tecnologías", path: "/proyectos?tipo=agua", icono: "arrow_forward" },
      { text: "Cursos y Formación", path: "/cursos", icono: "school" },
    ],
    cta: { label: "Ver tecnologías", href: "/proyectos?tipo=agua" },
    ctaSecundario: { label: "Cursos y Formación", href: "/cursos" },
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=85",
    alt: "Mujeres líderes comunitarias en talleres de formación agroecológica",
    chip: "Equidad de Género",
    titulo: "Mujeres campesinas liderando la gestión de recursos y microempresas",
    descripcion:
      "Fortalecimiento organizativo, empoderamiento económico y formación técnica de lideresas rurales para el desarrollo sostenible de sus comunidades.",
    captionIcono: "groups",
    captionLabel: "Liderazgo Rural",
    captionTitulo: "Liderazgo Rural",
    captionTexto:
      "Más de 6.000 mujeres capacitadas en transformación de alimentos y gestión local.",
    botones: [
      { text: "Transparencia y Resultados", path: "/transparencia", icono: "arrow_forward" },
      { text: "Nuestra Historia", path: "/nosotros", icono: "history" },
    ],
    cta: { label: "Transparencia y Resultados", href: "/transparencia" },
    ctaSecundario: { label: "Nuestra Historia", href: "/nosotros" },
  },
];

export default heroSlides;
