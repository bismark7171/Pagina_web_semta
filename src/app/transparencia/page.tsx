import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { transparenciaDocs } from "@/data/transparencia";
import { trustPartners } from "@/data/trustBanner";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Estados financieros auditados, memorias y estructura de gobernanza de SEMTA, a disposición pública.",
};

export default function TransparenciaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Transparencia", href: "/transparencia" }]}
        badge={{ icono: "description", text: "Rendición de Cuentas" }}
        titulo={
          <>
            Transparencia <span className="text-primary-fixed">institucional</span>
          </>
        }
        descripcion="La confianza de comunidades y cooperantes se construye con documentos públicos: rendimos cuentas de cada boliviano invertido."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="folder_open">Documentos públicos</SectionLabel>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {transparenciaDocs.map((d) => (
              <article
                key={d.titulo}
                className="flex flex-col rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name="article" className="text-[26px]" />
                </span>
                <p className="mt-4 text-label-caps uppercase tracking-wider text-on-surface-variant">
                  {d.clasificacion} · {d.gestion}
                </p>
                <h3 className="mt-2 flex-1 font-headline-md leading-snug text-on-surface">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-body-sm font-semibold text-primary">
                  {d.nota}
                </p>
                <a
                  href={`mailto:info@semta.org.bo?subject=${encodeURIComponent(
                    "Solicitud de documento: " + d.titulo,
                  )}`}
                  className="mt-5 inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline"
                >
                  <MaterialIcon name="open_in_new" className="text-[1.1em]" />
                  Solicitar copia
                </a>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-bosque p-8 text-white lg:p-10">
            <SectionLabel icono="public">Cooperantes y aliados</SectionLabel>
            <p className="mt-3 max-w-2xl text-body-lg text-white/80">
              Los convenios de cooperación internacional y alianzas estratégicas
              ejecutan sus fondos con auditoría externa anual.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {trustPartners.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-label-md font-semibold text-white/85"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/proyectos" variant="ghost" className="text-white hover:bg-white/10">
                Ver proyectos financiados
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}