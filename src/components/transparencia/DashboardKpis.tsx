/**
 * DashboardKpis.tsx
 * Tarjetas de KPI del Dashboard de Transparencia.
 * Server Component — recibe los datos calculados desde la page.
 */

import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface KpiItem {
  icono: string;
  valor: string;
  label: string;
  detalle: string;
  color?: string; // clase Tailwind de color de fondo del icono
}

interface Props {
  kpis: KpiItem[];
}

export default function DashboardKpis({ kpis }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="flex items-start gap-4 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
        >
          <span
            className={[
              "grid size-12 shrink-0 place-items-center rounded-2xl",
              k.color ?? "bg-primary-container/15 text-primary",
            ].join(" ")}
          >
            <MaterialIcon name={k.icono} className="text-[26px]" />
          </span>
          <div>
            <p className="font-display-lg text-3xl font-extrabold tracking-tight text-bosque">
              {k.valor}
            </p>
            <p className="text-label-lg font-semibold text-on-surface">{k.label}</p>
            <p className="text-body-sm text-on-surface-variant">{k.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
