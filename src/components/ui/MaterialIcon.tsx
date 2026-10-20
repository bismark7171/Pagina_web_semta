import React from "react";
import { cn } from "@/lib/utils";

export interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

export function MaterialIcon({ name, className, ...props }: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined select-none inline-block align-middle leading-none",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
}

export default MaterialIcon;
