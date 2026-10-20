import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: React.ReactNode;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-outline-variant bg-surface-container-lowest transition-all duration-300",
        hoverable && "hover:-translate-y-1 hover:shadow-card-semta",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
