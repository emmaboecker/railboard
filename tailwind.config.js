/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "325px",
      },
    },
    fontFamily: {
      sans: ["Ubuntu", "Roboto", "Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
    },
  },
  plugins: [],
};
