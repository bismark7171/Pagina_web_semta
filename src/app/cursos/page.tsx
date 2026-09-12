import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import CursoCard from "@/components/cursos/CursoCard";
import { adminGetCursosActivos } from "@/lib/firebase/cursosService";
import { adaptCursos } from "@/lib/firebase/cursosAdapter";
import { cursosFallback, garantiasCertificacion } from "@/data/cursos";
import type { ICurso } from "@/types";

export const metadata: Metadata = {
  title: "Cursos y Certificaciones",
  description:
    "Formación técnica de campo con certificado QR avalado por SEMTA: cosecha de agua, agroecología, género y desarrollo rural. 40 años de experiencia en Bolivia.",
};

// ISR 10 minutos — un curso nuevo en Flutter aparece en la web sin deploy
export const revalidate = 600;

export default async function CursosPage() {
  // Cargar desde Firestore — fallback a datos estáticos si falla
  let cursos: ICurso[] = cursosFallback;

  try {
    const firestoreCursos = await adminGetCursosActivos();
    if (firestoreCursos.length > 0) {
      cursos = adaptCursos(firestoreCursos);
    }
  } catch (err) {
    console.warn("[CursosPage] Usando fallback estático — Firebase no disponible:", err);
  }

  const cursosActivos = cursos.filter((c) => c.estaActivo);
  const cursosArchivo = cursos.filter((c) => !c.estaActivo);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Cursos y Certificaciones", href: "/cursos" },
        ]}
        badge={{ icono: "workspace_premium", text: "Certificación Avalada" }}
        titulo={
          <>
            Formación técnica con <span className="text-primary-fixed">certificado QR</span>
          </>
        }
        descripcion="Cursos prácticos de campo impartidos por técnicos SEMTA con 40 años de experiencia. Cada participante recibe un certificado digital con código QR único e irrepetible, verificable públicamente."
      />

      {/* ── Por qué certificarse con SEMTA ─────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="text-center">
            <SectionLabel icono="verified" className="mx-auto">
              Por qué certificarse con SEMTA
            </SectionLabel>
            <h2 className="mt-4 font-headline-xl text-on-surface">
              Un certificado que respalda{" "}
              <span className="text-primary">trabajo real en territorio</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-body-lg text-on-surface-variant">
              No emitimos diplomas de escritorio. Cada hora certificada representa aprendizaje
              aplicado junto a comunidades campesinas e indígenas de Bolivia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {garantiasCertificacion.map((g) => (
              <div
                key={g.titulo}
                className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name={g.icono} className="text-[26px]" />
                </span>
                <h3 className="mt-4 font-headline-sm text-on-surface">{g.titulo}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
                  {g.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona el QR ────────────────────────────────────────────── */}
      <section className="bg-bosque py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel icono="qr_code_scanner" className="bg-white/10 text-primary-fixed">
                Sistema de verificación
              </SectionLabel>
              <h2 className="mt-4 font-headline-xl text-white">
                El QR lo verifica <span className="text-primary-fixed">el sistema maestro</span>
              </h2>
              <p className="mt-4 text-body-lg leading-relaxed text-white/80">
                La verificación de autenticidad no depende de este sitio web. El sistema maestro
                SEMTA gestiona toda la base de datos de certificados — con protección contra
                falsificaciones y registro permanente de cada emisión.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="/verificar-certificado"
                  variant="solid"
                  icono="verified_user"
                  className="text-white"
                >
                  Verificar un certificado
                </Button>
                <Button
                  href="mailto:info@semta.org.bo?subject=Consulta%20sobre%20certificados"
                  variant="ghost"
                  icono="mail"
                  className="text-white hover:bg-white/10"
                >
                  Escribir a SEMTA
                </Button>
              </div>
            </div>

            {/* Pasos de verificación */}
            <div className="space-y-4">
              {[
                {
                  n: "01",
                  titulo: "Recibes tu certificado",
                  desc: "Con nombre, curso, fechas y código QR único impreso.",
                },
                {
                  n: "02",
                  titulo: "Escaneas el QR",
                  desc: "Con cualquier lector de QR desde tu celular.",
                },
                {
                  n: "03",
                  titulo: "El sistema verifica en segundos",
                  desc: "La app SEMTA confirma si el certificado es auténtico y quién lo emitió.",
                },
                {
                  n: "04",
                  titulo: "Resultado inmediato",
                  desc: "Válido o inválido — sin tiempos de espera ni trámites.",
                },
              ].map((paso) => (
                <div
                  key={paso.n}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <span className="font-display-lg text-3xl font-extrabold text-primary-fixed/30">
                    {paso.n}
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-white">{paso.titulo}</h3>
                    <p className="mt-0.5 text-body-sm text-white/70">{paso.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cursos activos ─────────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex items-end justify-between gap-4">
            <SectionLabel icono="calendar_today">Cursos disponibles</SectionLabel>
            {cursosActivos.length > 0 && (
              <p className="text-label-md text-on-surface-variant">
                {cursosActivos.length} curso{cursosActivos.length !== 1 ? "s" : ""} activo
                {cursosActivos.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {cursosActivos.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cursosActivos.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <MaterialIcon name="event_upcoming" className="text-[30px]" />
              </span>
              <h3 className="mt-4 font-headline-md text-on-surface">
                Próximas convocatorias en preparación
              </h3>
              <p className="mt-2 max-w-sm text-body-sm text-on-surface-variant">
                Escribinos para ser de los primeros en enterarte cuando abramos inscripciones.
              </p>
              <Button
                href="mailto:info@semta.org.bo?subject=Avísenme%20sobre%20próximos%20cursos"
                icono="notifications_active"
                className="mt-6"
              >
                Avisarme de la próxima convocatoria
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Historial de cursos ────────────────────────────────────────────── */}
      {cursosArchivo.length > 0 && (
        <section className="border-t border-outline-variant bg-surface-container-lowest py-14">
          <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
            <SectionLabel icono="history_edu">Cursos anteriores</SectionLabel>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cursosArchivo.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA final ──────────────────────────────────────────────────────── */}
      <section className="bg-primary py-14">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop text-center">
          <h2 className="font-headline-xl text-on-primary">
            ¿Tu organización necesita formación técnica?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-on-primary/80">
            Diseñamos cursos a medida para ONGs, municipios y cooperativas. Con certificación
            incluida para todos los participantes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href="mailto:info@semta.org.bo?subject=Consulta%20Formación%20Institucional"
              variant="ghost"
              icono="business"
              className="border-2 border-on-primary text-on-primary hover:bg-on-primary/10"
            >
              Consultar para mi organización
            </Button>
            <Button
              href="/contacto"
              variant="ghost"
              icono="arrow_forward"
              className="text-on-primary hover:bg-on-primary/10"
            >
              Ir a Contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
