"use client";

import React, { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className="fixed bottom-6 left-6 z-30 grid size-11 place-items-center rounded-full border border-outline-variant bg-surface/90 text-on-surface shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-on-primary focus-visible:ring-2 focus-visible:ring-primary"
    >
      <MaterialIcon name="arrow_upward" className="text-[20px]" />
    </button>
  );
}

export default BackToTop;
