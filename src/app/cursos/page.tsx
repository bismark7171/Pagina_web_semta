import type { Metadata } from "next";
import CursoCard from "@/components/cursos/CursoCard";
import { cursosFallback } from "@/data/cursos";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata: Metadata = {
  title: "Cursos y Certificaciones",
  description:
    "Formación técnica especializada en agroecología andina, cosecha de agua, tecnologías apropiadas y liderazgo comunitario con certificación SEMTA.",
};

export default function CursosPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel icono="school">Formación Continua</SectionLabel>
          <h1 className="mt-3 font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
            Cursos Técnicos y <span className="text-primary">Certificaciones</span>
          </h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Programas teórico-prácticos impartidos por especialistas de campo con más de 40 años de
            trayectoria en saberes andinos y tecnologías ecológicas.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/verificar-certificado">
              <Button variant="secondary" size="md">
                <MaterialIcon name="verified" className="text-[18px]" />
                Verificar Certificado Oficial
              </Button>
            </Link>
            <Link href="/pasantias">
              <Button variant="outline" size="md">
                <MaterialIcon name="badge" className="text-[18px]" />
                Programa de Pasantías (340h)
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cursosFallback.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      </div>
    </div>
  );
}
