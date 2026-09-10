import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="SEMTA · Inicio"
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-primary text-on-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
          aria-hidden="true"
        >
          <path d="M12 22V8" />
          <path d="M12 8C12 4 9 2 4 2c0 6 3 9 8 9" />
          <path d="M12 5c4 0 7 2 7 6-4 0-7-2-7-6" />
        </svg>
      </span>
      <span
        className={cn(
          "font-headline-md text-xl font-extrabold tracking-tight",
          dark ? "text-white" : "text-bosque",
        )}
      >
        SEMTA
      </span>
    </Link>
  );
}