"use client";

/**
 * DocumentoCard.tsx
 * Tarjeta de un documento de la Biblioteca Digital.
 * Extraído de src/app/biblioteca/page.tsx y adaptado para ILibro.
 *
 * Muestra: portada (si existe), categoría, año, título, descripción,
 * páginas, etiquetas y botón de acceso al PDF.
 */

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { ILibro } from "@/types";

interface Props {
  libro: ILibro;
  destacado?: boolean;
}

export default function DocumentoCard({ libro, destacado = false }: Props) {
  // El botón de acción depende de si tenemos URL de PDF real
  const tieneUrl = libro.urlPdf.length > 0;

  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-3xl border",
        "bg-surface-container-lowest transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-card-semta",
        destacado ? "border-primary/30" : "border-outline-variant",
      ].join(" ")}
    >
      {/* Portada — solo si hay imagen de portada */}
      {libro.portada && (
        <div className="relative aspect-[16/7] overflow-hidden bg-surface-container-high">
          <Image
            src={libro.portada}
            alt={`Portada de ${libro.titulo}`}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback si la imagen no carga — ocultar el elemento
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Cabecera con icono y etiqueta */}
      <div className="flex items-start justify-between p-7">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary-container/15 text-primary">
          <MaterialIcon name={libro.icono} className="text-[28px]" />
        </span>
        <div className="flex flex-wrap gap-1.5">
          {destacado && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
              Destacado
            </span>
          )}
          <span className="rounded-full bg-surface-container px-3 py-1 text-label-caps uppercase tracking-wider text-on-surface-variant">
            {libro.idioma}
          </span>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col px-7 pb-7">
        {/* Metadata: categoría y año */}
        <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
          {libro.categoria}
          {libro.gestion !== "—" && ` · ${libro.gestion}`}
          {libro.paginas > 0 && ` · ${libro.paginas} págs.`}
        </p>

        {/* Título */}
        <h3 className="mt-2 font-headline-md leading-snug text-on-surface">{libro.titulo}</h3>

        {/* Autor */}
        {libro.autor && (
          <p className="mt-1 text-label-md font-semibold text-primary">{libro.autor}</p>
        )}

        {/* Descripción */}
        <p className="mt-2 flex-1 text-body-sm leading-relaxed text-on-surface-variant">
          {libro.descripcion}
        </p>

        {/* Etiquetas (excluyendo "destacado" que ya se muestra arriba) */}
        {libro.etiquetas.filter((t) => t.toLowerCase() !== "destacado").length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {libro.etiquetas
              .filter((t) => t.toLowerCase() !== "destacado")
              .slice(0, 4)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-container px-2.5 py-0.5 text-label-caps uppercase tracking-wider text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}

        {/* Botón de acceso */}
        {tieneUrl ? (
          <a
            href={libro.urlPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-label-md font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            <MaterialIcon name="open_in_new" className="text-[1.1em]" />
            Ver documento
          </a>
        ) : (
          <a
            href={`mailto:info@semta.org.bo?subject=${encodeURIComponent(
              "Solicitud de documento: " + libro.titulo,
            )}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-label-md font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
          >
            <MaterialIcon name="mail" className="text-[1.1em]" />
            Solicitar documento
          </a>
        )}
      </div>
    </article>
  );
}
