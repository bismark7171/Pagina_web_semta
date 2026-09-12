"use client";

/**
 * ThemeToggle.tsx
 * Botón que alterna entre modo claro y oscuro.
 * Muestra sol ☀️ o luna 🌙 según el tema activo.
 */

import { useTheme } from "./ThemeProvider";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function ThemeToggle({ className }: Props) {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "grid size-9 place-items-center rounded-full transition-all duration-200",
        "text-on-surface/70 hover:bg-primary/10 hover:text-primary",
        "dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white",
        className,
      )}
    >
      <MaterialIcon
        name={isDark ? "light_mode" : "dark_mode"}
        className="text-[20px] transition-transform duration-300"
      />
    </button>
  );
}
