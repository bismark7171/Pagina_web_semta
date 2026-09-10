import Link from "next/link";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "solid";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-container",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-container",
  ghost: "text-primary hover:bg-primary/10",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary",
  solid: "bg-primary text-white",
};

const baseCls =
  "group inline-flex items-center justify-center gap-2 rounded-full text-label-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  lg: "px-8 py-4",
  md: "px-6 py-3",
  sm: "px-4 py-2",
};

export type ButtonSize = "lg" | "md" | "sm";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icono?: string;
  iconRight?: string;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ActionButtonProps extends ButtonBaseProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button(props: LinkButtonProps): React.ReactElement;
export function Button(props: ActionButtonProps): React.ReactElement;
export function Button({
  variant = "primary",
  size = "md",
  icono,
  iconRight,
  className,
  children,
  ...rest
}: LinkButtonProps | ActionButtonProps) {
  const cls = cn(baseCls, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, target, rel } = rest as LinkButtonProps;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={cls}
      >
        {icono && <MaterialIcon name={icono} className="text-[1.1em]" />}
        <span>{children}</span>
        {iconRight && (
          <MaterialIcon
            name={iconRight}
            className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = rest as ActionButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {icono && <MaterialIcon name={icono} className="text-[1.1em]" />}
      <span>{children}</span>
      {iconRight && (
        <MaterialIcon
          name={iconRight}
          className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}