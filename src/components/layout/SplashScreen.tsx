"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState<string>("Iniciando plataforma...");

  // Generate deterministic random positions and properties for the leaves
  const leaves = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const left = 5 + ((i * 8 + (i % 3) * 3) % 90);
      const size = 16 + ((i * 7) % 24);
      const duration = 4 + ((i * 3) % 4);
      const delay = (i * 1.5) % 3;
      const type = i % 2 === 0 ? "eco" : "energy_savings_leaf";
      return { id: i, left, size, duration, delay, type };
    });
  }, []);

  // Animación del número de porcentaje de 0% a 100% en 2.8 segundos
  const animatedPercent = useCountAnimation(100, {
    duration: 2.8,
    format: false,
  });

  useEffect(() => {
    // Fases de estado del mensaje
    const t1 = setTimeout(() => {
      setStage("Cargando proyectos e indicadores...");
    }, 1000);

    const t2 = setTimeout(() => {
      setStage("Bienvenido a SEMTA");
    }, 2200);

    // Iniciar desvanecimiento de salida suave
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Desmontar completamente del DOM
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  const currentPercent = typeof animatedPercent === "number" ? animatedPercent : 100;

  return (
    <div
      id="semta-splash-screen"
      role="status"
      aria-label="Cargando SEMTA"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-container-lowest text-on-surface transition-all duration-600 ease-in-out overflow-hidden ${
        isExiting
          ? "pointer-events-none opacity-0 scale-105"
          : "pointer-events-auto opacity-100 scale-100"
      }`}
    >
      {/* Fondo de hojas cayendo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {leaves.map((leaf) => (
          <MaterialIcon
            key={leaf.id}
            name={leaf.type}
            className="absolute -top-10 text-primary/30 animate-float-leaf"
            style={{
              left: `${leaf.left}%`,
              fontSize: `${leaf.size}px`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-7 px-6 text-center">
        {/* Glow sutil en verde institucional */}
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/15 blur-3xl" />

        {/* Logo SEMTA con soporte modo oscuro */}
        <div className="relative h-20 w-64 sm:h-24 sm:w-80 transition-all duration-700 ease-out">
          <Image
            src="/logos/semta_logo.png"
            alt="SEMTA - Servicios Múltiples de Tecnologías Apropiadas"
            fill
            sizes="(max-width: 640px) 256px, 320px"
            priority
            className="object-contain drop-shadow-sm dark:brightness-0 dark:invert dark:opacity-95"
          />
        </div>

        {/* Lema institucional */}
        <div className="space-y-1.5 max-w-sm">
          <p className="font-display text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
            Tecnologías Apropiadas · 40+ Años
          </p>
          <p className="text-body-sm text-on-surface-variant font-medium">
            Soberanía alimentaria y resiliencia en el territorio boliviano
          </p>
        </div>

        {/* Contenedor de progreso y porcentaje animado */}
        <div className="mt-2 flex w-56 flex-col items-center gap-2.5">
          {/* Barra de progreso fluida */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-outline-variant/40 shadow-inner">
            <div
              className="h-full rounded-full bg-primary transition-all duration-200 ease-out shadow-sm"
              style={{ width: `${currentPercent}%` }}
            />
          </div>

          {/* Porcentaje y estado dinámico */}
          <div className="flex w-full items-center justify-between text-[11px] font-medium text-on-surface-variant">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
              {stage}
            </span>
            <span className="font-mono font-bold text-primary tabular-nums">{currentPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
