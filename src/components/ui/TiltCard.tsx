"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
  glow?: boolean;
}

/**
 * TiltCard: Componente Open Source 2026 de perspectiva 2.5D con física inercial
 * y destello reflectante que sigue la posición del puntero/touch.
 * No requiere Three.js ni WebGL, 100% CSS 3D transforms nativas.
 */
export function TiltCard({
  children,
  className,
  maxDeg = 4,
  glow = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;

      // Ángulo de inclinación
      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -maxDeg;
      const ry = ((x - rect.width / 2) / (rect.width / 2)) * maxDeg;

      setTilt({ rx, ry });
      setGlare({ x: px, y: py, active: true });
    },
    [maxDeg],
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={cn("relative overflow-hidden transition-all duration-300", className)}
      {...props}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            opacity: glare.active ? 1 : 0,
          }}
        />
      )}
      {children}
    </div>
  );
}
