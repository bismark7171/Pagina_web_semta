"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function parseNumber(v: string): { prefix: string; num: number; suffix: string } {
  const m = v.match(/^([^0-9]*)([0-9.,]+)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: v };
  return {
    prefix: m[1],
    num: parseFloat(m[2].replace(/\./g, "").replace(",", ".")),
    suffix: m[3],
  };
}

export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const { prefix, num, suffix } = parseNumber(value);
    if (!num) return;

    const controls = animate(0, num, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        const hasDecimals = value.includes(",");
        const formatted = hasDecimals
          ? latest.toFixed(1).replace(".", ",")
          : Math.round(latest).toLocaleString("es-BO");
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}
