"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "@/data/heroSlides";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

const DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, DURATION);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative min-h-[92vh] overflow-hidden bg-bosque"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.8, ease: "easeOut" }, scale: { duration: 6, ease: "linear" } }}
        >
          <Image
            src={slide.imagen}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bosque/90 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[92vh] flex-col justify-end">
        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop pb-14 pt-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-label-md font-semibold uppercase tracking-wider text-white backdrop-blur">
                <span className="size-2 rounded-full bg-primary-fixed" />
                {slide.chip}
              </span>

              <h1 className="mt-6 font-display-lg text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-[56px]">
                {slide.titulo}
              </h1>

              <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-white/85">
                {slide.descripcion}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {slide.botones.map((btn, i) => (
                  <Button
                    key={btn.text}
                    href={btn.path}
                    variant={i === 0 ? "solid" : "ghost"}
                    icono={btn.icono}
                    className={i === 0 ? "text-white shadow-lg" : "text-white hover:bg-white/10"}
                  >
                    {btn.text}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto w-full max-w-container-semta px-gutter-desktop pb-8">
          <div className="flex items-center justify-between gap-6">
            <div className="hidden h-1.5 max-w-xs flex-1 -translate-y-2 items-center gap-1 md:flex">
              {heroSlides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/30"
                >
                  {i === current && (
                    <motion.span
                      key={current + (paused ? "-paused" : "-run")}
                      className="absolute inset-0 origin-left rounded-full bg-primary-fixed"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? DURATION / 1000 : 0, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir al slide ${i + 1}`}
                    className={cn(
                      "size-2.5 rounded-full transition-all",
                      i === current ? "scale-125 bg-primary-fixed" : "bg-white/40 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
              <span className="ml-2 font-label-md text-white/70">
                {(current + 1).toString().padStart(2, "0")} — {heroSlides.length.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute bottom-24 right-8 z-10 hidden max-w-xs rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md lg:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-fixed text-bosque">
              <MaterialIcon name={slide.captionIcono} className="text-[22px]" />
            </span>
            <div>
              <p className="font-label-caps uppercase tracking-wider text-white/60">
                {slide.captionTitulo}
              </p>
              <p className="mt-1 text-body-md font-medium leading-snug">
                {slide.captionTexto}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}