import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { cooperantes } from "@/data/cooperantes";

export default function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-verde-semta py-20">
      <div
        className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-label-caps uppercase tracking-wider text-white">
                <span className="size-2 rounded-full bg-primary-fixed" />
                Trabajamos con comunidades
              </span>
              <h2 className="mt-5 font-display-lg-mobile text-4xl font-extrabold leading-[1.1] text-white">
                La transformación rural es posible con{" "}
                <span className="text-primary-fixed">tecnología apropiada</span>
              </h2>
              <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-white/85">
                Únete como voluntario, institución aliada o cooperante. Juntos llevamos agua,
                soberanía alimentaria y energías limpias a más familias originarias.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                href="/contacto"
                variant="outline"
                size="lg"
                className="border-white bg-white/10 text-white hover:bg-white hover:text-verde-semta"
              >
                Hablemos de una alianza
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-6">
            <span className="font-label-caps uppercase tracking-wider text-white/60">
              Cooperantes:
            </span>
            {cooperantes.slice(0, 6).map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/20 px-4 py-1.5 text-label-md font-semibold text-white/85"
              >
                {c}
              </span>
            ))}
            {cooperantes.length > 6 && (
              <span className="text-label-md text-white/60">
                y +{cooperantes.length - 6} agencias aliadas
              </span>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
