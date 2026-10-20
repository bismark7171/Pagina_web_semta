/**
 * src/data/impactMetrics.ts
 * Métricas de impacto institucional acumuladas.
 */

export interface ImpactMetric {
  icono: string;
  valor: string;
  titulo: string;
  descripcion: string;
  footer: string;
}

export const impactMetrics: ImpactMetric[] = [
  {
    icono: "nature_people",
    valor: "40+",
    titulo: "Años de trabajo continuo",
    descripcion:
      "Cuatro décadas de investigación aplicada, diálogo de saberes y acción territorial en Bolivia.",
    footer: "Desde 1982 en territorio andino",
  },
  {
    icono: "assignment_turned_in",
    valor: "150+",
    titulo: "Proyectos ejecutados",
    descripcion:
      "Iniciativas integrales de riego, agroecología, gobernanza comunitaria y tecnologías solares.",
    footer: "100% auditados y concluidos",
  },
  {
    icono: "pin_drop",
    valor: "35",
    titulo: "Municipios atendidos",
    descripcion: "Presencia profunda en provincias de La Paz, Oruro, Potosí y Cochabamba.",
    footer: "Cobertura acumulada en 35 municipios",
  },
];

export default impactMetrics;
