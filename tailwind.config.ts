import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kashmir: {
          green:   "#2D6A4F",
          teal:    "#40916C",
          light:   "#74C69D",
          sky:     "#74C0FC",
          snow:    "#F8F9FA",
          saffron: "#E76F00",
          gold:    "#F4A261",
          dark:    "#1B2B34",
          muted:   "#52796F",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body:    ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(27,43,52,0.7))",
      },
      animation: {
        "fade-in":    "fadeIn 0.6s ease-in-out",
        "slide-up":   "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;