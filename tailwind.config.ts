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
        title: ["var(--font-roboto)", "serif"], 
      },
      colors: {
    
        title:  "#0070f3",
        mainColor: "#E8E8E8",
        mainTextColor: "#E8E8E8",
        
      },
      keyframes: {
        'slide-background-x': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'slide-background-x': 'slide-background-x 1.5s linear infinite',
       'spin-slow': 'spin 3s linear infinite',},
      
      
    },
  },
  plugins: [], 
};
export default config;
