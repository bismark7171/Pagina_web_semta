import Link from "next/link";
import { lineasDeAccion } from "@/data/lineasDeAccion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function LineasDeAccion() {
  const [featured, ...rest] = lineasDeAccion;

  return (
    <section id="lineas-de-accion" className="bg-background py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel icono="diversity_3">Enfoque Programático</SectionLabel>
            <h2 className="mt-4 font-headline-xl text-on-surface">
              Líneas de Acción que{" "}
              <span className="text-primary">transforman territorios</span>
            </h2>
            <p className="mt-3 text-body-lg text-on-surface-variant">
              Cinco ejes estratégicos articulados con las realidades del
              Altiplano y los Valles de Bolivia.
            </p>
          </div>
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-label-lg font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            Ver proyectos
            <MaterialIcon
              name="arrow_forward"
              className="text-[1.1em] transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <article id={featured.slug} className="group relative overflow-hidden rounded-3xl bg-primary-container p-8 text-on-primary-container lg:col-span-3 lg:row-span-2 lg:p-10">
            <MaterialIcon
              name="water"
              className="absolute -right-6 -top-6 text-[160px] opacity-10 transition-transform duration-500 group-hover:scale-110"
            />
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-label-caps uppercase tracking-wider">
              <span className="size-2 rounded-full bg-current" />
              {featured.badge} · Eje Principal
            </span>
            <h3 className="mt-6 font-headline-lg text-[26px] leading-tight">
              {featured.titulo}
            </h3>
            <p className="mt-3 max-w-md text-body-lg leading-relaxed opacity-90">
              {featured.descripcion}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-white/15">
                <MaterialIcon name={featured.icono} className="text-[26px]" />
              </span>
              <div>
                <p className="font-label-caps uppercase tracking-wider opacity-70">
                  Línea Activa
                </p>
                <p className="font-label-lg font-semibold">{featured.stat}</p>
              </div>
            </div>
          </article>

          {rest.map((l, i) => (
            <Link
              key={l.titulo}
              href="/proyectos"
              id={l.slug}
              className={`group relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta hover:border-primary/30 ${
                i === 3 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={l.icono} className="text-[26px]" />
                </span>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
                  {l.badge}
                </span>
              </div>
              <h3 className="mt-6 font-headline-md text-on-surface">
                {l.titulo}
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
                {l.descripcion}
              </p>
              <p className="mt-6 flex items-center gap-2 border-t border-outline-variant pt-4 font-label-md font-semibold text-primary">
                {l.stat}
                <MaterialIcon name="arrow_forward" className="text-[1em] transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}