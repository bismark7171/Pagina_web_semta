import type { Metadata } from "next";
import ContactoForm from "@/components/forms/ContactoForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { siteDetails } from "@/data/siteDetails";
import { footerContact } from "@/data/footer";

export const metadata: Metadata = {
  title: "Contacto y Ubicación",
  description:
    "Comunícate con el equipo de SEMTA en Sopocachi, La Paz. Consultas sobre proyectos, biblioteca, cursos o reserva de espacios.",
};

export default function ContactoPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel icono="mail">Canales de Contacto</SectionLabel>
          <h1 className="mt-3 font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
            Ponte en <span className="text-primary">Contacto con Nosotros</span>
          </h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Estamos atentos a tus consultas sobre investigación aplicada, asistencia técnica
            comunitaria, biblioteca o visita a Casa SEMTA.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Información directa */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm space-y-6">
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                Oficina Central y Casa SEMTA
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MaterialIcon name="place" className="text-xl" />
                  </span>
                  <div>
                    <p className="font-bold text-label-md text-on-surface">Dirección</p>
                    <p className="text-body-sm text-on-surface-variant">
                      {footerContact.direccion}
                    </p>
                    <p className="text-body-xs text-on-surface-variant/70">
                      Sopocachi, La Paz - Bolivia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MaterialIcon name="phone" className="text-xl" />
                  </span>
                  <div>
                    <p className="font-bold text-label-md text-on-surface">Teléfono / WhatsApp</p>
                    <p className="text-body-sm text-on-surface-variant">{footerContact.telefono}</p>
                    <p className="text-body-xs text-on-surface-variant/70">
                      Lun - Vie: 08:30 a 17:30
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MaterialIcon name="mail" className="text-xl" />
                  </span>
                  <div>
                    <p className="font-bold text-label-md text-on-surface">Correo Electrónico</p>
                    <p className="text-body-sm text-on-surface-variant">{footerContact.email}</p>
                    <p className="text-body-xs text-on-surface-variant/70">
                      Respuesta promedio en 24h hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <MaterialIcon name="support_agent" className="text-3xl text-primary" />
                <div>
                  <h3 className="font-bold text-label-lg text-on-surface">
                    Atención Rápida por WhatsApp
                  </h3>
                  <p className="text-body-xs text-on-surface-variant">
                    Consulta directa con el equipo de recepción
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${siteDetails.contacto.whatsapp?.replace(/[^0-9]/g, "") || "59171500000"}?text=Hola%20SEMTA,%20tengo%20una%20consulta`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-label-md font-bold text-white hover:bg-primary/90 transition-colors"
              >
                <MaterialIcon name="chat" className="text-[18px]" />
                Abrir WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario */}
          <ContactoForm />
        </div>
      </div>
    </div>
  );
}
