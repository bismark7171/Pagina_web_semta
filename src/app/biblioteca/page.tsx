import type { Metadata } from "next";
import BibliotecaCatalog from "@/components/biblioteca/BibliotecaCatalog";
import { bibliotecaFallback } from "@/data/biblioteca";

export const metadata: Metadata = {
  title: "Biblioteca Agroecológica Digital",
  description:
    "Descarga gratuita de manuales técnicos, cartillas de tecnologías apropiadas, memorias e investigaciones de SEMTA.",
};

export default function BibliotecaPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-container-semta px-gutter-desktop">
        <BibliotecaCatalog libros={bibliotecaFallback} />
      </div>
    </div>
  );
}
