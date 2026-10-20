import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda de Talleres y Actividades",
  description:
    "Calendario de actividades comunitarias, talleres prácticos y eventos agroecológicos organizados por SEMTA.",
};

const ACTIVIDADES_AGENDA = [
  {
    fecha: "24 Mayo 2025",
    hora: "09:00 - 14:00",
    lugar: "Casa SEMTA, Sopocachi",
    titulo: "Taller Práctico: Elaboración de Bioles y Caldos Minerales",
    tipo: "Taller Presencial",
    cupos: "25 cupos",
    estado: "Inscripciones Abiertas",
  },
  {
    fecha: "07 Junio 2025",
    hora: "10:00 - 13:00",
    lugar: "Batallas, Comunidad Huancané",
    titulo: "Jornada de Campo: Siembra y Cosecha de Agua en Cuencas Altas",
    tipo: "Día de Campo",
    cupos: "40 cupos",
    estado: "Próximamente",
  },
  {
    fecha: "18 Junio 2025",
    hora: "16:00 - 18:30",
    lugar: "Auditorio Casa SEMTA / Zoom",
    titulo: "Conversatorio: Soberanía Alimentaria y Crisis Climática en los Andes",
    tipo: "Híbrido",
    cupos: "Abierto",
    estado: "Inscripciones Abiertas",
  },
  {
    fecha: "05 Julio 2025",
    hora: "09:00 - 17:00",
    lugar: "Campus Luribay",
    titulo: "Encuentro de Promotoras Agroecológicas y Manejo de Semillas Nativas",
    tipo: "Encuentro Comunitario",
    cupos: "Comunidades",
    estado: "Convocatoria",
  },
];

export default function AgendaPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel icono="calendar_month">Calendario Institucional</SectionLabel>
          <h1 className="mt-3 font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
            Agenda de Talleres y <span className="text-primary">Actividades</span>
          </h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Participa en nuestros espacios de formación, intercambio de semillas y jornadas
            prácticas en comunidad.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {ACTIVIDADES_AGENDA.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 shadow-sm transition-all hover:shadow-card-semta flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-label-xs font-bold text-primary uppercase">
                    {item.tipo}
                  </span>
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-label-xs font-semibold text-secondary">
                    {item.estado}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-on-surface">{item.titulo}</h3>

                <div className="flex flex-wrap gap-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <MaterialIcon name="calendar_today" className="text-[16px] text-primary" />
                    {item.fecha}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MaterialIcon name="schedule" className="text-[16px] text-primary" />
                    {item.hora}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MaterialIcon name="location_on" className="text-[16px] text-primary" />
                    {item.lugar}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link href="/contacto">
                  <Button variant="primary" size="md">
                    Registrarme
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
