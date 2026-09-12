import type { IQuickStat } from "@/types";
import { cooperantes } from "@/data/cooperantes";

export const quickStats: IQuickStat[] = [
  { label: "Activos en Campo", valor: "18", detalle: "Comunidades originarias", icono: "terrain" },
  {
    label: "Familias Beneficiadas",
    valor: "14,280+",
    detalle: "Altiplano y Valles",
    icono: "diversity_1",
  },
  {
    label: "Años de Trabajo",
    valor: "40+",
    detalle: "Desde 1982 en el territorio",
    icono: "history",
  },
  {
    label: "Cooperantes",
    valor: String(cooperantes.length),
    detalle: "Agencias internacionales",
    icono: "handshake",
  },
];
