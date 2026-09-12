import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: 'class' → activa el modo oscuro añadiendo clase 'dark' al <html>
  // No rompe nada existente — los colores actuales son el modo claro por defecto
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary-container)",
        "primary-fixed": "var(--primary-fixed)",
        "primary-fixed-dim": "var(--primary-fixed-dim)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        "on-primary-fixed-variant": "var(--on-primary-fixed-variant)",

        secondary: "var(--secondary)",
        "on-secondary": "var(--on-secondary)",
        "secondary-container": "var(--secondary-container)",
        "on-secondary-container": "var(--on-secondary-container)",
        "secondary-fixed": "var(--secondary-fixed)",
        "secondary-fixed-dim": "var(--secondary-fixed-dim)",
        "on-secondary-fixed": "var(--on-secondary-fixed)",
        "on-secondary-fixed-variant": "var(--on-secondary-fixed-variant)",

        tertiary: "var(--tertiary)",
        "on-tertiary": "var(--on-tertiary)",
        "tertiary-container": "var(--tertiary-container)",
        "on-tertiary-container": "var(--on-tertiary-container)",
        "tertiary-fixed": "var(--tertiary-fixed)",
        "tertiary-fixed-dim": "var(--tertiary-fixed-dim)",
        "on-tertiary-fixed": "var(--on-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--on-tertiary-fixed-variant)",

        error: "var(--error)",
        "on-error": "var(--on-error)",
        "error-container": "var(--error-container)",
        "on-error-container": "var(--on-error-container)",

        background: "var(--background)",
        "on-background": "var(--on-background)",
        surface: "var(--surface)",
        "on-surface": "var(--on-surface)",
        "surface-dim": "var(--surface-dim)",
        "surface-bright": "var(--surface-bright)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "on-surface-variant": "var(--on-surface-variant)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        "inverse-surface": "var(--inverse-surface)",
        "inverse-on-surface": "var(--inverse-on-surface)",
        "inverse-primary": "var(--inverse-primary)",

        bosque: "var(--bosque)",
        "verde-semta": "var(--verde-semta)",
      },
      fontFamily: {
        "display-lg": ['"Plus Jakarta Sans"', "sans-serif"],
        "headline-xl": ['"Plus Jakarta Sans"', "sans-serif"],
        "headline-lg": ['"Plus Jakarta Sans"', "sans-serif"],
        "headline-md": ['"Plus Jakarta Sans"', "sans-serif"],
        "headline-sm": ['"Plus Jakarta Sans"', "sans-serif"],
        "body-lg": ['"Inter"', "sans-serif"],
        "body-md": ['"Inter"', "sans-serif"],
        "body-sm": ['"Inter"', "sans-serif"],
        "label-lg": ['"Inter"', "sans-serif"],
        "label-md": ['"Inter"', "sans-serif"],
        "label-caps": ['"Inter"', "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.025em", fontWeight: "800" },
        ],
        "display-lg-mobile": [
          "34px",
          { lineHeight: "42px", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "headline-xl": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-xl-mobile": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        "headline-lg": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        "headline-md": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-sm": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", fontWeight: "600", letterSpacing: "0.01em" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "600", letterSpacing: "0.02em" }],
        "label-caps": ["11px", { lineHeight: "16px", fontWeight: "700", letterSpacing: "0.08em" }],
      },
      spacing: {
        "space-2xs": "0.25rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "space-2xl": "3rem",
        "space-3xl": "4rem",
        "space-4xl": "6rem",
        "gutter-desktop": "2rem",
        "gutter-mobile": "1rem",
      },
      maxWidth: {
        "container-semta": "1240px",
      },
      boxShadow: {
        "card-semta": "0 1px 2px rgba(25,28,25,0.06), 0 8px 24px rgba(25,28,25,0.08)",
        "soft-semta": "0 8px 30px rgba(44,62,46,0.10)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
