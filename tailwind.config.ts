import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        card: "#141414",
        border: "#232323",
        lime: "#C6F135",
        steel: "#8A8F87",
      },
      fontFamily: {
        display: ["var(--font-shoulders)", "sans-serif"],
        stencil: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-plex)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "chrome-sheen":
          "linear-gradient(115deg, #050505 0%, #1c1c1c 18%, #3a3a3a 30%, #cfd4c8 38%, #6b6f66 46%, #141414 58%, #2a2a2a 70%, #C6F135 82%, #141414 92%, #050505 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
