"use client";

import { useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por ErrorBoundary:", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-surface-container-lowest py-20 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center px-4">
        <span className="grid size-20 place-items-center rounded-3xl bg-error-container/20 text-error">
          <MaterialIcon name="error_outline" className="text-[44px]" />
        </span>

        <h1 className="mt-6 font-headline-lg text-on-surface">Algo no salió bien</h1>

        <p className="mt-3 text-body-lg leading-relaxed text-on-surface-variant">
          Ocurrió un problema inesperado al cargar esta sección. Puedes intentar nuevamente.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} iconRight="refresh">
            Intentar nuevamente
          </Button>
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
