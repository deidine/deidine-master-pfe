import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
        serif: ["var(--font-roboto)", "serif"],
        'serif-bold': ["var(--font-roboto-bold)", "serif"],
        'serif-light': ["var(--font-roboto-light)", "serif"],
        'serif-italic': ["var(--font-roboto-italic)", "serif"],
        'serif-bold-italic': ["var(--font-roboto-bold-italic)", "serif"],
        'serif-light-italic': ["var(--font-roboto-light-italic)", "serif"],
        'serif-italic-bold': ["var(--font-roboto-italic-bold)", "serif"],
      },
      colors: {
        primary: "#0070f3",
        secondary: "#ffcd00",
        danger: "#ff0000",
        success: "#00ff00",
        warning: "#ff00ff",
        info: "#00ffff",
        light: "#f0f0f0",
        dark: "#000000",
        mainColor: "#f0f0f0",
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
      
    },
  },
  plugins: [], 
};
export default config;
