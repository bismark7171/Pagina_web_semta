import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { noticias } from "@/data/noticias";
import { Card } from "@/components/ui/Card";

function fechaLarga(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

export default function HomeNoticias() {
  const recientes = [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
                Actualidad
              </span>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                Noticias de <span className="text-primary">territorio</span>
              </h2>
            </div>
            <Button href="/noticias" variant="ghost" size="md">
              Ver todas las noticias
            </Button>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recientes.map((n, i) => (
            <FadeIn key={n.titulo} delay={i * 0.1}>
              <Card hoverable className="group h-full -col -outline-variant">
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
                  <h3 className="mt-3 flex-1 font-headline-md leading-snug text-on-surface transition-colors group-hover:text-primary">
                    {n.titulo}
                  </h3>
                  <p className="mt-2 text-body-sm text-on-surface-variant">{fechaLarga(n.fecha)}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
