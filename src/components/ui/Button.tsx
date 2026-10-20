import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "./MaterialIcon";

export type ButtonVariant = "primary" | "secondary" | "solid" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icono?: string;
  iconRight?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-sm",
  solid: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
  outline: "border border-outline bg-transparent text-on-surface hover:bg-surface-container",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-label-sm gap-1.5 rounded-full",
  md: "px-5 py-2.5 text-label-md gap-2 rounded-full",
  lg: "px-7 py-3 text-label-lg gap-2.5 rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  icono,
  iconRight,
  children,
  className,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant] ?? variantStyles.primary,
    sizeStyles[size] ?? sizeStyles.md,
    className,
  );

  const content = (
    <>
      {icono && <MaterialIcon name={icono} className="text-[1.15em] shrink-0" />}
      {children}
      {iconRight && <MaterialIcon name={iconRight} className="text-[1.15em] shrink-0" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );
}

export default Button;
