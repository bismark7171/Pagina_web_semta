"use client";

import React from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface KpiItem {
  icono: string;
  valor: string;
  label: string;
  detalle: string;
  color: string;
}

interface Props {
  kpis: KpiItem[];
}

export default function DashboardKpis({ kpis }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="flex flex-col rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
        >
          <div className="flex items-center justify-between">
            <span className={`grid size-12 place-items-center rounded-2xl ${kpi.color}`}>
              <MaterialIcon name={kpi.icono} className="text-[26px]" />
            </span>
          </div>

          <p className="mt-5 font-display-lg text-4xl font-extrabold text-on-surface">
            {kpi.valor}
          </p>

          <p className="mt-1 text-label-lg font-semibold text-on-surface">{kpi.label}</p>

          <p className="mt-1 text-body-xs text-on-surface-variant">{kpi.detalle}</p>
        </div>
      ))}
    </div>
  );
}
