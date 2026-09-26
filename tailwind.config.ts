import type { Config } from "tailwindcss";

/**
 * Seth Organic Form Design System Tokens
 * Extracted from Google Stitch design specifications
 */
export default {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Seth Organic Botanical Greens
        primary: {
          50: "#f0f7f2",
          100: "#dbeef0",
          200: "#b7dec5",
          300: "#8ac9a3",
          400: "#52b788",
          500: "#2d6a4f",
          600: "#1b4332",
          700: "#143728",
          800: "#0f2b1f",
          900: "#081c14",
          950: "#040e0a",
          DEFAULT: "#1b4332",
          foreground: "#fbf9f5",
        },
        // Warm Natural Earth & Gold Accents
        accent: {
          50: "#fbf7f0",
          100: "#f5ecdb",
          200: "#edd9b8",
          300: "#e2c18e",
          400: "#d4a373",
          500: "#b38048",
          600: "#8c6239",
          DEFAULT: "#e8f3eb",
          foreground: "#1b4332",
        },
        // Warm Organic Backgrounds
        background: "#fbf9f5",
        foreground: "#1c2b1e",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1c2b1e",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1c2b1e",
        },
        secondary: {
          DEFAULT: "#ede7de",
          foreground: "#1b4332",
        },
        muted: {
          DEFAULT: "#f3efea",
          foreground: "#5c6b5e",
        },
        border: "#e3dcd2",
        input: "#e3dcd2",
        ring: "#2d6a4f",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
