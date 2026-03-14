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
        cream:   { DEFAULT: "#faf8f4", 2: "#f3efe7", 3: "#e9e3d9" },
        forest:  { DEFAULT: "#1b3d2f", 2: "#254d3c", 3: "#346b52" },
        gold:    { DEFAULT: "#c49a4a", 2: "#ddb96a", 3: "#f2d898" },
        ink:     { DEFAULT: "#162119", 2: "#3d5c4a", 3: "#7a9e8a" },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans:  ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sh:  "0 4px 24px rgba(27,61,47,.10)",
        shm: "0 12px 48px rgba(27,61,47,.14)",
        shl: "0 28px 80px rgba(27,61,47,.18)",
      },
    },
  },
  plugins: [],
};
export default config;
