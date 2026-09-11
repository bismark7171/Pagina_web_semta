import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { nosotrosData } from "@/data/nosotros";
import { casaSemtaPhotogrid } from "@/data/casaSemta";

export default function QuienesSomos() {
  const anios = new Date().getFullYear() - nosotrosData.fundacion;
  const fotoComunidad = casaSemtaPhotogrid[4];

  return (
    <section className="bg-surface-container-lowest py-16">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={fotoComunidad.imagen}
                alt={fotoComunidad.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
                Quiénes somos
              </span>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                {anios}+ años <span className="text-primary">en el territorio</span>
              </h2>
              <p className="mt-4 text-body-lg leading-relaxed text-on-surface-variant">
                {nosotrosData.resumen}
              </p>
              <p className="mt-3 text-body-md leading-relaxed text-on-surface-variant">
                {nosotrosData.mision}
              </p>
              <div className="mt-6">
                <Button href="/nosotros" variant="solid" size="md">
                  Conocer nuestra historia
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
