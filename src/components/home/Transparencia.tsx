import { trustBanner } from "@/data/trustBanner";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function Transparencia() {
  return (
    <section className="border-y border-outline-variant bg-surface-container-low py-16">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
              <MaterialIcon name="verified" className="text-[30px]" />
            </span>
            <div className="max-w-xl">
              <p className="font-label-caps uppercase tracking-[0.14em] text-primary">
                Confianza Pública
              </p>
              <h2 className="mt-2 font-headline-lg text-on-surface">
                {trustBanner.titulo}
              </h2>
              <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">
                {trustBanner.descripcion}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {trustBanner.botones.map((btn) => (
              <Button
                key={btn.text}
                href={btn.path}
                variant={btn.tipo === "solid" ? "solid" : "outline"}
                icono={btn.icono}
              >
                {btn.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}