/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        af273e: "#AF273E",
        save: "#018292",
      },
    },
    fontFamily: { sans: ["Poppins", "sans-serif"] },
  },
  plugins: [],
};
