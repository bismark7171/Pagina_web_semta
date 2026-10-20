import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "surface";
  children: React.ReactNode;
}

export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary-container/20 text-secondary",
    outline: "border border-outline-variant text-on-surface-variant",
    surface: "bg-surface-container text-on-surface-variant",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-caps uppercase tracking-wider font-semibold",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
