import type { Metadata } from "next";
import CasaHero from "@/components/casa-semta/CasaHero";
import ServicioCard from "@/components/casa-semta/ServicioCard";
import CasaFaq from "@/components/casa-semta/CasaFaq";
import GaleriaEspacios from "@/components/casa-semta/GaleriaEspacios";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { casaSemtaServicios, casaSemtaPhotogrid } from "@/data/casaSemta";

export const metadata: Metadata = {
  title: "Casa SEMTA · Servicios, Espacios y Agroecología",
  description:
    "Casa SEMTA en Sopocachi, La Paz: alquiler de espacios, tienda agroecológica, capacitaciones y servicios técnicos de tecnología apropiada.",
};

export default function CasaSemtaPage() {
  return (
    <>
      <CasaHero />

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <SectionLabel icono="handyman">Qué Ofrecemos</SectionLabel>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                Cuatro formas de <span className="text-primary">vivir la agroecología</span>
              </h2>
              <p className="mt-3 text-body-lg text-on-surface-variant">
                Todos los servicios financian nuestros programas de campo en el Altiplano y Valles.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {casaSemtaServicios.map((s) => (
              <ServicioCard key={s.titulo} servicio={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="max-w-xl">
            <SectionLabel icono="photo_camera">El Espacio</SectionLabel>
            <h2 className="mt-4 font-headline-xl text-on-surface">
              Patio bioclimático en el <span className="text-primary">corazón de Sopocachi</span>
            </h2>
            <p className="mt-3 text-body-lg text-on-surface-variant">
              Recorre en imágenes los espacios que reciben a cooperantes, organizaciones sociales y
              vecinas y vecinos de La Paz.
            </p>
          </div>

          <div className="mt-12">
            <GaleriaEspacios fotos={casaSemtaPhotogrid} />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <SectionLabel icono="quiz">Preguntas Frecuentes</SectionLabel>
              <h2 className="mt-4 font-headline-xl text-on-surface">
                Antes de tu visita, <span className="text-primary">resolvemos dudas</span>
              </h2>
            </div>
          </div>

          <div className="mt-10">
            <CasaFaq />
          </div>
        </div>
      </section>

      <section className="bg-verde-semta py-16 text-white">
        <div className="mx-auto flex w-full max-w-container-semta flex-col items-start justify-between gap-8 px-gutter-desktop lg:flex-row lg:items-center">
          <div>
            <h2 className="font-headline-lg">
              ¿Quieres coordinar un evento o sumarte a un taller?
            </h2>
            <p className="mt-2 max-w-xl text-body-md text-white/75">
              Escribenos a{" "}
              <a
                href="mailto:info@semta.org.bo"
                className="font-semibold text-primary-fixed underline underline-offset-2"
              >
                info@semta.org.bo
              </a>{" "}
              o visita la casa en Sopocachi para recorrer los espacios.
            </p>
          </div>
          <Button
            href="/contacto"
            variant="outline"
            icono="chat"
            className="border-white bg-white/10 text-white hover:bg-white hover:text-verde-semta"
          >
            Escríbenos
          </Button>
        </div>
      </section>
    </>
  );
}
