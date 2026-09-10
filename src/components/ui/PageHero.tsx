import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function PageHero({
  crumbs,
  badge,
  titulo,
  descripcion,
}: {
  crumbs: { label: string; href: string }[];
  badge?: { icono: string; text: string };
  titulo: React.ReactNode;
  descripcion?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-bosque py-16 text-white">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <nav
          className="flex items-center gap-1.5 text-label-md text-white/60"
          aria-label="Miga de pan"
        >
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <MaterialIcon name="chevron_right" className="text-[1em]" />
              )}
              {i === crumbs.length - 1 ? (
                <span className="text-white/90">{c.label}</span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {badge && (
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-label-md font-semibold uppercase tracking-wider backdrop-blur">
            <MaterialIcon name={badge.icono} className="text-[1.1em] text-primary-fixed" />
            {badge.text}
          </span>
        )}

        <h1 className="mt-5 max-w-3xl font-display-lg text-[40px] font-extrabold leading-[1.08] tracking-tight sm:text-[52px]">
          {titulo}
        </h1>

        {descripcion && (
          <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-white/75">
            {descripcion}
          </p>
        )}
      </Container>
    </section>
  );
}