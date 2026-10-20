"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface UseCountAnimationOptions {
  /**
   * Duración de la animación en milisegundos (o segundos si es menor a 20).
   * Por defecto: 1500ms
   */
  duration?: number;
  /**
   * Valor inicial de la animación. Por defecto: 0
   */
  start?: number;
  /**
   * Cantidad de decimales a mostrar. Por defecto se infiere del número objetivo.
   */
  decimals?: number;
  /**
   * Función de easing (suavizado). Por defecto cubic ease-out.
   */
  easing?: (t: number) => number;
  /**
   * Si es true, formatea números grandes con separadores de miles (ej. 1.000).
   */
  format?: boolean;
  /**
   * Si está habilitado para iniciar la animación (por defecto: true).
   * Permite iniciar la animación inmediatamente en el montaje o diferirla (ej. IntersectionObserver).
   */
  enabled?: boolean;
}

const defaultEaseOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Custom hook que anima un contador numérico desde un valor inicial hasta un valor objetivo
 * durante el montaje utilizando requestAnimationFrame para una animación fluida a 60/120fps.
 *
 * Soporta números directos o strings con prefijo/sufijo (ej: "40+", "100%", "$1,500").
 */
export function useCountAnimation(
  targetValue: number,
  options?: number | UseCountAnimationOptions,
): number;
export function useCountAnimation(
  targetValue: string,
  options?: number | UseCountAnimationOptions,
): string;
export function useCountAnimation(
  targetValue: number | string,
  options?: number | UseCountAnimationOptions,
): number | string;
export function useCountAnimation(
  targetValue: number | string,
  optionsOrDuration: number | UseCountAnimationOptions = {},
): number | string {
  const options: UseCountAnimationOptions =
    typeof optionsOrDuration === "number" ? { duration: optionsOrDuration } : optionsOrDuration;

  const rawDuration = options.duration ?? 1500;
  // Si la duración es menor a 20, se interpreta como segundos (ej. 1.5 -> 1500)
  const durationMs = rawDuration < 20 ? rawDuration * 1000 : rawDuration;
  const startVal = options.start ?? 0;
  const easing = options.easing ?? defaultEaseOut;
  const formatThousands = options.format ?? true;
  const enabled = options.enabled ?? true;

  const isNumericInput = typeof targetValue === "number";

  // Parsear valor objetivo, prefijo y sufijo si es string
  const parsedTarget = useRef<{
    prefix: string;
    num: number;
    suffix: string;
    decimals: number;
    isValid: boolean;
  }>({ prefix: "", num: 0, suffix: "", decimals: 0, isValid: false });

  if (isNumericInput) {
    const decimals =
      options.decimals ??
      (targetValue % 1 !== 0 ? (targetValue.toString().split(".")[1]?.length ?? 0) : 0);
    parsedTarget.current = {
      prefix: "",
      num: targetValue,
      suffix: "",
      decimals,
      isValid: !isNaN(targetValue),
    };
  } else {
    const rawStr = String(targetValue).trim();
    // Expresión regular para separar prefijo (opcional), número (con comas/puntos) y sufijo (opcional)
    const match = rawStr.match(/^([^\d.-]*)([-+]?[0-9.,]+)(.*)$/);

    if (match) {
      const prefix = match[1] || "";
      const numPart = match[2];
      const suffix = match[3] || "";

      // Limpiar puntos de miles y estandarizar comas a puntos decimales
      let normalized = numPart;
      if (normalized.includes(",") && normalized.includes(".")) {
        // Ej: 1,500.50 o 1.500,50
        if (normalized.indexOf(",") < normalized.indexOf(".")) {
          normalized = normalized.replace(/,/g, "");
        } else {
          normalized = normalized.replace(/\./g, "").replace(",", ".");
        }
      } else if (normalized.includes(",")) {
        // Podría ser decimal (ej. 3,5) o miles (ej. 1,000)
        const parts = normalized.split(",");
        if (parts[1] && parts[1].length === 3 && parts[0].length <= 3) {
          normalized = normalized.replace(/,/g, "");
        } else {
          normalized = normalized.replace(",", ".");
        }
      }

      const parsedNum = parseFloat(normalized);
      const inferredDecimals =
        options.decimals ??
        (normalized.includes(".") ? (normalized.split(".")[1]?.length ?? 0) : 0);

      parsedTarget.current = {
        prefix,
        num: isNaN(parsedNum) ? 0 : parsedNum,
        suffix,
        decimals: inferredDecimals,
        isValid: !isNaN(parsedNum),
      };
    } else {
      parsedTarget.current = {
        prefix: "",
        num: 0,
        suffix: rawStr,
        decimals: 0,
        isValid: false,
      };
    }
  }

  // Helper de formateo
  const formatNumber = useCallback(
    (val: number, decimals: number): string => {
      const fixed = val.toFixed(decimals);
      if (!formatThousands) return fixed;

      const [intPart, decPart] = fixed.split(".");
      const formattedInt = parseInt(intPart, 10).toLocaleString("es-BO");
      return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
    },
    [formatThousands],
  );

  // Estado inicial
  const [currentValue, setCurrentValue] = useState<number | string>(() => {
    if (!parsedTarget.current.isValid) {
      return targetValue;
    }
    if (isNumericInput) {
      return startVal;
    }
    const initialFormatted = formatNumber(startVal, parsedTarget.current.decimals);
    return `${parsedTarget.current.prefix}${initialFormatted}${parsedTarget.current.suffix}`;
  });

  useEffect(() => {
    if (!parsedTarget.current.isValid) {
      setCurrentValue(targetValue);
      return;
    }

    if (!enabled) {
      return;
    }

    const { prefix, num: targetNum, suffix, decimals } = parsedTarget.current;
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = durationMs > 0 ? Math.min(elapsed / durationMs, 1) : 1;
      const easedProgress = easing(progress);

      const currentNum = startVal + (targetNum - startVal) * easedProgress;

      if (isNumericInput) {
        if (decimals > 0) {
          const factor = Math.pow(10, decimals);
          setCurrentValue(Math.round(currentNum * factor) / factor);
        } else {
          setCurrentValue(Math.round(currentNum));
        }
      } else {
        const formatted = formatNumber(currentNum, decimals);
        setCurrentValue(`${prefix}${formatted}${suffix}`);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Asegurar que el último fotograma muestre exactamente el valor final
        if (isNumericInput) {
          setCurrentValue(targetNum);
        } else {
          setCurrentValue(targetValue);
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, durationMs, startVal, isNumericInput, formatNumber, easing, enabled]);

  return currentValue;
}

export default useCountAnimation;
