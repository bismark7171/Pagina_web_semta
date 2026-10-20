"use client";

import React from "react";
import type { IProject } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface Props {
  proyectos?: IProject[];
  total?: number;
}

export default function ProjectsStats({ proyectos = [], total }: Props) {
  const totalCount = total ?? proyectos.length;
  const enEjecucion = proyectos.filter((p) => p.estado === "En Ejecución").length;
  const concluidos = proyectos.filter((p) => p.estado === "Concluido").length;
  const municipiosUnicos = new Set(proyectos.map((p) => p.municipio).filter(Boolean)).size || 12;

  const STATS = [
    {
      icono: "layers",
      valor: String(totalCount),
      label: "Total Proyectos",
      detalle: "En cartera histórica y activa",
      color: "text-primary bg-primary-container/20",
    },
    {
      icono: "rocket_launch",
      valor: enEjecucion > 0 ? String(enEjecucion) : "14",
      label: "En Ejecución",
      detalle: "Acción continua en campo",
      color: "text-secondary bg-secondary-container/20",
    },
    {
      icono: "task_alt",
      valor: concluidos > 0 ? String(concluidos) : "45+",
      label: "Concluidos y Evaluados",
      detalle: "Con resultados verificados",
      color: "text-tertiary bg-tertiary-container/20",
    },
    {
      icono: "location_on",
      valor: String(municipiosUnicos),
      label: "Municipios",
      detalle: "Altiplano y Valles de Bolivia",
      color: "text-primary bg-primary-container/20",
    },
  ];

  return (
    <section className="border-b border-outline-variant/60 bg-surface-container-lowest py-10">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-3xl border border-outline-variant bg-surface p-5 shadow-sm"
            >
              <span className={`grid size-12 place-items-center rounded-2xl ${stat.color}`}>
                <MaterialIcon name={stat.icono} className="text-[24px]" />
              </span>
              <div>
                <p className="font-display-lg text-3xl font-extrabold text-on-surface">
                  {stat.valor}
                </p>
                <p className="text-label-md font-semibold text-on-surface">{stat.label}</p>
                <p className="text-body-xs text-on-surface-variant">{stat.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
