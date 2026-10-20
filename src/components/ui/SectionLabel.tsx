import React from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "./MaterialIcon";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  icono?: string;
  children: React.ReactNode;
}

export function SectionLabel({ icono, children, className, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-label-caps uppercase tracking-wider font-semibold text-primary",
        className,
      )}
      {...props}
    >
      {icono && <MaterialIcon name={icono} className="text-[18px]" />}
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;
