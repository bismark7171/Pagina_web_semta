import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

function withOpacity(varName: string) {
  return ({ opacityValue }: { opacityValue?: string | number }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${varName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${varName})`;
  };
}

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "container-semta": "1280px",
      },
      padding: {
        "gutter-desktop": "2rem",
        "gutter-mobile": "1rem",
      },
      colors: {
        primary: {
          DEFAULT: withOpacity("--primary") as unknown as string,
          container: withOpacity("--primary-container") as unknown as string,
          fixed: withOpacity("--primary-fixed") as unknown as string,
          "fixed-dim": withOpacity("--primary-fixed-dim") as unknown as string,
        },
        "on-primary": {
          DEFAULT: withOpacity("--on-primary") as unknown as string,
          container: withOpacity("--on-primary-container") as unknown as string,
          fixed: withOpacity("--on-primary-fixed") as unknown as string,
          "fixed-variant": withOpacity("--on-primary-fixed-variant") as unknown as string,
        },
        secondary: {
          DEFAULT: withOpacity("--secondary") as unknown as string,
          container: withOpacity("--secondary-container") as unknown as string,
          fixed: withOpacity("--secondary-fixed") as unknown as string,
          "fixed-dim": withOpacity("--secondary-fixed-dim") as unknown as string,
        },
        "on-secondary": {
          DEFAULT: withOpacity("--on-secondary") as unknown as string,
          container: withOpacity("--on-secondary-container") as unknown as string,
          fixed: withOpacity("--on-secondary-fixed") as unknown as string,
          "fixed-variant": withOpacity("--on-secondary-fixed-variant") as unknown as string,
        },
        tertiary: {
          DEFAULT: withOpacity("--tertiary") as unknown as string,
          container: withOpacity("--tertiary-container") as unknown as string,
          fixed: withOpacity("--tertiary-fixed") as unknown as string,
          "fixed-dim": withOpacity("--tertiary-fixed-dim") as unknown as string,
        },
        "on-tertiary": {
          DEFAULT: withOpacity("--on-tertiary") as unknown as string,
          container: withOpacity("--on-tertiary-container") as unknown as string,
          fixed: withOpacity("--on-tertiary-fixed") as unknown as string,
          "fixed-variant": withOpacity("--on-tertiary-fixed-variant") as unknown as string,
        },
        error: {
          DEFAULT: withOpacity("--error") as unknown as string,
          container: withOpacity("--error-container") as unknown as string,
        },
        "on-error": {
          DEFAULT: withOpacity("--on-error") as unknown as string,
          container: withOpacity("--on-error-container") as unknown as string,
        },
        background: withOpacity("--background") as unknown as string,
        "on-background": withOpacity("--on-background") as unknown as string,
        surface: {
          DEFAULT: withOpacity("--surface") as unknown as string,
          dim: withOpacity("--surface-dim") as unknown as string,
          bright: withOpacity("--surface-bright") as unknown as string,
          container: {
            lowest: withOpacity("--surface-container-lowest") as unknown as string,
            low: withOpacity("--surface-container-low") as unknown as string,
            DEFAULT: withOpacity("--surface-container") as unknown as string,
            high: withOpacity("--surface-container-high") as unknown as string,
            highest: withOpacity("--surface-container-highest") as unknown as string,
          },
        },
        "surface-dim": withOpacity("--surface-dim") as unknown as string,
        "surface-bright": withOpacity("--surface-bright") as unknown as string,
        "surface-container": withOpacity("--surface-container") as unknown as string,
        "surface-container-lowest": withOpacity("--surface-container-lowest") as unknown as string,
        "surface-container-low": withOpacity("--surface-container-low") as unknown as string,
        "surface-container-high": withOpacity("--surface-container-high") as unknown as string,
        "surface-container-highest": withOpacity("--surface-container-highest") as unknown as string,
        "on-surface": {
          DEFAULT: withOpacity("--on-surface") as unknown as string,
          variant: withOpacity("--on-surface-variant") as unknown as string,
        },
        "on-surface-variant": withOpacity("--on-surface-variant") as unknown as string,
        outline: {
          DEFAULT: withOpacity("--outline") as unknown as string,
          variant: withOpacity("--outline-variant") as unknown as string,
        },
        "outline-variant": withOpacity("--outline-variant") as unknown as string,
        "inverse-surface": withOpacity("--inverse-surface") as unknown as string,
        "inverse-on-surface": withOpacity("--inverse-on-surface") as unknown as string,
        "inverse-primary": withOpacity("--inverse-primary") as unknown as string,
        bosque: withOpacity("--bosque") as unknown as string,
        "verde-semta": withOpacity("--verde-semta") as unknown as string,
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        display: ["var(--font-display)", '"Plus Jakarta Sans"', "sans-serif"],
        headline: ["var(--font-display)", '"Plus Jakarta Sans"', "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-xl": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-lg": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["1.35rem", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-sm": ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
        "headline-xs": ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body-xs": ["0.75rem", { lineHeight: "1.4" }],
        "label-lg": ["0.9375rem", { lineHeight: "1.25", fontWeight: "600" }],
        "label-md": ["0.875rem", { lineHeight: "1.25", fontWeight: "500" }],
        "label-sm": ["0.8125rem", { lineHeight: "1.2", fontWeight: "500" }],
        "label-xs": ["0.6875rem", { lineHeight: "1.15", fontWeight: "600" }],
        "label-caps": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "700" }],
      },
      boxShadow: {
        "card-semta": "0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".font-display-lg": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "3.5rem",
          lineHeight: "1.05",
          letterSpacing: "-0.02em",
          fontWeight: "800",
        },
        ".font-display-md": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "2.75rem",
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
        ".font-display-sm": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "2.25rem",
          lineHeight: "1.15",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
        ".font-headline-xl": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "2.25rem",
          lineHeight: "1.15",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
        ".font-headline-lg": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "1.75rem",
          lineHeight: "1.2",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
        ".font-headline-md": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "1.35rem",
          lineHeight: "1.3",
          fontWeight: "600",
        },
        ".font-headline-sm": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "1.125rem",
          lineHeight: "1.35",
          fontWeight: "600",
        },
        ".font-headline-xs": {
          fontFamily: 'var(--font-display), "Plus Jakarta Sans", sans-serif',
          fontSize: "1rem",
          lineHeight: "1.4",
          fontWeight: "600",
        },
      });
    }),
  ],
};
export default config;
