import type { Metadata } from "next";
import CasaHero from "@/components/casa-semta/CasaHero";
import ServicioCard from "@/components/casa-semta/ServicioCard";
import GaleriaEspacios from "@/components/casa-semta/GaleriaEspacios";
import CasaFaq from "@/components/casa-semta/CasaFaq";
import { casaSemtaServicios, casaSemtaPhotogrid } from "@/data/casaSemta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Casa SEMTA · Sopocachi",
  description:
    "Espacios bioclimáticos para eventos, hospedaje solidario y bioinsumos agroecológicos en La Paz, Bolivia.",
};

export default function CasaSemtaPage() {
  return (
    <div className="flex flex-col bg-background">
      <CasaHero />

      {/* Servicios */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icono="room_service">Nuestros Servicios</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Espacios pensados para el{" "}
              <span className="text-primary">encuentro y aprendizaje</span>
            </h2>
            <p className="mt-3 text-body-md text-on-surface-variant">
              Instalaciones adaptadas para organizaciones sociales, instituciones educativas,
              eventos y visitantes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {casaSemtaServicios.map((servicio) => (
              <ServicioCard key={servicio.titulo} servicio={servicio} />
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Espacios */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="mb-12">
            <SectionLabel icono="photo_library">Recorrido Fotográfico</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Conoce nuestros <span className="text-primary">ambientes</span>
            </h2>
          </div>
          <GaleriaEspacios fotos={casaSemtaPhotogrid} />
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icono="help">Preguntas Frecuentes</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Todo lo que necesitas saber sobre <span className="text-primary">Casa SEMTA</span>
            </h2>
          </div>
          <CasaFaq />

          <div className="mt-14 text-center">
            <Link href="/contacto">
              <Button variant="primary" size="lg">
                <MaterialIcon name="calendar_month" className="text-[20px]" />
                Consultar Disponibilidad y Reservas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
