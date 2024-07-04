/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        hover_primary: "var(--color-hover-primary)",
        secondary: "var(--color-secondary)",
        buttons: "var(--color-buttons)",
        typography: "var(--color-typography)",
      },
      backgroundColor:{
        buttons: "var(--color-buttons)",
      }
    },
    
  },
  plugins: [require("@tailwindcss/forms")],
};
