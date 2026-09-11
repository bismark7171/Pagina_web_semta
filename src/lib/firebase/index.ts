/**
 * Punto de entrada único para toda la capa Firebase.
 *
 * CLIENT (browser):  import { getAllProjects } from "@/lib/firebase"
 * SERVER (Next.js):  import { adminGetAllProjects } from "@/lib/firebase/adminProjectService"
 */

export { db }                     from "./config";
export type { FirestoreProject }  from "./projectService";

// Admin (solo servidor — NO importar en Client Components)
export { adminGetAllProjects, adminGetProjectById, adminGetFinanciadores, adminGetMunicipios, adminGetTiposProyecto } from "./adminProjectService";
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
