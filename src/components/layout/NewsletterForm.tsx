"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletterActions";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus("success");
      setMessage("¡Gracias por suscribirte!");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setMessage(result.error || "Error al suscribirse");
    }
  };

  return (
    <div>
      <h4 className="font-headline-sm text-label-caps uppercase tracking-wider text-primary-fixed">
        Boletín
      </h4>
      <p className="mt-4 text-body-sm text-white/80">
        Suscríbete para recibir noticias, cursos y nuevas publicaciones.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-body-sm text-white placeholder-white/50 outline-none transition-colors focus:border-primary-fixed focus:bg-white/20 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="flex items-center justify-center gap-2 rounded-md bg-primary-fixed px-4 py-2 text-label-md text-bosque transition-colors hover:bg-primary disabled:opacity-50"
        >
          {status === "loading" ? (
            <MaterialIcon name="hourglass_empty" className="animate-spin text-[18px]" />
          ) : status === "success" ? (
            <MaterialIcon name="check" className="text-[18px]" />
          ) : (
            <MaterialIcon name="send" className="text-[18px]" />
          )}
          <span>
            {status === "loading"
              ? "Procesando..."
              : status === "success"
                ? "Suscrito"
                : "Suscribirse"}
          </span>
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-body-xs ${status === "error" ? "text-error" : "text-primary-fixed"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
