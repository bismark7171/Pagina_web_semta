import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import VerificarCertificado from "@/components/verificar/VerificarCertificado";

export const metadata: Metadata = {
  title: "Verificar Certificado SEMTA",
  description:
    "Comprueba en segundos la autenticidad de un certificado emitido por SEMTA. Cada certificado lleva un código QR único gestionado por el sistema maestro.",
};

export default function VerificarCertificadoPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Verificar Certificado", href: "/verificar-certificado" },
        ]}
        badge={{ icono: "verified_user", text: "Autenticación Institucional" }}
        titulo={
          <>
            Verificar un <span className="text-primary-fixed">certificado SEMTA</span>
          </>
        }
        descripcion="Cada certificado emitido por SEMTA lleva un código QR único e irrepetible. La verificación de autenticidad está gestionada por el sistema maestro institucional."
      />

      {/* ── Cómo funciona ────────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-12">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icono: "qr_code_scanner",
                titulo: "Escanea el QR",
                desc: "Usa cualquier lector de QR en tu celular sobre el certificado físico o digital.",
              },
              {
                icono: "verified",
                titulo: "Sistema maestro verifica",
                desc: "La base de datos institucional confirma si el certificado es auténtico.",
              },
              {
                icono: "check_circle",
                titulo: "Resultado inmediato",
                desc: "Válido o inválido en segundos, sin trámites ni tiempos de espera.",
              },
            ].map((paso) => (
              <div
                key={paso.titulo}
                className="flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={paso.icono} className="text-[22px]" />
                </span>
                <div>
                  <h3 className="font-headline-sm text-on-surface">{paso.titulo}</h3>
                  <p className="mt-1 text-body-sm text-on-surface-variant">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verificador ──────────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="search" className="mb-6">
            Verificar código
          </SectionLabel>
          <VerificarCertificado />
        </div>
      </section>

      {/* ── CTA cursos ───────────────────────────────────────────────────── */}
      <section className="border-t border-outline-variant bg-surface-container-lowest py-14">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-10 md:text-left">
            <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-primary-container/15 text-primary">
              <MaterialIcon name="school" className="text-[36px]" />
            </span>
            <div className="flex-1">
              <h2 className="font-headline-lg text-on-surface">
                ¿Querés obtener tu certificado SEMTA?
              </h2>
              <p className="mt-2 max-w-xl text-body-md text-on-surface-variant">
                Inscribite a uno de nuestros cursos técnicos. Al completarlo, recibirás un
                certificado digital con código QR único, verificable públicamente.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/cursos" icono="arrow_forward">
                Ver cursos disponibles
              </Button>
              <Button
                href="mailto:info@semta.org.bo?subject=Consulta%20sobre%20certificados"
                variant="outline"
                icono="mail"
              >
                Escribir a SEMTA
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
