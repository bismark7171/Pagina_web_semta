import { quickStats } from "@/data/quickStats";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function ProjectsStats({ total }: { total?: number }) {
  // Si se pasa el total real de Firestore, se muestra como primera tarjeta
  const stats =
    total !== undefined
      ? [
          {
            label: "Proyectos registrados",
            valor: String(total),
            detalle: "Colección pública Firestore",
            icono: "layers" as const,
          },
          ...quickStats.slice(1),
        ]
      : quickStats;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-container/15 text-primary">
            <MaterialIcon name={s.icono} className="text-[26px]" />
          </span>
          <div>
            <p className="font-display-lg text-3xl font-extrabold tracking-tight text-bosque">
              {s.valor}
            </p>
            <p className="text-label-lg font-semibold text-on-surface">{s.label}</p>
            <p className="text-body-sm text-on-surface-variant">{s.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
