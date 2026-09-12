import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import DashboardKpis, { type KpiItem } from "@/components/transparencia/DashboardKpis";
import EstadoBar from "@/components/transparencia/EstadoBar";
import { transparenciaDocs } from "@/data/transparencia";
import { cooperantes } from "@/data/cooperantes";
import { adminGetAllProjects } from "@/lib/firebase/adminProjectService";
import { adaptProjects } from "@/lib/firebase/projectAdapter";
import { projects as staticProjects } from "@/data/projects";
import type { IProject } from "@/types";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Dashboard público de impacto, estados financieros auditados y gobernanza de SEMTA — rendición de cuentas verificable.",
};

// ISR 5 min — mismo ciclo que /proyectos
export const revalidate = 300;

// ─── Helpers de cálculo ───────────────────────────────────────────────────────

function calcularKpis(proyectos: IProject[]): KpiItem[] {
  const total = proyectos.length;
  const enEjecucion = proyectos.filter((p) => p.estado === "En Ejecución").length;
  const municipiosUnicos = new Set(proyectos.map((p) => p.municipio)).size;
  const cooperantesUnicos = new Set(proyectos.map((p) => p.cooperante).filter(Boolean)).size;

  return [
    {
      icono: "layers",
      valor: String(total),
      label: "Proyectos registrados",
      detalle: "Colección pública Firestore",
      color: "bg-primary-container/15 text-primary",
    },
    {
      icono: "rocket_launch",
      valor: String(enEjecucion),
      label: "En ejecución ahora",
      detalle: "Intervenciones activas en campo",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icono: "map",
      valor: String(municipiosUnicos),
      label: "Municipios alcanzados",
      detalle: "Altiplano, Valles y Yungas",
      color: "bg-tertiary/10 text-tertiary",
    },
    {
      icono: "handshake",
      valor: String(cooperantesUnicos),
      label: "Cooperantes activos",
      detalle: "Agencias internacionales",
      color: "bg-primary-container/15 text-primary",
    },
  ];
}

function calcularDistribucion(proyectos: IProject[]): Record<string, number> {
  return proyectos.reduce<Record<string, number>>((acc, p) => {
    acc[p.estado] = (acc[p.estado] ?? 0) + 1;
    return acc;
  }, {});
}

function calcularTopMunicipios(
  proyectos: IProject[],
  n = 6,
): Array<{ nombre: string; count: number }> {
  const conteo: Record<string, number> = {};
  for (const p of proyectos) {
    conteo[p.municipio] = (conteo[p.municipio] ?? 0) + 1;
  }
  return Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([nombre, count]) => ({ nombre, count }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TransparenciaPage() {
  // Datos reales de Firestore — fallback a estáticos si falla
  let proyectos: IProject[] = staticProjects;

  try {
    const [fps, municipiosMap, financiadoresMap, tiposMap] = await Promise.all([
      adminGetAllProjects(),
      // Reutilizamos las funciones ya existentes en adminProjectService
      import("@/lib/firebase/adminProjectService").then((m) => m.adminGetMunicipios()),
      import("@/lib/firebase/adminProjectService").then((m) => m.adminGetFinanciadores()),
      import("@/lib/firebase/adminProjectService").then((m) => m.adminGetTiposProyecto()),
    ]);

    if (fps.length > 0) {
      proyectos = adaptProjects(fps, municipiosMap, financiadoresMap, tiposMap);
    }
  } catch (err) {
    console.warn("[TransparenciaPage] Usando datos estáticos:", err);
  }

  const kpis = calcularKpis(proyectos);
  const distribucion = calcularDistribucion(proyectos);
  const topMunicipios = calcularTopMunicipios(proyectos);
  const maxCount = topMunicipios[0]?.count ?? 1;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Transparencia", href: "/transparencia" },
        ]}
        badge={{ icono: "bar_chart", text: "Dashboard Público" }}
        titulo={
          <>
            Transparencia e <span className="text-primary-fixed">Impacto Verificable</span>
          </>
        }
        descripcion="Datos en tiempo real del sistema maestro SEMTA. Cada número refleja proyectos reales, familias beneficiadas y fondos auditados en Bolivia."
      />

      {/* ── KPIs ─────────────────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="monitoring">Indicadores clave</SectionLabel>
          <div className="mt-8">
            <DashboardKpis kpis={kpis} />
          </div>
        </div>
      </section>

      {/* ── Distribución por estado + Top municipios ──────────────────────── */}
      <section className="bg-surface-container-lowest py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Estado de proyectos */}
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7">
              <SectionLabel icono="donut_large">Estado de proyectos</SectionLabel>
              <p className="mt-2 text-body-sm text-on-surface-variant">
                Distribución del portafolio completo de {proyectos.length} proyectos.
              </p>
              <div className="mt-6">
                <EstadoBar distribucion={distribucion} total={proyectos.length} />
              </div>
            </div>

            {/* Top municipios */}
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7">
              <SectionLabel icono="location_on">Municipios con más proyectos</SectionLabel>
              <p className="mt-2 text-body-sm text-on-surface-variant">
                Cobertura territorial verificable.
              </p>
              <div className="mt-6 space-y-3">
                {topMunicipios.map(({ nombre, count }) => {
                  const pct = Math.round((count / maxCount) * 100);
                  return (
                    <div key={nombre} className="flex items-center gap-3">
                      <span className="w-28 shrink-0 text-body-sm font-semibold text-on-surface">
                        {nombre}
                      </span>
                      <div className="relative flex-1 overflow-hidden rounded-full bg-surface-container h-3">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 shrink-0 text-right text-label-md font-bold text-primary">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5">
                <Button href="/proyectos" variant="ghost" size="sm" icono="arrow_forward">
                  Ver todos los proyectos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Documentos públicos ──────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="folder_open">Documentos públicos</SectionLabel>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {transparenciaDocs.map((d) => (
              <article
                key={d.titulo}
                className="flex flex-col rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-container/15 text-primary">
                  <MaterialIcon name="article" className="text-[26px]" />
                </span>
                <p className="mt-4 text-label-caps uppercase tracking-wider text-on-surface-variant">
                  {d.clasificacion} · {d.gestion}
                </p>
                <h3 className="mt-2 flex-1 font-headline-md leading-snug text-on-surface">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-body-sm font-semibold text-primary">{d.nota}</p>
                <a
                  href={`mailto:info@semta.org.bo?subject=${encodeURIComponent(
                    "Solicitud de documento: " + d.titulo,
                  )}`}
                  className="mt-5 inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline"
                >
                  <MaterialIcon name="open_in_new" className="text-[1.1em]" />
                  Solicitar copia
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cooperantes ──────────────────────────────────────────────────── */}
      <section className="bg-bosque py-14">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="public" className="bg-white/10 text-primary-fixed">
            Cooperantes y aliados
          </SectionLabel>
          <p className="mt-3 max-w-2xl text-body-lg text-white/80">
            Los convenios de cooperación internacional ejecutan sus fondos con auditoría externa
            anual independiente.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {cooperantes.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-label-md font-semibold text-white/85"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/proyectos" variant="ghost" className="text-white hover:bg-white/10">
              Ver proyectos financiados
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
