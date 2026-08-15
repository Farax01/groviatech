import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0d3b52", "navy-dark": "#081f2d", "navy-mid": "#0f2d3f",
        steel: "#4a7c8c", "steel-light": "#6a9aaa",
        "cyan-pop": "#06b6d4", "cyan-light": "#67e8f9",
        "off-white": "#f8f8f6", "warm-gray": "#e8e8e5",
        charcoal: "#1a1a1a", "mid-gray": "#666666", "light-gray": "#999999",
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: { "count-up": "countUp 2s ease-out forwards" },
      keyframes: { countUp: { from: { opacity: "0" }, to: { opacity: "1" } } },
    },
  },
  plugins: [],
};
export default config;
