/**
 * CursoCard.tsx
 * Tarjeta de marketing de un curso con certificación SEMTA.
 * Muestra: nombre, módulos, duración, plataforma y CTA de inscripción.
 */

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { ICurso } from "@/types";
import { Card } from "@/components/ui/Card";

interface Props {
  curso: ICurso;
  /** Asunto pre-llenado en el mailto de inscripción */
  emailAsunto?: string;
}

export default function CursoCard({ curso, emailAsunto }: Props) {
  const asunto = emailAsunto ?? `Inscripción: ${curso.nombre}`;
  const mailto = `mailto:info@semta.org.bo?subject=${encodeURIComponent(asunto)}`;

  return (
    <Card hoverable className="group h-full -col -outline-variant">
      {/* Cabecera */}
      <div className="border-b border-outline-variant bg-primary/5 px-7 py-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
            <MaterialIcon name="school" className="text-[26px]" />
          </span>
          {/* Badge estado */}
          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-caps uppercase tracking-wider",
              curso.estaActivo
                ? "bg-primary/10 text-primary"
                : "bg-surface-container text-on-surface-variant",
            ].join(" ")}
          >
            <span
              className={[
                "size-1.5 rounded-full",
                curso.estaActivo ? "bg-primary" : "bg-on-surface-variant",
              ].join(" ")}
            />
            {curso.estaActivo ? "Activo" : "Finalizado"}
          </span>
        </div>

        <h3 className="mt-4 font-headline-md leading-snug text-on-surface">{curso.nombre}</h3>

        {/* Meta: fechas, horas, plataforma */}
        <div className="mt-3 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant">
            <MaterialIcon name="calendar_month" className="text-[1.1em] text-primary" />
            {curso.fechaInicio} — {curso.fechaFin}
          </span>
          {curso.cargaHoraria > 0 && (
            <span className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant">
              <MaterialIcon name="schedule" className="text-[1.1em] text-primary" />
              {curso.cargaHoraria}h · {curso.duracionTexto}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant">
            <MaterialIcon name="videocam" className="text-[1.1em] text-primary" />
            {curso.plataforma}
          </span>
        </div>
      </div>

      {/* Módulos */}
      <div className="flex flex-1 flex-col px-7 py-6">
        {curso.modulos.length > 0 && (
          <>
            <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
              Módulos del curso
            </p>
            <ul className="mt-3 space-y-2">
              {curso.modulos.map((modulo, i) => (
                <li
                  key={`${modulo}-${i}`}
                  className="flex items-start gap-2.5 text-body-sm leading-snug text-on-surface"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-label-caps font-bold text-primary">
                    {i + 1}
                  </span>
                  {modulo}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Sello de certificación */}
        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-surface-container px-4 py-3">
          <MaterialIcon name="verified" className="shrink-0 text-[22px] text-primary" />
          <p className="text-body-sm text-on-surface-variant">
            Certificado con <span className="font-semibold text-on-surface">código QR único</span> ·
            Verificable desde la app SEMTA
          </p>
        </div>

        {/* CTA */}
        <a
          href={mailto}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-label-lg font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
        >
          <MaterialIcon name="mail" className="text-[1.1em]" />
          Inscribirme a este curso
        </a>
      </div>
    </Card>
  );
}
