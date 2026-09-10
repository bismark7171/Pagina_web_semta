import { photoTags } from '@/data/photoTags';
import { casaSemtaPhotogrid } from '@/data/casaSemta';

export interface INoticia {
  titulo: string;
  resumen: string;
  categoria: string;
  fecha: string;
  imagen: string;
  alt: string;
}

const [fotoRiego, fotoSemillas] = photoTags;
const [,,, fotoBioinsumos, fotoComunidad] = casaSemtaPhotogrid;

export const noticias: INoticia[] = [
  {
    titulo: "Escuelas de Campo: 18 comunidades activan sus sistemas de microriego",
    resumen: "Familias de Batallas y Achacachi operan ya 14 sistemas de cosecha de agua y aspersión instalados en el marco del programa de resiliencia hídrica.",
    categoria: "Altiplano",
    fecha: "2026-09-04",
    imagen: fotoRiego.imagen,
    alt: "Capacitación en riego: " + fotoRiego.titulo,
  },
  {
    titulo: "Custodios de semillas: 42 comités resguardan la biodiversidad andina",
    resumen: "El banco comunal de semillas nativas alcanzó 32 bio-insumos formulados y nuevas entregas de semilla certificada de quinua y papa nativa.",
    categoria: "Agroecología",
    fecha: "2026-08-21",
    imagen: fotoSemillas.imagen,
    alt: "Banco de semillas: " + fotoSemillas.titulo,
  },
  {
    titulo: "Casa SEMTA inaugura ciclo de talleres de bioconstrucción",
    resumen: "El eje de tecnologías apropiadas abre inscripciones para el taller de adobe y tierra con enfoque de vivienda bioclimática.",
    categoria: "Casa SEMTA",
    fecha: "2026-09-12",
    imagen: fotoBioinsumos.imagen,
    alt: "Preparados ecológicos y bioinsumos en Casa SEMTA",
  },
  {
    titulo: "Feria de semillas y bio-insumos convoca a la ciudadanía",
    resumen: "El patio de Sopocachi recibirá a organizaciones campesinas y vecinos para el intercambio de semillas nativas y microorganismos.",
    categoria: "Eventos",
    fecha: "2026-10-01",
    imagen: fotoComunidad.imagen,
    alt: "Encuentro comunitario en el patio de Casa SEMTA",
  },
];
