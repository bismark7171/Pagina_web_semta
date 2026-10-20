"use client";

import { useEffect, useState } from "react";
import type { IProject } from "@/types";
import { proyectoEstados } from "@/data/projects";
import { Modal } from "@/components/ui/Modal";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FALLBACK_IMAGE } from "@/lib/images";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: IProject | null;
  onClose: () => void;
}) {
  const estado = project
    ? proyectoEstados[project.estado] || { color: "#0d631b", tint: "rgba(13, 99, 27, 0.14)" }
    : null;
  const [imagen, setImagen] = useState(project?.imagen ?? FALLBACK_IMAGE);

  useEffect(() => {
    setImagen(project?.imagen ?? FALLBACK_IMAGE);
  }, [project?.imagen]);

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={project ? project.titulo : ""}
      className="max-w-3xl"
    >
      {project && (
        <div className="space-y-6">
          <ZoomableImage
            src={imagen}
            alt={project.alt}
            caption={`${project.titulo} (${project.codigo})`}
            aspectRatioClass="aspect-[16/9]"
            className="rounded-2xl shadow-sm"
            sizes="(min-width:768px) 42rem, 100vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== FALLBACK_IMAGE) {
                setImagen(FALLBACK_IMAGE);
              }
            }}
            badge={
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label-md font-semibold backdrop-blur-sm"
                style={{ backgroundColor: estado!.tint, color: estado!.color }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: estado!.color }}
                />
                {project.estado}
              </span>
            }
          />

          <p className="text-body-md leading-relaxed text-on-surface-variant">
            {project.descripcion}
          </p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="Código" value={project.codigo} icono="tag" />
            <InfoItem label="Gestión" value={project.gestion} icono="calendar_month" />
            <InfoItem label="Ubicación" value={project.ubicacion} icono="location_on" />
            <InfoItem label="Municipio" value={project.municipio} icono="map" />
            <InfoItem label="Cooperante" value={project.cooperante} icono="handshake" />
            <InfoItem label="Financiador" value={project.financiador} icono="account_balance" />
            <InfoItem label="Beneficiarios" value={project.beneficiarios} icono="groups" />
            <InfoItem label="Tipo de Intervención" value={project.tipo} icono="agriculture" />
          </dl>
        </div>
      )}
    </Modal>
  );
}

function InfoItem({ label, value, icono }: { label: string; value: string; icono: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-surface-container p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <MaterialIcon name={icono} className="text-[20px]" />
      </span>
      <div>
        <dt className="text-label-caps uppercase tracking-wider text-on-surface-variant">
          {label}
        </dt>
        <dd className="mt-0.5 text-body-md font-medium text-on-surface">{value}</dd>
      </div>
    </div>
  );
}
