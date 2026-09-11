import { impactMetrics } from "@/data/impactMetrics";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";

export default function ImpactMetrics() {
  return (
    <section className="bg-surface-container-lowest py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <SectionLabel icono="monitoring">Impacto Verificable</SectionLabel>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                Resultados que se miden en <span className="text-primary">territorio</span>
              </h2>
              <p className="mt-3 text-body-lg text-on-surface-variant">
                Datos auditados con cooperación internacional y sistematizados por nuestro equipo
                técnico junto a las comunidades.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {impactMetrics.map((m, i) => (
            <FadeIn key={m.titulo} delay={i * 0.12}>
              <article className="group h-full rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary-container/15 text-primary transition-colors duration-300 group-hover:bg-primary-container group-hover:text-on-primary-container">
                    <MaterialIcon name={m.icono} className="text-[28px]" />
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-primary opacity-10 transition-opacity duration-300 group-hover:opacity-30">
                    +
                  </span>
                </div>

                <p className="mt-8 font-display-lg text-5xl font-extrabold tracking-tight text-bosque">
                  <CountUp value={m.valor} />
                </p>
                <h3 className="mt-2 font-headline-md text-on-surface">{m.titulo}</h3>
                <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">
                  {m.descripcion}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-outline-variant pt-4 text-label-md font-semibold text-primary">
                  <MaterialIcon
                    name="trending_up"
                    className="text-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                  {m.footer}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
