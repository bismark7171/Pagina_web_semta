import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-bosque py-24 text-white">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-container-semta flex-col items-center px-gutter-desktop text-center">
        <span className="grid size-20 place-items-center rounded-3xl bg-white/10">
          <MaterialIcon name="sentiment_dissatisfied" className="text-[44px] text-primary-fixed" />
        </span>
        <p className="mt-6 font-display-lg text-7xl font-extrabold tracking-tight">
          404
        </p>
        <h1 className="mt-2 font-headline-lg text-white">
          Página no encontrada
        </h1>
        <p className="mt-3 max-w-md text-body-lg leading-relaxed text-white/75">
          Lo que buscabas se movió o dejó de existir. Volvé al inicio o explorá
          nuestros proyectos y la biblioteca institucional.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" icono="home">
            Ir al inicio
          </Button>
          <Button href="/proyectos" variant="outline" className="border-white text-white hover:bg-white hover:text-bosque">
            Ver proyectos
          </Button>
          <Link
            href="/biblioteca"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-label-lg font-semibold text-white/85 transition-colors hover:text-white"
          >
            <MaterialIcon name="menu_book" className="text-[1.1em]" />
            Biblioteca
          </Link>
        </div>
      </div>
    </section>
  );
}