"use client";

import React, { useRef, useState, useCallback } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface CertificadoHolograficoProps {
  codigo: string;
  titular: string;
  programa: string;
  emitido: string;
  horas?: number;
}

export function CertificadoHolografico({
  codigo,
  titular,
  programa,
  emitido,
  horas = 340,
}: CertificadoHolograficoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [downloading, setDownloading] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Inclinación 3D en perspectiva
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6; // max 6 deg
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    setGlare({ x: px, y: py, opacity: 0.35 });
    setTilt({ rx, ry });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setGlare({ x: 50, y: 50, opacity: 0 });
    setTilt({ rx: 0, ry: 0 });
  }, []);

  // Descarga directa en Canvas 2D sin bibliotecas externas (100% nativo)
  const handleDescargarCredencial = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 700;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No context 2d");

      // Fondo degradado institucional
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 700);
      bgGrad.addColorStop(0, "#092e0f"); // verde profundo
      bgGrad.addColorStop(1, "#0d631b");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 700);

      // Marco dorado y de seguridad
      ctx.strokeStyle = "rgba(230, 180, 70, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 1140, 640);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 40, 1120, 620);

      // Títulos
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px system-ui, sans-serif";
      ctx.fillText("SEMTA · SERVICIOS MÚLTIPLES DE TECNOLOGÍAS APROPIADAS", 60, 95);

      ctx.fillStyle = "rgba(230, 210, 140, 0.95)";
      ctx.font = "600 20px system-ui, sans-serif";
      ctx.fillText("CREDENCIAL DIGITAL INSTITUCIONAL DE FORMACIÓN", 60, 135);

      // Línea divisoria
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.beginPath();
      ctx.moveTo(60, 160);
      ctx.lineTo(1140, 160);
      ctx.stroke();

      // Contenido
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = "16px system-ui, sans-serif";
      ctx.fillText("SE CERTIFICA QUE EL TITULAR / IDENTIFICADOR:", 60, 220);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px system-ui, sans-serif";
      ctx.fillText(titular, 60, 275);

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = "16px system-ui, sans-serif";
      ctx.fillText("HA COMPLETADO SATISFACTORIAMENTE EL PROGRAMA:", 60, 340);

      ctx.fillStyle = "#86efac";
      ctx.font = "bold 26px system-ui, sans-serif";
      ctx.fillText(programa, 60, 385);

      // Datos complementarios
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "20px system-ui, sans-serif";
      ctx.fillText(`Carga Horaria: ${horas} Horas Académicas`, 60, 470);
      ctx.fillText(`Lugar y Emisión: ${emitido}`, 60, 510);
      ctx.fillText(`Código de Validación Criptográfica: ${codigo}`, 60, 550);

      // Sello de seguridad simulado
      ctx.beginPath();
      ctx.arc(1040, 530, 65, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230, 180, 70, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "#e6b446";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 15px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SEMTA VALIDADOR", 1040, 525);
      ctx.fillText("OFICIAL 2026", 1040, 545);

      // Exportar y descargar
      const link = document.createElement("a");
      link.download = `Credencial_${codigo}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Credencial descargada en alta resolución");
    } catch {
      toast.error("No se pudo generar la imagen de la credencial");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      {/* Tarjeta holográfica interactiva */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.12s ease-out",
        }}
        className="relative w-full overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-emerald-900 via-primary to-emerald-950 p-7 text-white shadow-2xl transition-shadow select-none"
      >
        {/* Capa de destello holográfico que sigue al cursor */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(230,180,70,0.3) 30%, transparent 70%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Encabezado con sello institucional */}
        <div className="flex items-start justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-sm">
              <MaterialIcon name="verified" className="text-[28px]" />
            </span>
            <div>
              <span className="text-label-caps uppercase tracking-widest text-emerald-300">
                Certificado Autenticado · SEMTA
              </span>
              <h3 className="font-headline-sm text-white">Credencial de Formación Rural</h3>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <span className="rounded-full bg-amber-400/20 px-3 py-1 text-label-xs font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/30">
              Oficial 2026
            </span>
          </div>
        </div>

        {/* Cuerpo de la credencial */}
        <div className="my-6 space-y-3">
          <div>
            <p className="text-label-xs uppercase tracking-wider text-white/70">
              Titular / Código Registrado
            </p>
            <p className="font-mono text-xl font-bold tracking-wider text-emerald-200">{titular}</p>
          </div>

          <div>
            <p className="text-label-xs uppercase tracking-wider text-white/70">
              Programa Acreditado
            </p>
            <p className="text-body-md font-medium text-white">{programa}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-body-sm text-white/80">
            <div>
              <span className="block text-label-xs uppercase tracking-wider text-white/60">
                Emisión
              </span>
              <span>{emitido}</span>
            </div>
            <div>
              <span className="block text-label-xs uppercase tracking-wider text-white/60">
                Carga Horaria
              </span>
              <span>{horas} Horas Certificadas</span>
            </div>
          </div>
        </div>

        {/* Pie con código QR y Hash seguro */}
        <div className="flex items-center justify-between border-t border-white/20 pt-4 text-white/80">
          <div className="flex items-center gap-2">
            <MaterialIcon name="qr_code_2" className="text-[28px] text-emerald-300" />
            <span className="font-mono text-label-sm tracking-wider">{codigo}</span>
          </div>
          <span className="text-label-xs text-white/60">Validez comunitaria garantizada</span>
        </div>
      </div>

      {/* Botón para descargar como imagen de alta calidad generada en Canvas */}
      <Button
        variant="primary"
        size="md"
        icono="download"
        onClick={handleDescargarCredencial}
        disabled={downloading}
      >
        {downloading ? "Generando credencial..." : "Descargar Credencial Oficial (HD PNG)"}
      </Button>
    </div>
  );
}
