import { callouts } from "@/data/callouts";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const fondoPorIndex = [
  "bg-bosque text-white", // Verde (Bosque)
  "bg-blue-500 text-white", // Azul
];

export default function DualCallout() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="grid gap-6 lg:grid-cols-2">
          {callouts.map((c, i) => (
            <FadeIn key={c.titulo} delay={i * 0.12}>
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 lg:p-10 transition-all duration-300 hover:shadow-lg",
                  fondoPorIndex[i % 2],
                )}
              >
                <MaterialIcon
                  name={c.icono}
                  className="absolute -right-6 -bottom-6 text-[180px] opacity-[0.08]"
                />

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black/15 px-4 py-1.5 text-label-xs font-bold uppercase tracking-wider">
                  {c.chip}
                </span>

                <h3 className="mt-8 font-headline-lg font-bold leading-tight">{c.titulo}</h3>
                <p className="mt-4 text-body-lg leading-relaxed opacity-90">{c.descripcion}</p>

                <ul className="mt-8 space-y-4">
                  {c.checks.map((check) => (
                    <li key={check} className="flex items-start gap-3 text-body-md font-medium">
                      <MaterialIcon
                        name="check_circle"
                        className="text-[22px] shrink-0 opacity-80"
                      />
                      <span className="leading-snug">{check}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10 flex flex-wrap items-center gap-4 relative z-10">
                  {c.botones.map((btn) =>
                    btn.tipo === "primary" ? (
                      <Button
                        key={btn.text}
                        href={btn.path}
                        variant="solid"
                        icono="chevron_right"
                        className={cn(
                          "rounded-full px-6 py-3 text-label-md font-bold shadow-sm hover:shadow-md transition-all",
                          i === 0
                            ? "bg-green-800 text-white hover:bg-green-900" // Verde más oscuro para el botón
                            : "bg-transparent text-white hover:bg-white/10",
                        )}
                      >
                        {btn.text}
                      </Button>
                    ) : (
                      <a
                        key={btn.text}
                        href={btn.path}
                        className="text-label-md font-bold text-white hover:text-white/80 transition-colors"
                      >
                        {btn.text}
                      </a>
                    ),
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
