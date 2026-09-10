import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import ContactoForm from "@/components/forms/ContactoForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Reservar Espacio · Casa SEMTA",
  description:
    "Reservá el auditorio bioclimático o las salas modulares de Casa SEMTA en Sopocachi para talleres, asambleas y eventos.",
};

const espacios = [
  { icono: "event_seat", nombre: "Auditorio", capacidad: "80 personas", detalle: "Proyector, cañón multimedia y audio profesional." },
  { icono: "door_front", nombre: "Salas modulares", capacidad: "20 - 40 personas", detalle: "Espacios flexibles para mesas de trabajo y talleres." },
  { icono: "local_florist", nombre: "Patio ecológico", capacidad: "60 personas", detalle: "Abierto, con catering agroecológico opcional." },
];

export default function ReservarPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Casa SEMTA", href: "/casa-semta" }, { label: "Reservar", href: "/reservar" }]}
        badge={{ icono: "event", text: "Casa SEMTA · Sopocachi" }}
        titulo={
          <>
            Reservá un{" "}
            <span className="text-primary-fixed">espacio bioclimático</span>
          </>
        }
        descripcion="Auditorio y salas cálidas y sostenibles para talleres, asambleas, proyecciones y eventos corporativos con compromiso ambiental."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid gap-5 md:grid-cols-3">
            {espacios.map((e) => (
              <article
                key={e.nombre}
                className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={e.icono} className="text-[26px]" />
                </span>
                <h3 className="mt-4 font-headline-md text-on-surface">
                  {e.nombre}
                </h3>
                <p className="mt-1 text-label-lg font-semibold text-primary">
                  {e.capacidad}
                </p>
                <p className="mt-2 text-body-sm text-on-surface-variant">
                  {e.detalle}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
              <ContactoForm
                asuntoInicial="Reserva de espacios"
                titulo="Solicitud de reserva"
                submitText="Enviar solicitud"
                successText="Solicitud recibida. Confirmaremos disponibilidad de fecha y horario por correo."
              />
            </div>

            <aside className="space-y-4">
              <SectionLabel icono="info">Para coordinar más rápido</SectionLabel>
              <ul className="space-y-3">
                {[
                  "Indicá espacio, fecha, horario estimado y número de participantes.",
                  "La reserva se confirma con el pago y la firma del reglamento de uso.",
                  "El retorno social: el 100% de los ingresos se reinvierte en proyectos comunales.",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-body-sm leading-relaxed text-on-surface-variant"
                  >
                    <MaterialIcon
                      name="check_circle"
                      className="mt-0.5 shrink-0 text-[20px] text-primary"
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <Button href="/casa-semta" variant="ghost">
                Conocer más de Casa SEMTA
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}