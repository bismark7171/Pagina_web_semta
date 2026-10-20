"use client";

import React from "react";

interface Props {
  distribucion: Record<string, number>;
  total: number;
}

const ESTADOS_CONFIG: Record<string, { color: string; label: string }> = {
  "En Ejecución": { color: "bg-secondary", label: "En Ejecución" },
  Concluido: { color: "bg-primary", label: "Concluido" },
  Planificado: { color: "bg-tertiary", label: "Planificado" },
};

export default function EstadoBar({ distribucion, total }: Props) {
  if (total <= 0) return null;

  return (
    <div className="space-y-4">
      {/* Barra continua proporcional */}
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-surface-container">
        {Object.entries(distribucion).map(([estado, count]) => {
          const pct = Math.round((count / total) * 100);
          const config = ESTADOS_CONFIG[estado] || { color: "bg-outline", label: estado };
          return (
            <div
              key={estado}
              style={{ width: `${pct}%` }}
              title={`${config.label}: ${count} (${pct}%)`}
              className={`${config.color} transition-all duration-500`}
            />
          );
        })}
      </div>

      {/* Leyenda con valores y porcentajes */}
      <div className="flex flex-wrap gap-4 pt-2">
        {Object.entries(distribucion).map(([estado, count]) => {
          const pct = Math.round((count / total) * 100);
          const config = ESTADOS_CONFIG[estado] || { color: "bg-outline", label: estado };
          return (
            <div key={estado} className="flex items-center gap-2 text-body-xs">
              <span className={`size-3 rounded-full ${config.color}`} />
              <span className="font-semibold text-on-surface">{config.label}:</span>
              <span className="text-on-surface-variant">
                {count} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
