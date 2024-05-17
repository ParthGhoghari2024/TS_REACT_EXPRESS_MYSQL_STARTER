import type { Config } from "tailwindcss";

export default {
  content: [
    "./*.{html,js}",
    "./**/*.{html,js,jsx}",
    "**/*.{html,js,jsx,ejs}",
    "./views/*.ejs",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
