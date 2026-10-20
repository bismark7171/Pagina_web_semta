import React from "react";
import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";

export interface PageHeroProps {
  crumbs?: Array<{ label: string; href: string }>;
  badge?: { icono: string; text: string };
  titulo: React.ReactNode;
  descripcion: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({ crumbs, badge, titulo, descripcion, children }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-bosque py-16 text-white md:py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-secondary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-container-semta px-gutter-desktop">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-label-md text-white/70">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && (
                    <MaterialIcon name="chevron_right" className="text-[18px] text-white/40" />
                  )}
                  {i === crumbs.length - 1 ? (
                    <span className="font-semibold text-white">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {badge && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-label-caps uppercase tracking-wider text-primary-fixed backdrop-blur-sm">
            <MaterialIcon name={badge.icono} className="text-[18px]" />
            {badge.text}
          </span>
        )}

        <h1 className="max-w-3xl font-headline-xl text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {titulo}
        </h1>

        <p className="mt-4 max-w-2xl text-body-lg text-white/85 leading-relaxed">{descripcion}</p>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export default PageHero;
