import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { agendaTalleres } from "@/data/agenda";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Agenda de Talleres",
  description:
    "Talleres presenciales y webinars de agroecología, cosecha de agua y bioconstrucción en Casa SEMTA.",
};

const estadoEstilo: Record<string, string> = {
  Abierto: "bg-primary/10 text-primary",
  "En curso": "bg-secondary-container/10 text-secondary",
  Convocatoria: "bg-tertiary-container text-on-tertiary-container",
};

function fechaLarga(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

export default function AgendaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Agenda", href: "/agenda" }]}
        badge={{ icono: "event_note", text: "Talleres Abiertos" }}
        titulo={
          <>
            Agenda de{" "}
            <span className="text-primary-fixed">talleres Casa SEMTA</span>
          </>
        }
        descripcion="Cursos presenciales y webinars prácticos para familias, técnicos y ciudadanía. Cupos limitados, inscripción previa obligatoria."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="calendar_month">Próximas fechas</SectionLabel>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {agendaTalleres.map((t) => (
              <article
                key={t.titulo}
                className="flex flex-col gap-5 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta sm:flex-row"
              >
                <div className="flex sm:flex-col sm:items-center sm:justify-center rounded-2xl bg-primary-container/20 px-5 py-4 text-center">
                  <span className="font-display-lg text-4xl font-extrabold text-primary">
                    {t.fecha.slice(8, 10)}
                  </span>
                  <span className="text-label-caps uppercase tracking-wider text-on-surface-variant">
                    {fechaLarga(t.fecha).split(" de ")[2]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-label-md font-semibold",
                        estadoEstilo[t.estado],
                      )}
                    >
                      {t.estado}
                    </span>
                    <span className="rounded-full bg-on-surface/5 px-3 py-1 text-label-md font-semibold text-on-surface-variant">
                      {t.modalidad}
                    </span>
                  </div>
                  <h3 className="mt-3 font-headline-md leading-snug text-on-surface">
                    {t.titulo}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-body-sm text-on-surface-variant">
                    <MaterialIcon name="schedule" className="text-[18px]" />
                    {t.hora}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-body-sm text-on-surface-variant">
                    <MaterialIcon name="location_on" className="text-[18px]" />
                    {t.lugar}
                  </p>
                  <p className="mt-2 text-body-sm font-semibold text-primary">
                    Cupos: {t.cupos} participantes
                  </p>
                  <div className="mt-auto pt-4">
                    <Button
                      href="/reservar"
                      variant={t.estado === "Convocatoria" ? "outline" : "primary"}
                      iconRight="arrow_forward"
                    >
                      Reservar mi cupo
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}