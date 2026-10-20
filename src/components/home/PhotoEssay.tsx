"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Button } from "@/components/ui/Button";

interface PhotoItem {
  imagen: string;
  alt: string;
  titulo: string;
  comunidad: string;
  categoria: string;
}

const ENSAYO_FOTOS: PhotoItem[] = [
  {
    imagen:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    alt: "Comunarias y técnicos supervisando atajado de agua en Batallas",
    titulo: "Cosechando la lluvia antes del invierno",
    comunidad: "Comunidad Calasaya, Batallas",
    categoria: "Seguridad Hídrica",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    alt: "Preparación comunitaria de bokashi y bioles enriquecidos",
    titulo: "Suelos vivos para la soberanía alimentaria",
    comunidad: "Achacachi, La Paz",
    categoria: "Agroecología",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    alt: "Asociación de productoras agroecológicas en asamblea",
    titulo: "Gobernanza participativa y lideresas andinas",
    comunidad: "Tiwanaku, Ingavi",
    categoria: "Liderazgo",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    alt: "Instalación de paneles fotovoltaicos para bombeo comunal",
    titulo: "Energía solar que impulsa los huertos",
    comunidad: "Patacamaya, Aroma",
    categoria: "Energía Solar",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    alt: "Interior de un invernadero subterráneo walipini con lechugas y tomates",
    titulo: "Walipinis: calor andino frente a -10°C",
    comunidad: "Viacha, Ingavi",
    categoria: "Tecnología Apropiada",
  },
];

export default function PhotoEssay() {
  const [destacada, ...secundarias] = ENSAYO_FOTOS;

  return (
    <section className="bg-surface-container-lowest py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel icono="photo_library">Fotoperiodismo de Campo</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Historias desde el <span className="text-primary">Territorio</span>
            </h2>
            <p className="mt-2 max-w-xl text-body-lg text-on-surface-variant">
              Imágenes reales de las familias, paisajes y tecnologías que construyen resiliencia en
              el Altiplano.
            </p>
          </div>

          <Button href="/noticias" variant="outline" icono="visibility">
            Ver todas las crónicas
          </Button>
        </div>

        {/* Grilla fotográfica con ZoomableImage encapsulado */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Foto Principal Destacada (7 columnas) */}
          <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface md:col-span-7">
            <ZoomableImage
              src={destacada.imagen}
              alt={destacada.alt}
              caption={`${destacada.titulo} — ${destacada.comunidad}`}
              aspectRatioClass="aspect-[16/11] md:aspect-[16/10]"
              sizes="(min-width: 768px) 60vw, 100vw"
              gallery={ENSAYO_FOTOS.map((f) => ({
                imagen: f.imagen,
                alt: f.alt,
                caption: `${f.titulo} (${f.comunidad})`,
              }))}
              galleryIndex={0}
              badge={
                <span className="rounded-full bg-black/60 px-3 py-1 text-label-xs font-semibold text-white backdrop-blur">
                  {destacada.categoria}
                </span>
              }
            />
            <div className="p-6">
              <span className="text-label-caps uppercase tracking-wider text-primary">
                {destacada.comunidad}
              </span>
              <h3 className="mt-1 font-headline-md text-on-surface">{destacada.titulo}</h3>
              <p className="mt-1 text-body-sm text-on-surface-variant">{destacada.alt}</p>
            </div>
          </div>

          {/* 4 Fotos Secundarias en Grid 2x2 (5 columnas) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-5">
            {secundarias.map((foto, idx) => (
              <div
                key={foto.titulo}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface"
              >
                <ZoomableImage
                  src={foto.imagen}
                  alt={foto.alt}
                  caption={`${foto.titulo} — ${foto.comunidad}`}
                  aspectRatioClass="aspect-[4/3]"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 100vw"
                  gallery={ENSAYO_FOTOS.map((f) => ({
                    imagen: f.imagen,
                    alt: f.alt,
                    caption: `${f.titulo} (${f.comunidad})`,
                  }))}
                  galleryIndex={idx + 1}
                  badge={
                    <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-label-xs font-medium text-white backdrop-blur">
                      {foto.categoria}
                    </span>
                  }
                />
                <div className="p-3.5">
                  <p className="text-label-xs font-semibold text-primary truncate">
                    {foto.comunidad}
                  </p>
                  <h4 className="mt-0.5 font-headline-xs text-on-surface text-body-sm font-semibold line-clamp-1">
                    {foto.titulo}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
