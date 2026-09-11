"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Volver arriba"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-50 grid size-12 place-items-center rounded-full bg-secondary text-on-secondary shadow-card-semta transition-colors hover:bg-secondary-container"
        >
          <MaterialIcon name="arrow_upward" className="text-[22px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
