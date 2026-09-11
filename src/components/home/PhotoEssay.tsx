"use client";

import { useState } from "react";
import { photoTags } from "@/data/photoTags";
import { quickStats } from "@/data/quickStats";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { Lightbox } from "@/components/ui/Lightbox";

export default function PhotoEssay() {
  const [main, secondary] = photoTags;
  const [fotoAbierta, setFotoAbierta] = useState<number | null>(null);

  const fotosLightbox = photoTags.map((p) => ({ imagen: p.imagen, alt: p.titulo }));

  return (
    <section className="relative overflow-hidden bg-bosque py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <SectionLabel className="bg-white/10 text-primary-fixed" icono="photo_library">
                La Huella en el Territorio
              </SectionLabel>
              <h2 className="mt-4 font-display-lg-mobile text-4xl font-extrabold leading-[1.1] text-white">
                Historias que el campo <span className="text-primary-fixed">cuenta</span>
              </h2>
              <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-white/75">
                Cada proyecto deja capacidad instalada, organización fortalecida y agua que vuelve a
                la vida. Documentamos el cambio con las propias comunidades.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {quickStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2 text-primary-fixed">
                      <MaterialIcon name={s.icono} className="text-[20px]" />
                      <span className="font-label-caps uppercase tracking-wider text-white/60">
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-2 font-display-lg text-3xl font-extrabold tracking-tight text-white">
                      <CountUp value={s.valor} duration={1.2} />
                    </p>
                    <p className="mt-1 text-body-sm text-white/60">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setFotoAbierta(0)}
                aria-label={`Ampliar foto: ${main.titulo}`}
                className="group relative block aspect-[16/11] w-full cursor-zoom-in overflow-hidden rounded-3xl"
              >
                <Image
                  src={main.imagen}
                  alt={main.titulo}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-1.5 text-label-md font-semibold text-white backdrop-blur">
                  <span className="size-2 rounded-full bg-primary-fixed" />
                  {main.badge}: {main.titulo}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFotoAbierta(1)}
                aria-label={`Ampliar foto: ${secondary.titulo}`}
                className="group absolute -bottom-8 -left-4 hidden aspect-[3/4] w-56 cursor-zoom-in overflow-hidden rounded-2xl border-4 border-bosque shadow-2xl md:block"
              >
                <Image
                  src={secondary.imagen}
                  alt={secondary.titulo}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-label-md font-semibold text-white">
                  {secondary.badge}
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {fotoAbierta !== null && (
        <Lightbox
          fotos={fotosLightbox}
          indiceInicial={fotoAbierta}
          onClose={() => setFotoAbierta(null)}
        />
      )}
    </section>
  );
}
