import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { transparenciaDocs } from "@/data/transparencia";
import DashboardKpis, { type KpiItem } from "@/components/transparencia/DashboardKpis";
import EstadoBar from "@/components/transparencia/EstadoBar";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Transparencia y Rendición Pública de Cuentas",
  description:
    "Auditorías externas, balances anuales, personería jurídica y rendición transparente ante comunidades y cooperantes.",
};

export default function TransparenciaPage() {
  const kpis: KpiItem[] = [
    {
      icono: "verified",
      valor: "100%",
      label: "Auditorías Limpias",
      detalle: "Dictamen sin salvedades por auditoría externa independiente",
      color: "bg-primary/10 text-primary",
    },
    {
      icono: "savings",
      valor: "88.4%",
      label: "Ejecución Directa en Campo",
      detalle: "Fondos destinados directamente a obras e insumos comunitarios",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icono: "gavel",
      valor: "Vigente",
      label: "Personería Jurídica",
      detalle: "Registrada y reconocida en el Estado Plurinacional de Bolivia",
      color: "bg-tertiary/10 text-tertiary",
    },
    {
      icono: "groups",
      valor: "100%",
      label: "Rendición Comunitaria",
      detalle: "Aprobada por asambleas y autoridades originarias de base",
      color: "bg-primary/10 text-primary",
    },
  ];

  // Calcular distribución de estados de proyectos
  const distribucion: Record<string, number> = {};
  projects.forEach((p) => {
    distribucion[p.estado] = (distribucion[p.estado] || 0) + 1;
  });

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel icono="verified_user">Rendición Institucional</SectionLabel>
          <h1 className="mt-3 font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
            Transparencia y <span className="text-primary">Rendición de Cuentas</span>
          </h1>
          <p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">
            Nuestra labor se fundamenta en la honestidad y la probidad técnica. Ponemos a
            disposición pública nuestros estados financieros auditados, memorias institucionales y
            mecanismos de control social.
          </p>
        </div>

        {/* KPIs */}
        <DashboardKpis kpis={kpis} />

        {/* Estado de Proyectos */}
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2">
            Estado de la Cartera de Proyectos
          </h2>
          <p className="text-body-sm text-on-surface-variant mb-6">
            Monitoreo en tiempo real del ciclo de vida de los proyectos ejecutados por SEMTA en
            Bolivia.
          </p>
          <EstadoBar distribucion={distribucion} total={projects.length} />
        </div>

        {/* Documentos Públicos */}
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-6">
            Documentos y Reportes Públicos
          </h2>

          <div className="divide-y divide-outline-variant">
            {transparenciaDocs.map((doc, i) => (
              <div
                key={i}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-label-xs font-bold text-primary uppercase">
                      {doc.clasificacion}
                    </span>
                    <span className="text-label-sm font-semibold text-on-surface-variant">
                      Gestión {doc.gestion}
                    </span>
                  </div>
                  <h3 className="font-bold text-body-lg text-on-surface">{doc.titulo}</h3>
                  <p className="text-body-sm text-on-surface-variant">{doc.nota}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-outline-variant px-4 py-2 text-label-md font-bold text-primary hover:bg-primary/5 transition-colors self-start sm:self-auto"
                >
                  <MaterialIcon name="download" className="text-[18px]" />
                  Descargar PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
