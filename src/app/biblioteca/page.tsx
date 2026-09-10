import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { bibliotecaDocs, bibliotecaDestacados } from "@/data/biblioteca";

export const metadata: Metadata = {
  title: "Biblioteca Digital",
  description:
    "Memorias institucionales, manuales técnicos, estados financieros y publicaciones de SEMTA en descarga libre.",
};

export default function BibliotecaPage() {
  const marcadas = bibliotecaDocs.filter((d) =>
    bibliotecaDestacados.includes(d.titulo),
  );
  const resto = bibliotecaDocs.filter(
    (d) => !bibliotecaDestacados.includes(d.titulo),
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Biblioteca", href: "/biblioteca" }]}
        badge={{ icono: "menu_book", text: "Acceso Libre" }}
        titulo={
          <>
            Biblioteca <span className="text-primary-fixed">Digital</span>
          </>
        }
        descripcion="Memorias, manuales técnicos, estudios y publicaciones de libre consulta para la ciudadanía, organizaciones campesinas y la cooperación internacional."
      />

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="star">Destacados</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {marcadas.map((doc) => (
              <DocumentoCard key={doc.titulo} doc={doc} destacado />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-16">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <SectionLabel icono="inventory_2">Catálogo</SectionLabel>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((doc) => (
              <DocumentoCard key={doc.titulo} doc={doc} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DocumentoCard({
  doc,
  destacado = false,
}: {
  doc: (typeof bibliotecaDocs)[number];
  destacado?: boolean;
}) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta ${
        destacado ? "border-primary/30" : ""
      }`}
    >
      <div className="flex items-start justify-between p-7">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary-container/15 text-primary">
          <MaterialIcon name={doc.icono} className="text-[28px]" />
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-label-caps uppercase tracking-wider text-primary">
          {doc.etiqueta}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-7 pb-7">
        <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
          {doc.categoria} · {doc.gestion}
        </p>
        <h3 className="mt-2 font-headline-md leading-snug text-on-surface">
          {doc.titulo}
        </h3>
        <p className="mt-2 flex-1 text-body-sm leading-relaxed text-on-surface-variant">
          {doc.descripcion}
        </p>
        <a
          href={`mailto:info@semta.org.bo?subject=${encodeURIComponent(
            "Solicitud de documento: " + doc.titulo,
          )}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-label-md font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
        >
          <MaterialIcon name="download" className="text-[1.1em]" />
          Solicitar documento
        </a>
      </div>
    </article>
  );
}