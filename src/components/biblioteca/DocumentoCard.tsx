"use client";

/**
 * DocumentoCard.tsx
 * Tarjeta de un documento de la Biblioteca Digital.
 * Extraído de src/app/biblioteca/page.tsx y adaptado para ILibro.
 *
 * Muestra: portada (si existe), categoría, año, título, descripción,
 * páginas, etiquetas y botón de acceso al PDF.
 */

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Card } from "@/components/ui/Card";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import type { ILibro } from "@/types";

interface Props {
  libro: ILibro;
  destacado?: boolean;
}

export default function DocumentoCard({ libro, destacado = false }: Props) {
  const urlFinal = libro.urlPdf || "";
  const tieneUrl = urlFinal.length > 0;
  const portadaFinal = libro.portada || undefined;
  const iconoFinal = libro.icono || "menu_book";
  const etiquetasList = libro.etiquetas || [];

  return (
    <Card hoverable className={destacado ? "border-primary/30" : ""}>
      {/* Portada — solo si hay imagen de portada */}
      {portadaFinal && (
        <ZoomableImage
          src={portadaFinal}
          alt={`Portada de ${libro.titulo}`}
          caption={`${libro.titulo}${libro.gestion && libro.gestion !== "—" ? ` (${libro.gestion})` : ""} · SEMTA`}
          aspectRatioClass="aspect-[16/7]"
          sizes="(min-width:768px) 50vw, 100vw"
        />
      )}

      {/* Cabecera con icono y etiqueta */}
      <div className="flex items-start justify-between p-7">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary-container/15 text-primary">
          <MaterialIcon name={iconoFinal} className="text-[28px]" />
        </span>
        <div className="flex flex-wrap gap-1.5">
          {destacado && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
              Destacado
            </span>
          )}
          {libro.idioma && (
            <span className="rounded-full bg-surface-container px-3 py-1 text-label-caps uppercase tracking-wider text-on-surface-variant">
              {libro.idioma}
            </span>
          )}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col px-7 pb-7">
        {/* Metadata: categoría y año */}
        <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
          {libro.categoria}
          {libro.gestion && libro.gestion !== "—" && ` · ${libro.gestion}`}
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
        {etiquetasList.filter((t) => t.toLowerCase() !== "destacado").length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {etiquetasList
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
            href={urlFinal}
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
    </Card>
  );
}
