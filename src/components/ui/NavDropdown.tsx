"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";

export interface NavDropdownItem {
  label: string;
  href: string;
  desc?: string;
  icono?: string;
}

export interface NavDropdownProps {
  label: string;
  href?: string;
  items: NavDropdownItem[];
  className?: string;
}

export function NavDropdown({ label, href, items, className }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative inline-block text-left", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {href ? (
        <Link
          href={href}
          onClick={() => setOpen(false)}
          className="inline-flex items-center gap-1 py-2 text-label-md font-semibold text-on-surface hover:text-primary transition-colors"
        >
          <span>{label}</span>
          <MaterialIcon
            name="keyboard_arrow_down"
            className={cn("text-[18px] transition-transform duration-200", open && "rotate-180")}
          />
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 py-2 text-label-md font-semibold text-on-surface hover:text-primary transition-colors"
          aria-expanded={open}
        >
          <span>{label}</span>
          <MaterialIcon
            name="keyboard_arrow_down"
            className={cn("text-[18px] transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      )}

      {open && (
        <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-2xl border border-outline-variant bg-surface-container-lowest p-2 shadow-xl z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-container"
            >
              {item.icono && (
                <MaterialIcon
                  name={item.icono}
                  className="text-[20px] text-primary shrink-0 mt-0.5"
                />
              )}
              <div>
                <p className="text-label-md font-semibold text-on-surface">{item.label}</p>
                {item.desc && (
                  <p className="text-body-sm text-on-surface-variant line-clamp-1">{item.desc}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavDropdown;
