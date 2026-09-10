import Image from "next/image";
import Link from "next/link";
import type { IServicioCasa } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function ServicioCard({ servicio }: { servicio: IServicioCasa }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high">
        <Image
          src={servicio.imagen}
          alt={servicio.alt}
          fill
          sizes="(min-width:768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-label-md font-semibold text-white backdrop-blur">
          <MaterialIcon name={servicio.badgeIcono} className="text-[1.1em] text-primary-fixed" />
          {servicio.badgeTexto}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-headline-md leading-snug text-on-surface">
          {servicio.titulo}
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
          {servicio.descripcion}
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {servicio.checks.map((check) => (
            <li
              key={check}
              className="flex items-start gap-2 rounded-lg bg-surface-container px-3 py-2 text-body-sm"
            >
              <MaterialIcon
                name="check_circle"
                className="mt-0.5 shrink-0 text-[18px] text-primary"
              />
              <span className="leading-snug">{check}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-outline-variant pt-4">
          <div>
            <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
              {servicio.modalidadLabel}
            </p>
            <p className="text-label-lg font-semibold text-on-surface">
              {servicio.modalidad}
            </p>
          </div>
          <Link
            href="/reservar"
            aria-label={`Reservar: ${servicio.titulo}`}
            className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"
          >
            <MaterialIcon name="arrow_forward" className="text-[22px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}