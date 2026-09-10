export type ProjectEstado =
  | "Planificado"
  | "En Ejecución"
  | "Concluido"
  | "Suspendido"
  | "Cancelado";

export type ProjectTipo =
  | "Agua y Riego"
  | "Agroecología"
  | "Manejo de Bofedales"
  | "Liderazgo de Mujeres"
  | "Tecnologías Solares";

export interface IProject {
  id: string;
  estado: ProjectEstado;
  tipo: ProjectTipo;
  municipio: string;
  financiador: string;
  search: string;
  titulo: string;
  descripcion: string;
  gestion: string;
  ubicacion: string;
  cooperante: string;
  beneficiarios: string;
  boton: string;
  imagen: string;
  alt: string;
  codigo: string;
}

export interface IHeroButton {
  text: string;
  path: string;
  icono?: string;
}

export interface IHeroSlide {
  chip: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  captionTitulo: string;
  captionTexto: string;
  captionIcono: string;
  botones: IHeroButton[];
}

export interface ILineaAccion {
  slug: string;
  icono: string;
  badge: string;
  titulo: string;
  descripcion: string;
  stat: string;
}

export interface IMetrica {
  valor: string;
  icono: string;
  titulo: string;
  descripcion: string;
  footer: string;
}

export interface IQuickStat {
  label: string;
  valor: string;
  detalle: string;
  icono: string;
}

export interface IPhotoTag {
  imagen: string;
  badge: string;
  titulo: string;
}

export type CalloutButtonKind =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "solid";

export interface ICalloutButton {
  text: string;
  path: string;
  tipo: CalloutButtonKind;
}

export interface ICallout {
  chip: string;
  titulo: string;
  descripcion: string;
  icono: string;
  checks: string[];
  botones: ICalloutButton[];
}

export interface ITrustBanner {
  titulo: string;
  descripcion: string;
  botones: {
    text: string;
    path: string;
    icono: string;
    tipo: CalloutButtonKind;
  }[];
}

export interface IServicioCasa {
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  badgeIcono: string;
  badgeTexto: string;
  modalidadLabel: string;
  modalidad: string;
  checks: string[];
}

export interface ICasaMetrica {
  valor: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
}

export interface ICasaFaq {
  pregunta: string;
  respuesta: string;
  icono: string;
  color: string;
}

export interface ICasaPhoto {
  imagen: string;
  alt: string;
}

export interface INavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}