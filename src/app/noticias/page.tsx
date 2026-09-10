import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { noticias } from "@/data/noticias";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Novedades de SEMTA: escuelas de campo, custodios de semillas, talleres de Casa SEMTA y ferias agroecológicas.",
};

function fechaLarga(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

export default function NoticiasPage() {
  const [principal, ...resto] = noticias;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Noticias", href: "/noticias" }]}
        badge={{ icono: "campaign", text: "Actualidad Institucional" }}
        titulo={
          <>
            Noticias de <span className="text-primary-fixed">territorio</span>
          </>
        }
        descripcion="Escuelas de campo, cosechas de agua, biodiversidad y vida en Casa SEMTA, contadas desde las comunidades."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <article className="grid overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest md:grid-cols-2">
            <div className="relative min-h-72">
              <Image
                src={principal.imagen}
                alt={principal.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary w-fit">
                {principal.categoria} · {fechaLarga(principal.fecha)}
              </span>
              <h2 className="mt-4 font-headline-lg leading-tight text-on-surface">
                {principal.titulo}
              </h2>
              <p className="mt-3 text-body-md leading-relaxed text-on-surface-variant">
                {principal.resumen}
              </p>
              <Button href="/contacto" variant="secondary" className="mt-6 w-fit">
                Leer completa
              </Button>
            </div>
          </article>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((n) => (
              <article
                key={n.titulo}
                className="group flex flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={n.imagen}
                    alt={n.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary w-fit">
                    {n.categoria}
                  </span>
                  <h3 className="mt-3 flex-1 font-headline-md leading-snug text-on-surface group-hover:text-primary transition-colors">
                    {n.titulo}
                  </h3>
                  <p className="mt-2 text-body-sm text-on-surface-variant">
                    {fechaLarga(n.fecha)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}