/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#fde7e8",
        "primary-100": "#f9c0c3",
        "primary-200": "#f6979d",
        "primary-300": "#f06f77",
        "primary-400": "#ea474f",
        "primary-500": "#e50916",  // main
        "primary-600": "#b81d24",
        "primary-700": "#8a141a",
      },
    },
  },
  plugins: [require("daisyui")], // ✅ make sure installed
  daisyui: {
    themes: ["light", "dark", "synthwave"],
  },
};
