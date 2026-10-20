"use client";

import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

interface LineaAccion {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  imagen: string;
  alt: string;
  enlace: string;
  items: string[];
}

const LINEAS_ACCION: LineaAccion[] = [
  {
    id: "agua-riego",
    titulo: "Seguridad Hídrica & Microriego",
    descripcion:
      "Cosecha comunitaria de agua de lluvia, construcción de atajados familiares protegidos y sistemas de microriego por goteo para mitigar sequías andinas.",
    icono: "water_drop",
    imagen:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    alt: "Atajado y sistema de captación de agua en el altiplano boliviano",
    enlace: "/proyectos?tipo=Agua%20y%20Riego",
    items: [
      "Atajados familiares con geomembrana",
      "Riego tecnificado por goteo y aspersión",
      "Gobernanza comunitaria y comités de agua",
    ],
  },
  {
    id: "agroecologia",
    titulo: "Agroecología & Suelos Vivos",
    descripcion:
      "Recuperación biológica de fertilidad, biofábricas de bioinsumos, diversificación hortícola bajo carpas solares (walipinis) y semillas nativas.",
    icono: "grass",
    imagen:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    alt: "Parcela agroecológica diversificada con hortalizas andinas",
    enlace: "/proyectos?tipo=Agroecolog%C3%ADa",
    items: [
      "Biofábricas y caldos minerales locales",
      "Invernaderos subterráneos walipinis",
      "Custodia y ferias de semillas nativas",
    ],
  },
  {
    id: "energias-renovables",
    titulo: "Tecnologías Solares Apropiadas",
    descripcion:
      "Sistemas fotovoltaicos de bombeo de pozos, secadores solares de frutas y hortalizas, y tecnologías limpias adaptadas al frío extremo.",
    icono: "solar_power",
    imagen:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    alt: "Sistema de bombeo solar fotovoltaico en comunidad rural",
    enlace: "/proyectos?tipo=Tecnolog%C3%ADas%20Solares",
    items: [
      "Bombeo solar de agua subterránea",
      "Deshidratadores solares de alimentos",
      "Masa térmica para confort bioclimático",
    ],
  },
  {
    id: "liderazgo-mujeres",
    titulo: "Gobernanza & Liderazgo de Mujeres",
    descripcion:
      "Formación técnica, económica y organizativa de lideresas campesinas para el control soberano de los bienes comunes y cadenas de valor.",
    icono: "diversity_3",
    imagen:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    alt: "Asamblea comunitaria de lideresas indígenas en el altiplano",
    enlace: "/proyectos?tipo=Liderazgo%20de%20Mujeres",
    items: [
      "Escuelas de lideresas comunitarias",
      "Transformación y venta asociativa",
      "Derechos ambientales y equidad de género",
    ],
  },
];

export default function LineasDeAccion() {
  return (
    <section id="lineas-de-accion" className="bg-background py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel icono="category">Pilares de Acción</SectionLabel>
              <h2 className="mt-3 font-headline-xl text-on-surface">
                Nuestras <span className="text-primary">Líneas Estratégicas</span>
              </h2>
              <p className="mt-2 max-w-xl text-body-lg text-on-surface-variant">
                Respuestas concretas y comprobadas en territorio frente a la crisis climática
                andina.
              </p>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-label-md font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary"
            >
              <span>Explorar banco de proyectos</span>
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LINEAS_ACCION.map((linea, index) => (
            <FadeIn key={linea.id} delay={index * 0.1}>
              <div id={linea.id} className="h-full scroll-mt-32">
                <Card
                  hoverable
                  className="group relative h-full flex flex-col overflow-hidden border-0 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-[2rem]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                  {/* Imagen con Zoom, Cropper y Lightbox encapsulado */}
                  <ZoomableImage
                    src={linea.imagen}
                    alt={linea.alt}
                    caption={`${linea.titulo} - SEMTA`}
                    aspectRatioClass="aspect-[16/10]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    gallery={LINEAS_ACCION.map((l) => ({
                      imagen: l.imagen,
                      alt: l.alt,
                      caption: l.titulo,
                    }))}
                    galleryIndex={index}
                  />

                  <div className="relative z-10 flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                        <MaterialIcon name={linea.icono} className="text-[24px]" />
                      </span>
                      <h3 className="font-headline-sm font-bold text-on-surface leading-tight transition-colors group-hover:text-primary">
                        {linea.titulo}
                      </h3>
                    </div>

                    <p className="mt-5 text-body-md leading-relaxed text-on-surface-variant/90">
                      {linea.descripcion}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-outline-variant/60 pt-6">
                      {linea.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-body-sm font-medium text-on-surface"
                        >
                          <MaterialIcon
                            name="check_circle"
                            className="mt-0.5 shrink-0 text-[18px] text-primary/80"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <Link
                        href={linea.enlace}
                        className="inline-flex items-center gap-2 text-label-sm font-bold uppercase tracking-wider text-primary transition-all group-hover:gap-3"
                      >
                        <span>Ver proyectos</span>
                        <MaterialIcon name="arrow_forward" className="text-[18px]" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
