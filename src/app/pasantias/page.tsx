import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programa de Pasantías Universitarias (340 Horas)",
  description:
    "Prácticas pre-profesionales y de grado en agroecología, ingeniería hidráulica, ciencias sociales y energías renovables en comunidades bolivianas.",
};

export default function PasantiasPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel icono="badge">Prácticas y Trabajo de Campo</SectionLabel>
          <h1 className="mt-3 font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
            Programa de Pasantías <span className="text-primary">(340 Horas)</span>
          </h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Una experiencia formativa inmersiva en terreno junto a técnicos expertos y comunidades
            originarias de los Andes y Valles bolivianos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
                <MaterialIcon name="agriculture" className="text-2xl" />
              </span>
              <h2 className="font-bold text-lg text-on-surface">Agronomía y Agroecología</h2>
              <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed">
                Bioinsumos, manejo de suelos, cultivos andinos resilientes y microclimas en
                invernaderos subterráneos.
              </p>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary/10 text-secondary mb-4">
                <MaterialIcon name="water_drop" className="text-2xl" />
              </span>
              <h2 className="font-bold text-lg text-on-surface">Recursos Hídricos</h2>
              <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed">
                Diseño de atajados, cosecha de agua de lluvia, microriego por goteo y monitoreo de
                cuencas de cabecera.
              </p>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-tertiary/10 text-tertiary mb-4">
                <MaterialIcon name="groups" className="text-2xl" />
              </span>
              <h2 className="font-bold text-lg text-on-surface">Ciencias Sociales</h2>
              <p className="mt-2 text-body-sm text-on-surface-variant leading-relaxed">
                Gobernanza comunitaria del agua, liderazgo de mujeres campesinas y documentación de
                saberes locales.
              </p>
            </div>
          </div>

          {/* Requisitos y Beneficios */}
          <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="font-bold text-2xl text-on-surface mb-6">Requisitos y Modalidad</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-bold text-label-lg text-primary flex items-center gap-2">
                  <MaterialIcon name="check_circle" className="text-lg" />
                  Perfil del Postulante
                </h3>
                <ul className="space-y-2 text-body-sm text-on-surface-variant">
                  <li>• Estudiante de últimos semestres o egresado universitario.</li>
                  <li>• Carta de acreditación académica de la universidad de origen.</li>
                  <li>• Compromiso ético y respeto por las normas de las comunidades.</li>
                  <li>• Disponibilidad para viajes y estancias en comunidades rurales.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-label-lg text-primary flex items-center gap-2">
                  <MaterialIcon name="verified" className="text-lg" />
                  Certificación SEMTA
                </h3>
                <ul className="space-y-2 text-body-sm text-on-surface-variant">
                  <li>
                    • Certificado oficial con 340 horas reloj acreditadas y código de verificación.
                  </li>
                  <li>• Tutoría personalizada con ingenieros y sociólogos de vasta experiencia.</li>
                  <li>• Viáticos de campo cubiertos durante actividades en municipios.</li>
                  <li>• Acceso irrestricto al archivo documental y biblioteca técnica.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-body-sm text-on-surface-variant">
                Convocatorias semestrales para las gestiones I y II.
              </p>
              <Link href="/contacto">
                <Button variant="primary" size="md">
                  <MaterialIcon name="send" className="text-[18px]" />
                  Postular al Programa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
