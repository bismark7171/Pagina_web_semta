/**
 * Footer.tsx
 * Mejoras Fase 2.5:
 * - Links con subrayado animado (underline expansion)
 * - Cooperantes como chips con hover color
 * - Horario de atención visible
 */
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { footerData } from "@/data/footer";
import { siteDetails } from "@/data/siteDetails";
import { cooperantes } from "@/data/cooperantes";

const redesIconos: Record<string, string> = {
  facebook: "thumb_up",
  instagram: "photo_camera",
  linkedin: "business",
  youtube: "play_circle",
  whatsapp: "chat",
};

/** Link con subrayado que se expande desde la izquierda al hover */
function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative inline-flex items-center gap-1.5",
        "text-body-md text-white/75 transition-colors hover:text-primary-fixed",
        className ?? "",
      ].join(" ")}
    >
      <MaterialIcon
        name="chevron_right"
        className="text-[1em] text-primary-fixed-dim transition-transform duration-200 group-hover:translate-x-0.5"
      />
      <span>
        {children}
        {/* Línea que crece desde la izquierda */}
        <span
          className="absolute -bottom-px left-0 h-px w-0 bg-primary-fixed transition-all duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bosque text-white">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop py-16">
        {/* Cooperantes — encima del grid principal */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
          <p className="text-label-caps uppercase tracking-[0.16em] text-white/40">
            Cooperantes y aliados internacionales
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cooperantes.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-label-md font-semibold text-white/70 transition-colors hover:border-primary-fixed/50 hover:bg-primary-fixed/10 hover:text-primary-fixed"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Columna: brand */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-body-sm leading-relaxed text-white/70">
              {footerData.subheading}
            </p>

            {/* Horario */}
            <div className="mt-4 flex items-center gap-2 text-body-sm text-white/50">
              <MaterialIcon name="schedule" className="text-primary-fixed-dim" />
              {footerData.contacto.horario}
            </div>

            {/* Redes sociales */}
            <div className="mt-6 flex items-center gap-3">
              {siteDetails.redes.map((red) => (
                <Link
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white/80 transition-all duration-200 hover:scale-110 hover:bg-primary-container hover:text-white"
                  aria-label={red.nombre}
                >
                  <MaterialIcon name={redesIconos[red.icono] ?? "link"} className="text-[22px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Columnas de nav */}
          {footerData.columnas.map((col) => (
            <div key={col.titulo}>
              <h3 className="text-label-caps uppercase tracking-[0.16em] text-white/50">
                {col.titulo}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <AnimatedLink href={item.href}>{item.label}</AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contacto */}
        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 text-body-sm text-white/60 sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <MaterialIcon name="location_on" className="text-primary-fixed-dim" />
            {footerData.contacto.direccion}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:justify-end">
            <Link
              href={`mailto:${footerData.contacto.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-fixed"
            >
              <MaterialIcon name="mail" className="text-primary-fixed-dim" />
              {footerData.contacto.email}
            </Link>
            <Link
              href={`tel:${footerData.contacto.telefono}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-fixed"
            >
              <MaterialIcon name="call" className="text-primary-fixed-dim" />
              {footerData.contacto.telefono}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-label-md text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SEMTA · Servicios Múltiples de Tecnologías Apropiadas</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="transition-colors hover:text-primary-fixed">
              Privacidad
            </Link>
            <Link href="/transparencia" className="transition-colors hover:text-primary-fixed">
              Transparencia
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
