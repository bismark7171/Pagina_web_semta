import { callouts } from "@/data/callouts";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

const fondoPorIndex = [
  "bg-primary-container text-on-primary-container",
  "bg-secondary-container text-on-secondary-container",
];

export default function DualCallout() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="grid gap-6 lg:grid-cols-2">
          {callouts.map((c, i) => (
            <article
              key={c.titulo}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl p-8 lg:p-10",
                fondoPorIndex[i % 2],
              )}
            >
              <MaterialIcon
                name={c.icono}
                className="absolute -right-4 bottom-4 text-[120px] opacity-10"
              />

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-label-caps uppercase tracking-wider">
                {c.chip}
              </span>

              <h3 className="mt-6 max-w-md font-headline-lg leading-tight">
                {c.titulo}
              </h3>
              <p className="mt-3 max-w-lg text-body-md leading-relaxed opacity-90">
                {c.descripcion}
              </p>

              <ul className="mt-6 space-y-2.5">
                {c.checks.map((check) => (
                  <li key={check} className="flex items-start gap-2.5 text-body-sm">
                    <MaterialIcon name="check_circle" className="text-[20px] shrink-0" />
                    <span className="leading-relaxed">{check}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {c.botones.map((btn) => (
                  <Button
                    key={btn.text}
                    href={btn.path}
                    variant={btn.tipo === "primary" ? "solid" : "ghost"}
                    icono={btn.tipo === "primary" ? "arrow_forward" : undefined}
                    className={cn(
                      btn.tipo === "primary"
                        ? "bg-bosque text-white hover:bg-bosque/90"
                        : "",
                    )}
                  >
                    {btn.tipo === "ghost" ? "Verificar certificación" : btn.text}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}