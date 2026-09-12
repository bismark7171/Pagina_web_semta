import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import DocumentoCard from "@/components/biblioteca/DocumentoCard";
import { adminGetLibrosPublicos } from "@/lib/firebase/adminBibliotecaService";
import { adaptLibros } from "@/lib/firebase/bibliotecaAdapter";
import { bibliotecaFallback } from "@/data/biblioteca";
import type { ILibro } from "@/types";

export const metadata: Metadata = {
  title: "Biblioteca Digital",
  description:
    "Memorias institucionales, manuales técnicos, estados financieros y publicaciones de SEMTA en descarga libre.",
};

// ISR: revalidar cada 10 minutos.
// Cuando se sube un nuevo documento en la app Flutter → máximo 10 min después
// la web lo muestra sin hacer deploy.
export const revalidate = 600;

export default async function BibliotecaPage() {
  // Intentar cargar desde Firestore — si falla, datos estáticos de muestra
  let libros: ILibro[] = bibliotecaFallback;

  try {
    const firestoreLibros = await adminGetLibrosPublicos();
    if (firestoreLibros.length > 0) {
      libros = adaptLibros(firestoreLibros);
    }
  } catch (err) {
    // Firebase no disponible en este entorno — mostrar datos estáticos
    console.warn("[BibliotecaPage] Usando fallback estático — Firebase no disponible:", err);
  }

  // Separar destacados del resto — igual que el patrón original
  const destacados = libros.filter((l) => l.esDestacado);
  const catalogo = libros.filter((l) => !l.esDestacado);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Biblioteca", href: "/biblioteca" },
        ]}
        badge={{ icono: "menu_book", text: "Acceso Libre" }}
        titulo={
          <>
            Biblioteca <span className="text-primary-fixed">Digital</span>
          </>
        }
        descripcion="Memorias, manuales técnicos, estudios y publicaciones de libre consulta para la ciudadanía, organizaciones campesinas y la cooperación internacional."
      />

      {/* Destacados — solo si hay alguno */}
      {destacados.length > 0 && (
        <section className="bg-background py-16">
          <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
            <SectionLabel icono="star">Destacados</SectionLabel>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {destacados.map((libro) => (
                <DocumentoCard key={libro.id} libro={libro} destacado />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catálogo completo */}
      <section
        className={
          destacados.length > 0 ? "bg-surface-container-lowest py-16" : "bg-background py-16"
        }
      >
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="flex items-end justify-between gap-4">
            <SectionLabel icono="inventory_2">
              {catalogo.length > 0 ? "Catálogo" : "Publicaciones"}
            </SectionLabel>
            {libros.length > 0 && (
              <p className="text-label-md text-on-surface-variant">
                {libros.length} documento{libros.length !== 1 ? "s" : ""} disponibles
              </p>
            )}
          </div>

          {catalogo.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catalogo.map((libro) => (
                <DocumentoCard key={libro.id} libro={libro} />
              ))}
            </div>
          ) : (
            // Si todos son destacados, mostrar todos igual en grilla
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {libros.map((libro) => (
                <DocumentoCard key={libro.id} libro={libro} destacado={libro.esDestacado} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA contacto */}
      <section className="bg-bosque py-14">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop text-center">
          <p className="text-body-lg text-white/80">
            ¿No encontrás lo que buscás? Escribinos directamente.
          </p>
          <a
            href="mailto:info@semta.org.bo?subject=Consulta%20Biblioteca%20Digital"
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-primary-fixed px-8 py-3.5 text-label-lg font-semibold text-primary-fixed transition-colors hover:bg-primary-fixed hover:text-bosque"
          >
            info@semta.org.bo
          </a>
        </div>
      </section>
    </>
  );
}
