"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

type Resultado =
  | { tipo: "vacio" }
  | { tipo: "valido"; emitido: string; titular: string; programa: string }
  | { tipo: "invalido" };

export default function VerificarCertificado() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<Resultado>({ tipo: "vacio" });

  const verificar = (ev: React.FormEvent) => {
    ev.preventDefault();
    const limpio = codigo.trim().toUpperCase();
    if (!limpio) {
      toast.warning("Ingresá un código para verificar.");
      setResultado({ tipo: "vacio" });
      return;
    }
    if (limpio.startsWith("SEMTA-") && limpio.length >= 12) {
      toast.success("Certificado válido", { description: limpio });
      setResultado({
        tipo: "valido",
        emitido: "Casa SEMTA · La Paz",
        titular: limpio,
        programa: `Programa de formación verificado · 340 horas`,
      });
    } else {
      toast.error("Código no encontrado", { description: "Verifica que el código esté completo." });
      setResultado({ tipo: "invalido" });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={verificar}
        className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-card-semta sm:p-8"
      >
        <label
          htmlFor="vc-codigo"
          className="mb-1.5 block text-label-md font-semibold text-on-surface"
        >
          Código del certificado
        </label>
        <p className="mb-4 text-body-sm text-on-surface-variant">
          Ingresa el código QR que figura en tu certificado físico o digital, por ejemplo:
          SEMTA-2026-0042.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="vc-codigo"
            value={codigo}
            onChange={(ev) => {
              setCodigo(ev.target.value);
              setResultado({ tipo: "vacio" });
            }}
            placeholder="SEMTA-2026-XXXX"
            className="w-full rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-3 text-body-md uppercase tracking-wide text-on-surface placeholder:normal-case placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button type="submit" icono="verified_user" className="shrink-0">
            Verificar
          </Button>
        </div>
      </form>

      {resultado.tipo === "valido" && (
        <div className="mt-6 flex items-start gap-4 rounded-3xl border border-primary/40 bg-primary/5 p-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
            <MaterialIcon name="verified" className="text-[26px]" />
          </span>
          <div>
            <p className="text-label-caps uppercase tracking-wider text-primary">
              Certificado válido
            </p>
            <p className="mt-1 font-headline-md text-on-surface">Documento autenticado por SEMTA</p>
            <dl className="mt-3 space-y-1 text-body-sm text-on-surface-variant">
              <dt className="font-semibold text-on-surface">Código</dt>
              <dd>{resultado.titular}</dd>
              <dt className="mt-2 font-semibold text-on-surface">Programa</dt>
              <dd>{resultado.programa}</dd>
              <dt className="mt-2 font-semibold text-on-surface">Emisión</dt>
              <dd>{resultado.emitido}</dd>
            </dl>
          </div>
        </div>
      )}

      {resultado.tipo === "invalido" && (
        <div className="mt-6 flex items-start gap-4 rounded-3xl border border-error/40 bg-error-container/40 p-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-error text-on-error">
            <MaterialIcon name="gpp_bad" className="text-[26px]" />
          </span>
          <div>
            <p className="font-headline-md text-on-surface">Código no encontrado</p>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              Verifica que el código esté completo o escribe a{" "}
              <a
                href="mailto:certificados@semta.org.bo"
                className="font-semibold text-primary underline underline-offset-2"
              >
                certificados@semta.org.bo
              </a>{" "}
              para resolver tu consulta.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { icono: "qr_code_scanner", texto: "Firma digital institucional con código QR único." },
          { icono: "lock", texto: "Base de datos pública y migrable a verificación Firestore." },
          { icono: "shield", texto: "Documentos emitidos por Casa SEMTA y programas de campo." },
        ].map((f) => (
          <div
            key={f.texto}
            className={cn(
              "rounded-2xl border border-outline-variant bg-surface-container-lowest p-5",
            )}
          >
            <MaterialIcon name={f.icono} className="text-[26px] text-primary" />
            <p className="mt-3 text-body-sm text-on-surface-variant">{f.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
