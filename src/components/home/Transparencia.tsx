import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export default function Transparencia() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 lg:p-12 shadow-card-semta">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionLabel icono="verified_user">Rendición Pública</SectionLabel>
              <h2 className="mt-3 font-headline-xl text-on-surface">
                Transparencia total en <span className="text-primary">fondos y resultados</span>
              </h2>
              <p className="mt-4 text-body-md leading-relaxed text-on-surface-variant">
                SEMTA rinde cuentas ante las asambleas comunitarias, el Estado boliviano y la
                cooperación internacional. Todos nuestros estados financieros cuentan con auditoría
                externa independiente anual con dictamen limpio.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-surface-container p-4">
                  <MaterialIcon name="fact_check" className="text-[24px] text-primary shrink-0" />
                  <div>
                    <h4 className="font-headline-sm text-body-sm font-semibold text-on-surface">
                      Auditorías Limpias
                    </h4>
                    <p className="text-body-xs text-on-surface-variant mt-0.5">
                      Dictámenes sin salvedades en los últimos 10 años.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-surface-container p-4">
                  <MaterialIcon name="qr_code_2" className="text-[24px] text-primary shrink-0" />
                  <div>
                    <h4 className="font-headline-sm text-body-sm font-semibold text-on-surface">
                      Certificación QR
                    </h4>
                    <p className="text-body-xs text-on-surface-variant mt-0.5">
                      Certificados verificables contra falsificaciones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/transparencia" variant="primary" icono="dashboard">
                  Ver Dashboard de Transparencia
                </Button>
                <Button href="/biblioteca" variant="outline" icono="download">
                  Descargar Informes Financieros
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container p-6">
              <h3 className="font-headline-sm text-on-surface">Garantías Institucionales</h3>
              <ul className="mt-4 space-y-3.5 text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2.5">
                  <MaterialIcon name="check_circle" className="text-[18px] text-primary shrink-0" />
                  <span>Personería Jurídica reconocida por el Estado Plurinacional</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MaterialIcon name="check_circle" className="text-[18px] text-primary shrink-0" />
                  <span>Registro activo en el Viceministerio de Inversión Pública (VIPFE)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MaterialIcon name="check_circle" className="text-[18px] text-primary shrink-0" />
                  <span>Política estricta de salvaguardas ambientales y género</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MaterialIcon name="check_circle" className="text-[18px] text-primary shrink-0" />
                  <span>Compras y contrataciones bajo normativa internacional</span>
                </li>
              </ul>

              <div className="mt-6 border-t border-outline-variant/60 pt-4">
                <p className="text-body-xs text-on-surface-variant/80">
                  ¿Necesitas una copia certificada para una propuesta o convenio?
                </p>
                <Link
                  href="/contacto?asunto=Transparencia"
                  className="mt-1.5 inline-flex items-center gap-1 text-label-sm font-semibold text-primary hover:underline"
                >
                  <span>Solicitar documentación oficial</span>
                  <MaterialIcon name="arrow_forward" className="text-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
