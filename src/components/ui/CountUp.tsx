"use client";

import { useEffect, useState, useRef } from "react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

export interface CountUpProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1.6, className = "" }: CountUpProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "50px" },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
        observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, []);

  const displayValue = useCountAnimation(value, {
    duration,
    enabled: isVisible,
  });

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}

export default CountUp;
