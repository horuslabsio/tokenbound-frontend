import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: { max: "250px" },
      // => @media (max-width: 250px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
        "inter-variable": ["inter-variable", "sans-serif"],
        "instrument-serif": ["instrument-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-linear-primary":
          "linear-gradient(90deg, #EC796B 0%, #D672EF 100%)",
        "gradient-linear-dashed":
          "linear-gradient(90deg,transparent,transparent 50%,#fff 50%,#fff 100%),linear-gradient(90deg, #ec796b 0%, #d672ef 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FAFAFA",
        "gray-50": "#e5e5e54d",
        "gray-100": "#F8F8F8",
        "box-shadow": "#EC796B33",
        "primary-btn": "#0A0A0A",
        "foreground-primary": "#5a5a5a",
        "foreground-secondary": "#4b4b4b",
        "foreground-tertiary": "#8f8f8f",
      },
    },
    transform: {
      growth: "scale(1, 1)",
    },
  },
  plugins: [],
};
export default config;
