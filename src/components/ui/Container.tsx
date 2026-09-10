import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container-semta px-gutter-desktop",
        className,
      )}
    >
      {children}
    </div>
  );
}