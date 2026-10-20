/**
 * src/types/index.ts
 * Definiciones de tipos principales del ecosistema SEMTA.
 */

export interface IServicioCasa {
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  badgeIcono: string;
  badgeTexto: string;
  checks: string[];
  modalidadLabel: string;
  modalidad: string;
}

export interface ICasaPhoto {
  imagen: string;
  alt: string;
  caption?: string;
}

export interface INavItem {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}

export type ProjectEstado = "Concluido" | "En Ejecución" | "Planificado";

export interface IProject {
  id: string;
  titulo: string;
  descripcion: string;
  estado: ProjectEstado;
  tipo: string;
  municipio: string;
  financiador: string;
  cooperante: string;
  beneficiarios: string;
  gestion: string;
  ubicacion: string;
  imagen: string;
  alt: string;
  codigo: string;
  boton: string;
  search: string;
  destacado?: boolean;
}

export interface ILibro {
  id: string;
  titulo: string;
  autor: string;
  anio: string;
  gestion?: string;
  categoria: string;
  paginas: number;
  pesoMb?: string;
  descripcion: string;
  portadaUrl?: string | null;
  portada?: string;
  icono?: string;
  pdfUrl?: string;
  urlPdf?: string;
  esDestacado?: boolean;
  idioma?: string;
  etiquetas?: string[];
}

export interface ICursoModulo {
  titulo: string;
  detalle: string;
}

export interface ICurso {
  id: string;
  nombre: string;
  descripcion: string;
  estaActivo: boolean;
  fechaInicio: string;
  fechaFin: string;
  cargaHoraria: number;
  duracionTexto: string;
  modalidad: string;
  plataforma: string;
  ctaTexto: string;
  modulos: ICursoModulo[];
}

export interface FirestoreProject {
  _docId: string;
  id: string;
  titulo: string;
  descripcion: string;
  estado: ProjectEstado;
  tipoId: string;
  municipioIds: string[];
  financiadorId: string;
  beneficiarios: string;
  gestion: string;
  ubicacion: string;
  imagenUrl: string;
  codigo: string;
  esPublico?: boolean;
}

export interface FirestoreCurso {
  _docId: string;
  id: string;
  nombre: string;
  descripcion: string;
  estaActivo: boolean;
  fechaInicio: string;
  fechaFin: string;
  cargaHoraria: number;
  duracionTexto: string;
  modalidad: string;
  plataforma: string;
  modulos?: Array<{ titulo: string; detalle: string }>;
}
