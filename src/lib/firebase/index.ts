/**
 * Punto de entrada único para toda la capa Firebase.
 * Importar desde aquí: import { getAllProjects, getMunicipios } from "@/lib/firebase"
 */

export { db }                     from "./config";
export type { FirestoreProject }  from "./projectService";
export {
  getAllProjects,
  getProjectById,
  getProjectsByMunicipality,
  getProjectsByType,
  getProjectsByEstado,
  getProjectsByYear,
}                                 from "./projectService";

export type {
  FirestoreMunicipio,
  FirestoreComunidad,
  FirestoreTipoProyecto,
  FirestoreFinanciador,
}                                 from "./catalogService";
export {
  getMunicipios,
  getMunicipioById,
  getComunidades,
  getComunidadesByMunicipio,
  getTiposProyecto,
  getTipoProyectoById,
  getFinanciadores,
  getFinanciadorById,
  getEstadosProyecto,
  getMonedas,
  getAnios,
}                                 from "./catalogService";
