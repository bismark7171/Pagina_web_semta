/**
 * src/data/transparencia.ts
 * Documentos institucionales públicos y reportes de rendición de cuentas.
 */

export interface TransparenciaDoc {
  titulo: string;
  clasificacion: string;
  gestion: string;
  nota: string;
}

export const transparenciaDocs: TransparenciaDoc[] = [
  {
    titulo: "Dictamen de Auditoría Financiera Externa y Balance General",
    clasificacion: "Finanzas",
    gestion: "2023",
    nota: "Opinión limpia sin salvedades por firma auditora externa",
  },
  {
    titulo: "Informe Anual de Rendición Pública de Cuentas y Resultados de Campo",
    clasificacion: "Gobernanza",
    gestion: "2023",
    nota: "Presentado y aprobado ante asamblea de organizaciones sociales",
  },
  {
    titulo: "Estatutos Orgánicos y Personería Jurídica Vigente de SEMTA",
    clasificacion: "Legal",
    gestion: "Actualizado",
    nota: "Reconocida por el Estado Plurinacional de Bolivia",
  },
  {
    titulo: "Política Institucional de Salvaguardas Ambientales y de Género",
    clasificacion: "Políticas",
    gestion: "2024",
    nota: "Protocolos de prevención de violencia y justicia climática",
  },
  {
    titulo: "Manual de Adquisiciones, Contrataciones y Ética en Proyectos",
    clasificacion: "Administración",
    gestion: "2024",
    nota: "Normas alineadas a estándares de la cooperación internacional",
  },
  {
    titulo: "Dictamen de Auditoría Financiera Externa y Ejecución Presupuestaria",
    clasificacion: "Finanzas",
    gestion: "2022",
    nota: "Auditado y certificado sin observaciones de fondos",
  },
];

export default transparenciaDocs;
