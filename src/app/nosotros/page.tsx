import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { nosotrosData, trayectoria, valores, indicadoresInstitucionales } from "@/data/nosotros";
import { Card } from "@/components/ui/Card";
import QuienesSomos from "@/components/home/QuienesSomos";

export const metadata: Metadata = {
  title: "Nosotros · Trayectoria y Equipo",
  description:
    "Más de cuatro décadas acompañando a comunidades campesinas e indígenas de Bolivia en soberanía alimentaria, agua y tecnologías apropiadas.",
};

export default function NosotrosPage() {
  return (
    <div className="bg-background">
      {/* Hero institucional */}
      <section className="bg-bosque py-20 text-white">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="history" className="text-primary-fixed">
            Desde 1982 en Bolivia
          </SectionLabel>
          <h1 className="mt-4 max-w-3xl font-headline-xl text-3xl sm:text-5xl font-extrabold leading-tight">
            Más de 40 años junto a los pueblos originarios
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-white/80 leading-relaxed">
            {nosotrosData.resumen}
          </p>
        </div>
      </section>

      {/* Quienes Somos Sección */}
      <QuienesSomos />

      {/* Indicadores */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {indicadoresInstitucionales.map((ind) => (
              <div
                key={ind.label}
                className="text-center p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant"
              >
                <MaterialIcon name={ind.icono} className="text-4xl text-primary mx-auto mb-2" />
                <p className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-on-surface">
                  {ind.valor}
                </p>
                <p className="font-bold text-label-md text-on-surface mt-1">{ind.label}</p>
                <p className="text-body-xs text-on-surface-variant mt-1">{ind.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-background">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 border-primary/20 bg-surface-container-lowest shadow-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <MaterialIcon name="flag" className="text-2xl" />
              </span>
              <h2 className="mt-4 font-headline-md text-2xl font-bold text-on-surface">
                Misión Institucional
              </h2>
              <p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">
                {nosotrosData.mision}
              </p>
            </Card>

            <Card className="p-8 border-secondary/20 bg-surface-container-lowest shadow-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                <MaterialIcon name="visibility" className="text-2xl" />
              </span>
              <h2 className="mt-4 font-headline-md text-2xl font-bold text-on-surface">
                Visión de Futuro
              </h2>
              <p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">
                {nosotrosData.vision}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icono="verified">Principios Rectores</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Nuestros <span className="text-primary">Valores Fundamentales</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((val) => (
              <div
                key={val.titulo}
                className="rounded-2xl border border-outline-variant bg-surface p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                  <MaterialIcon name={val.icono} className="text-xl" />
                </span>
                <h3 className="font-bold text-title-md text-on-surface">{val.titulo}</h3>
                <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed">
                  {val.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria Cronológica */}
      <section className="py-20 bg-background">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icono="timeline">Línea de Tiempo</SectionLabel>
            <h2 className="mt-3 font-headline-xl text-on-surface">
              Hitos de nuestra <span className="text-primary">trayectoria</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {trayectoria.map((h, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="shrink-0 font-extrabold text-primary text-xl w-16 pt-1 font-mono">
                  {h.anio}
                </span>
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 flex-1">
                  <p className="text-body-md text-on-surface">{h.evento}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
