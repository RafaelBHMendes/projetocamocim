import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#2196F3',
        secondary: '#F0F0F0',
        accent: '#BDBDBD',
        danger: '#f87171',
        success: '#34d399',
        warning: '#fbbf24',

        bluebanner: "#0B61A4",
        bluemenu: "#033E6B",
        
      },
    },
  },
  plugins: [],
};
export default config;
