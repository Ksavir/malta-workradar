import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        moss: "#285340",
        harbour: "#0f766e",
        cream: "#f7f3ea",
        paper: "#fffdf7",
        line: "#e7decc",
        coral: "#d86148"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 33, 27, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
