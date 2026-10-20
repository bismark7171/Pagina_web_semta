"use client";

import { useState } from "react";
import DocumentoCard from "@/components/biblioteca/DocumentoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { ILibro } from "@/types";

export default function BibliotecaCatalog({ libros }: { libros: ILibro[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const term = searchTerm.toLowerCase().trim();

  // Extract unique categories and years for filters
  const categorias = Array.from(new Set(libros.map((l) => l.categoria).filter(Boolean))).sort();
  const anios = Array.from(new Set(libros.map((l) => l.gestion).filter(Boolean))).sort(
    (a, b) => Number(b) - Number(a),
  );

  const isSearching = term !== "" || selectedCategory !== "" || selectedYear !== "";

  // Filtrado
  const filteredLibros = libros.filter((l) => {
    const matchText =
      !term ||
      `${l.titulo} ${l.autor} ${l.descripcion} ${l.categoria} ${l.etiquetas?.join(" ") ?? ""}`
        .toLowerCase()
        .includes(term);
    const matchCategory = !selectedCategory || l.categoria === selectedCategory;
    const matchYear = !selectedYear || l.gestion === selectedYear;

    return matchText && matchCategory && matchYear;
  });

  const destacados = libros.filter((l) => l.esDestacado);
  const catalogo = libros.filter((l) => !l.esDestacado);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedYear("");
  };

  return (
    <>
      {/* Buscador y Filtros */}
      <section className="bg-background py-8 border-b border-outline-variant/30">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="relative">
              <MaterialIcon
                name="search"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="text"
                placeholder="Buscar por título, autor, o palabra clave..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-full py-4 pl-12 pr-12 text-body-lg text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface flex items-center justify-center p-1"
                  aria-label="Borrar búsqueda"
                >
                  <MaterialIcon name="close" />
                </button>
              )}
            </div>

            {/* Dropdowns de Filtro */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MaterialIcon
                  name="category"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
                />
                <select
                  className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-full py-2.5 pl-11 pr-10 text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <MaterialIcon
                  name="expand_more"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
              </div>

              <div className="relative flex-1">
                <MaterialIcon
                  name="calendar_today"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
                />
                <select
                  className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-full py-2.5 pl-11 pr-10 text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Todos los años</option>
                  {anios.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <MaterialIcon
                  name="expand_more"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
              </div>

              {isSearching && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 rounded-full border border-outline-variant px-4 py-2.5 text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  <MaterialIcon name="filter_alt_off" className="text-[18px]" />
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resultados de Búsqueda Activa */}
      {isSearching ? (
        <section className="bg-surface-container-lowest py-16 min-h-[50vh]">
          <div className="mx-auto w-full max-w-container-semta px-gutter-desktop">
            <div className="flex items-end justify-between gap-4">
              <SectionLabel icono="search">Resultados de búsqueda</SectionLabel>
              <p className="text-label-md text-on-surface-variant">
                {filteredLibros.length} documento{filteredLibros.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredLibros.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLibros.map((libro) => (
                  <DocumentoCard key={libro.id} libro={libro} destacado={libro.esDestacado} />
                ))}
              </div>
            ) : (
              <div className="mt-16 text-center">
                <MaterialIcon
                  name="search_off"
                  className="text-6xl text-on-surface-variant opacity-50 mb-4"
                />
                <h3 className="text-title-lg text-on-surface">No se encontraron resultados</h3>
                <p className="text-body-md text-on-surface-variant mt-2">
                  Intenta con otra palabra clave o término de búsqueda.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Vista por defecto cuando no hay búsqueda */
        <>
          {/* Destacados */}
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
        </>
      )}
    </>
  );
}
