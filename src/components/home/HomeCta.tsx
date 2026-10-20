import React from "react";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-bosque py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto w-full max-w-container-semta px-gutter-desktop text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-label-caps uppercase tracking-wider text-primary-fixed">
          <MaterialIcon name="handshake" className="text-[16px]" />
          Alianzas con Propósito
        </span>

        <h2 className="mx-auto mt-6 max-w-3xl font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          Trabajemos juntos por la resiliencia climática y la soberanía alimentaria
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-body-lg text-white/80 leading-relaxed">
          Ya seas una agencia de cooperación, gobierno municipal, investigadora o voluntario,
          sumemos esfuerzos en el Altiplano y Valles de Bolivia.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/contacto"
            variant="solid"
            size="lg"
            icono="mail"
            className="bg-primary-fixed text-bosque hover:bg-white hover:text-bosque shadow-lg"
          >
            Iniciar una conversación
          </Button>

          <Button
            href="/proyectos"
            variant="outline"
            size="lg"
            icono="visibility"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Conocer proyectos concluidos
          </Button>
        </div>
      </div>
    </section>
  );
}
