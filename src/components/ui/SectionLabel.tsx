import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function SectionLabel({
  icono,
  children,
  className,
}: {
  icono?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary-container/10 px-4 py-1.5 text-label-caps uppercase tracking-[0.14em] text-primary",
        className,
      )}
    >
      {icono && <MaterialIcon name={icono} className="text-[1.2em]" />}
      {children}
    </span>
  );
}