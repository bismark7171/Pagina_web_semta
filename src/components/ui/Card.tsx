import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  hoverable?: boolean;
}

export function Card({
  children,
  className,
  as: Component = "article",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest",
        hoverable &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-semta hover:border-primary/30",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
