"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const inputCls =
  "w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function ContactoForm({
  asuntoInicial = "Consulta general",
  titulo = "Escribinos",
  submitText = "Enviar mensaje",
  successText = "Mensaje enviado. Te responderemos a la brevedad.",
}: {
  asuntoInicial?: string;
  titulo?: string;
  submitText?: string;
  successText?: string;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: asuntoInicial,
    mensaje: "",
  });

  const set = (campo: keyof typeof form) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [campo]: ev.target.value }));

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-primary/30 bg-primary/5 px-8 py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-primary text-on-primary">
          <MaterialIcon name="check" className="text-[32px]" />
        </span>
        <h3 className="mt-5 font-headline-md text-on-surface">¡Gracias!</h3>
        <p className="mt-2 max-w-sm text-body-md text-on-surface-variant">
          {successText}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border-2 border-primary px-5 py-2 text-label-lg font-semibold text-primary transition-colors hover:bg-primary hover:text-on-primary"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="font-headline-md text-on-surface">{titulo}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className="mb-1.5 block text-label-md font-semibold text-on-surface">
            Nombre completo *
          </label>
          <input
            id="cf-nombre"
            required
            value={form.nombre}
            onChange={set("nombre")}
            placeholder="María Condori"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-label-md font-semibold text-on-surface">
            Correo electrónico *
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="maria@correo.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-telefono" className="mb-1.5 block text-label-md font-semibold text-on-surface">
            Teléfono
          </label>
          <input
            id="cf-telefono"
            type="tel"
            value={form.telefono}
            onChange={set("telefono")}
            placeholder="+591 7 000 0000"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-asunto" className="mb-1.5 block text-label-md font-semibold text-on-surface">
            Asunto
          </label>
          <select
            id="cf-asunto"
            value={form.asunto}
            onChange={set("asunto")}
            className={inputCls}
          >
            <option>Consulta general</option>
            <option>Alianzas y cooperación</option>
            <option>Reserva de espacios</option>
            <option>Pasantías 340h</option>
            <option>Voluntariado</option>
            <option>Prensa</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-mensaje" className="mb-1.5 block text-label-md font-semibold text-on-surface">
          Mensaje *
        </label>
        <textarea
          id="cf-mensaje"
          required
          rows={5}
          value={form.mensaje}
          onChange={set("mensaje")}
          placeholder="Contanos en qué podemos ayudarte…"
          className={inputCls}
        />
      </div>

      <Button type="submit" iconRight="send" className="w-full sm:w-auto">
        {submitText}
      </Button>
    </form>
  );
}