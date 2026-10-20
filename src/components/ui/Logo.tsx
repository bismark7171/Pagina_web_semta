import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "default";
  asLink?: boolean;
}

export function Logo({ className, variant = "default", asLink = true }: LogoProps) {
  const isLight = variant === "light";

  const content = (
    <div className="relative w-40 h-10 sm:w-44 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
      <Image
        src="/logos/semta_logo.png"
        alt="Logo SEMTA"
        fill
        sizes="(max-width: 768px) 150px, 176px"
        className={cn(
          "object-contain",
          isLight ? "brightness-0 invert" : "dark:brightness-0 dark:invert",
        )}
        priority={true}
      />
    </div>
  );

  if (!asLink) {
    return (
      <div
        className={cn("group inline-flex items-center outline-none", className)}
        aria-label="SEMTA - Inicio"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
        className,
      )}
      aria-label="SEMTA - Inicio"
    >
      {content}
    </Link>
  );
}

export default Logo;
