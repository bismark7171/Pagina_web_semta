export interface ITransparenciaDoc {
  clasificacion: string;
  titulo: string;
  gestion: string;
  nota: string;
}

export const transparenciaDocs: ITransparenciaDoc[] = [
  { clasificacion: "Estados Financieros", titulo: "Balance General y Estado de Resultados 2024", gestion: "2024", nota: "Auditado independientemente" },
  { clasificacion: "Estados Financieros", titulo: "Ejecución Presupuestaria 2023", gestion: "2023", nota: "Auditado independientemente" },
  { clasificacion: "Memorias", titulo: "Memoria Institucional 2024", gestion: "2024", nota: "Resultados y coberturas en territorio" },
  { clasificacion: "Gobernanza", titulo: "Estatuto Orgánico y Reglamento Interno", gestion: "2021", nota: "Vigente" },
  { clasificacion: "Gobernanza", titulo: "Directorio 2022 - 2026", gestion: "2022", nota: "Membresía activa" },
  { clasificacion: "Rendición", titulo: "Informe de Cierre de Convenios de Cooperación", gestion: "Actualizado", nota: "Por cooperante y programa" },
];
