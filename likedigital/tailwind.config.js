/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#39C088",
        sky: "#84CAEE",
        question: "#FFF8CD",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
