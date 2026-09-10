import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import ContactoForm from "@/components/forms/ContactoForm";
import { siteDetails } from "@/data/siteDetails";
import { footerData } from "@/data/footer";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos a SEMTA: alianzas, reserva de espacios, pasantías y voluntariado.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto", href: "/contacto" }]}
        badge={{ icono: "chat", text: "Estamos para escucharte" }}
        titulo={
          <>
            Hablemos con <span className="text-primary-fixed">SEMTA</span>
          </>
        }
        descripcion="¿Cooperante, comunidad, voluntaria o institución? Contanos tu idea y te contactamos dentro de las próximas 48 horas hábiles."
      />

      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-container-semta gap-10 px-gutter-desktop lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <ContactoForm />
          </div>

          <aside className="space-y-5">
            {[
              {
                icono: "mail",
                titulo: "Correo",
                linea1: siteDetails.contacto.email,
                href: `mailto:${siteDetails.contacto.email}`,
              },
              {
                icono: "call",
                titulo: "Teléfono",
                linea1: siteDetails.contacto.telefono,
                href: `tel:${siteDetails.contacto.telefono}`,
              },
              {
                icono: "location_on",
                titulo: "Sede La Paz",
                linea1: siteDetails.contacto.direccion,
              },
              {
                icono: "schedule",
                titulo: "Horario",
                linea1: siteDetails.contacto.horario,
              },
            ].map((c) => (
              <div
                key={c.titulo}
                className="flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={c.icono} className="text-[24px]" />
                </span>
                <div>
                  <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
                    {c.titulo}
                  </p>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="mt-1 text-body-md font-semibold text-on-surface transition-colors hover:text-primary"
                    >
                      {c.linea1}
                    </Link>
                  ) : (
                    <p className="mt-1 text-body-md font-semibold text-on-surface">
                      {c.linea1}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-bosque p-6 text-white">
              <p className="text-label-caps uppercase tracking-wider text-primary-fixed">
                Información legal
              </p>
              <p className="mt-3 text-body-sm leading-relaxed text-white/75">
                {footerData.subheading}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}