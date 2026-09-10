import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const materialIconName = (name: string) => name.replace(/[^a-z0-9_]/gi, "");