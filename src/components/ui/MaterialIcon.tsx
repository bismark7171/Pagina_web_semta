import { cn } from "@/lib/utils";

export function MaterialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "material-symbols-outlined select-none text-[24px] leading-none",
        className,
      )}
    >
      {name}
    </span>
  );
}