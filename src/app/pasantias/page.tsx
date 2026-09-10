import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { pasantiasData } from "@/data/pasantias";

export const metadata: Metadata = {
  title: "Pasantías 340 Horas",
  description:
    "Convocatoria abierta de pasantías profesionales SEMTA: conocimiento técnico aplicado en el Altiplano y Valles de Bolivia.",
};

export default function PasantiasPage() {
  const { duracion, modalidad, regiones } = pasantiasData;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Pasantías", href: "/pasantias" }]}
        badge={{ icono: "school", text: "Convocatoria Abierta" }}
        titulo={
          <>
            Pasantías de{" "}
            <span className="text-primary-fixed">340 horas</span> con SEMTA
          </>
        }
        descripcion="Aprendizaje en territorio: sistemas de riego, agroecología, bofedales y tecnologías solares junto a familias campesinas e indígenas."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icono: "hourglass_top", label: "Duración", valor: duracion },
              { icono: "route", label: "Modalidad", valor: modalidad },
              { icono: "place", label: "Territorios", valor: regiones.join(" · ") },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={c.icono} className="text-[26px]" />
                </span>
                <p className="mt-4 text-label-caps uppercase tracking-wider text-on-surface-variant">
                  {c.label}
                </p>
                <p className="mt-1 font-headline-md text-on-surface">{c.valor}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel icono="engineering">Áreas de práctica</SectionLabel>
              <div className="mt-6 space-y-4">
                {pasantiasData.areas.map((a) => (
                  <article
                    key={a.label}
                    className="flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-container/15 text-primary">
                      <MaterialIcon name={a.icono} className="text-[22px]" />
                    </span>
                    <div>
                      <h3 className="font-headline-sm text-on-surface">{a.label}</h3>
                      <p className="mt-1 text-body-sm text-on-surface-variant">
                        {a.descripcion}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-surface-container-lowest p-7">
                <SectionLabel icono="assignment_turned_in">Requisitos</SectionLabel>
                <ul className="mt-4 space-y-3">
                  {pasantiasData.requisitos.map((r, i) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-body-sm leading-relaxed text-on-surface-variant"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-label-md font-bold text-primary">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-primary-container p-7 text-on-primary-container">
                <SectionLabel icono="redeem" className="text-on-primary-container">
                  Beneficios
                </SectionLabel>
                <ul className="mt-4 space-y-3">
                  {pasantiasData.beneficios.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-body-sm leading-relaxed"
                    >
                      <MaterialIcon name="check_circle" className="mt-0.5 shrink-0 text-[20px]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                href="mailto:pasantias@semta.org.bo?subject=Postulación%20Pasantía%20340h"
                icono="send"
                className="w-full"
              >
                Postular ahora
              </Button>
            </div>
          </div>

          <div className="mt-14">
            <SectionLabel icono="flag">Cómo funciona</SectionLabel>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pasantiasData.pasos.map((p) => (
                <div key={p.numero} className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6">
                  <span className="font-display-lg text-4xl font-extrabold text-primary/20">
                    {p.numero}
                  </span>
                  <h3 className="mt-2 font-headline-md text-on-surface">{p.titulo}</h3>
                  <p className="mt-2 text-body-sm text-on-surface-variant">{p.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}