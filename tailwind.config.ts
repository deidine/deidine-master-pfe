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
        
      title: ["Rubik", "sans-serif"],
      text: ["DM Sans", " sans-serif"],
      },
      colors: {
    
        mainColor: "#F5F5F5",
        mainTextColor: "#E8E8E8",
        title:  "#6564FE", 
        secondaryColor: "#EEEDFF", 
        buttonColor: "#6564FE",
        hoverButtonColor: "#7574FF",
      },
      keyframes: {
        'slide-background-x': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        spinAndScale: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      animation: {

        spinAndScale: 'spinAndScale 1s ease-in-out',
        'slide-background-x': 'slide-background-x 1.5s linear infinite',
       'spin-slow': 'spin 3s linear infinite',},
      
      
    },
  },
  plugins: [], 
};
export default config;
