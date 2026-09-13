import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label="SEMTA · Inicio"
    >
      <Image
        src="/logos/semta_logo.png"
        alt="SEMTA"
        width={2067}
        height={603}
        priority
        className={cn(
          "h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]",
          dark ? "brightness-0 invert" : "",
        )}
      />
      <span className="sr-only">SEMTA</span>
    </Link>
  );
}
