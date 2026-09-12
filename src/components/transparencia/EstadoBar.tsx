/**
 * EstadoBar.tsx
 * Barra visual de distribución de proyectos por estado.
 * Server Component puro — sin JS cliente, puro CSS.
 */

import { proyectoEstados } from "@/data/projects";
import type { ProjectEstado } from "@/types";

interface Props {
  distribucion: Record<string, number>;
  total: number;
}

export default function EstadoBar({ distribucion, total }: Props) {
  if (total === 0) return null;

  // Orden fijo de estados para la barra
  const orden: ProjectEstado[] = [
    "En Ejecución",
    "Planificado",
    "Concluido",
    "Suspendido",
    "Cancelado",
  ];

  return (
    <div className="space-y-4">
      {/* Barra apilada */}
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-surface-container">
        {orden.map((estado) => {
          const count = distribucion[estado] ?? 0;
          if (count === 0) return null;
          const pct = ((count / total) * 100).toFixed(1);
          const cfg = proyectoEstados[estado];
          return (
            <div
              key={estado}
              style={{ width: `${pct}%`, backgroundColor: cfg.color }}
              title={`${estado}: ${count} (${pct}%)`}
            />
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {orden.map((estado) => {
          const count = distribucion[estado] ?? 0;
          if (count === 0) return null;
          const cfg = proyectoEstados[estado];
          const pct = ((count / total) * 100).toFixed(0);
          return (
            <div key={estado} className="flex items-center gap-2">
              <span className="size-3 rounded-full" style={{ backgroundColor: cfg.color }} />
              <span className="text-body-sm text-on-surface-variant">
                {cfg.label}{" "}
                <span className="font-semibold text-on-surface">
                  {count} ({pct}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
