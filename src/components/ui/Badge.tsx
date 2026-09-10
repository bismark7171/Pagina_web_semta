import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function Badge({
  children,
  icono,
  className,
}: {
  children: React.ReactNode;
  icono?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-white/85 px-3 py-1.5 text-label-caps uppercase tracking-wider text-on-surface-variant backdrop-blur",
        className,
      )}
    >
      {icono && <MaterialIcon name={icono} className="text-[1.1em]" />}
      {children}
    </span>
  );
}