import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Sanea un nombre de icono para uso seguro como ligadura de Material Symbols:
 * conserva solo letras ASCII, dígitos y guion bajo.
 */
export function materialIconName(raw: string): string {
  return raw.replace(/[^a-z0-9_]/gi, "");
}
