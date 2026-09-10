import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { nosotrosData, trayectoria, valores, indicadoresInstitucionales } from "@/data/nosotros";

export const metadata: Metadata = {
  title: "Nosotros · Quiénes Somos",
  description:
    "SEMTA, Servicios Múltiples de Tecnologías Apropiadas: 40+ años de resiliencia agroecológica y seguridad hídrica en el Altiplano y Valles de Bolivia.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }]}
        badge={{ icono: "handshake", text: "Institucional" }}
        titulo={
          <>
            Quiénes <span className="text-primary-fixed">somos</span>
          </>
        }
        descripcion={nosotrosData.resumen}
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionLabel icono="history_edu">Trayectoria</SectionLabel>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                Más de {new Date().getFullYear() - nosotrosData.fundacion} años
                en el territorio
              </h2>
              <p className="mt-3 text-body-lg text-on-surface-variant">
                {nosotrosData.enfoque}
              </p>
            </div>

            <ol className="relative space-y-6 border-l border-outline-variant pl-8">
              {trayectoria.map((t) => (
                <li key={t.anio} className="relative">
                  <span className="absolute -left-[45px] grid size-4 place-items-center rounded-full border-2 border-primary bg-surface-container-lowest">
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                  <p className="font-label-caps uppercase tracking-wider text-primary">
                    {t.anio}
                  </p>
                  <p className="mt-1 text-body-md leading-relaxed text-on-surface-variant">
                    {t.evento}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-16">
        <div className="mx-auto grid w-full max-w-container-semta gap-6 px-gutter-desktop lg:grid-cols-2">
          <article className="rounded-3xl bg-primary-container p-8 text-on-primary-container lg:p-10">
            <MaterialIcon name="flag" className="text-[30px]" />
            <h3 className="mt-4 font-headline-md">Misión</h3>
            <p className="mt-2 text-body-lg leading-relaxed opacity-95">
              {nosotrosData.mision}
            </p>
          </article>
          <article className="rounded-3xl bg-secondary-container p-8 text-on-secondary-container lg:p-10">
            <MaterialIcon name="visibility" className="text-[30px]" />
            <h3 className="mt-4 font-headline-md">Visión</h3>
            <p className="mt-2 text-body-lg leading-relaxed opacity-95">
              {nosotrosData.vision}
            </p>
          </article>
        </div>
      </section>

      <section id="valores" className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="favorite">Principios</SectionLabel>
          <h2 className="mt-4 max-w-xl font-headline-xl text-on-surface">
            Valores que guían cada programa
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((v) => (
              <article
                key={v.titulo}
                className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={v.icono} className="text-[26px]" />
                </span>
                <h3 className="mt-5 font-headline-md text-on-surface">
                  {v.titulo}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
                  {v.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bosque py-16 text-white">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-label-caps uppercase tracking-[0.14em] text-primary-fixed">
                Impacto acumulado
              </p>
              <h2 className="mt-2 font-headline-xl">La institución en cifras</h2>
            </div>
            <Button href="/proyectos" variant="ghost" className="text-white hover:bg-white/10">
              Ver el banco de proyectos
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {indicadoresInstitucionales.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <MaterialIcon
                  name={s.icono}
                  className="text-[26px] text-primary-fixed"
                />
                <p className="mt-3 font-display-lg text-4xl font-extrabold tracking-tight">
                  {s.valor}
                </p>
                <p className="text-label-lg font-semibold text-white/85">
                  {s.label}
                </p>
                <p className="text-body-sm text-white/60">{s.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}