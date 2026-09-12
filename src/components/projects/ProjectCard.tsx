"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { proyectoEstados } from "@/data/projects";
import type { IProject } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FALLBACK_IMAGE } from "@/lib/images";

// ─── Hook: tilt 3D suave siguiendo el mouse ───────────────────────────────────

function useTilt(maxDeg = 3) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring suaviza el movimiento — sin spring queda muy brusco
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxDeg, -maxDeg]), {
    stiffness: 280,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]), {
    stiffness: 280,
    damping: 30,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      // Valor normalizado [-0.5, 0.5]
      rawX.set((e.clientX - left - width / 2) / width);
      rawY.set((e.clientY - top - height / 2) / height);
    },
    [rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: IProject;
  onOpen: () => void;
}) {
  const estado = proyectoEstados[project.estado];
  const [imagen, setImagen] = useState(project.imagen);
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(2.5);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      // Elevación al hover — igual que antes pero ahora con spring
      whileHover={{ translateY: -4 }}
      transition={{ duration: 0.25 }}
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-card-semta transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(13,99,27,0.18)]">
        {/* Imagen */}
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-container-high">
          <Image
            src={imagen}
            alt={project.alt}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImagen(FALLBACK_IMAGE)}
          />
          {/* Badge estado */}
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label-md font-semibold"
            style={{ backgroundColor: estado.tint, color: estado.color }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: estado.color }} />
            {project.estado}
          </span>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-label-caps uppercase tracking-wider text-on-surface-variant">
            {project.municipio} · {project.gestion}
          </p>
          <h3 className="mt-2 font-headline-md leading-snug text-on-surface">{project.titulo}</h3>
          <p className="mt-2 line-clamp-2 text-body-sm leading-relaxed text-on-surface-variant">
            {project.descripcion}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-1.5 text-label-md font-semibold text-on-surface-variant">
              <MaterialIcon name="group" className="text-[1.1em] text-primary" />
              {project.beneficiarios}
            </div>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
            >
              {project.boton}
              <MaterialIcon name="arrow_forward" className="text-[1em]" />
            </button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
