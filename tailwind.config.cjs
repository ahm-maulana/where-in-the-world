/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito Sans', 'Sans-serif']
      },
      screens: {
        'sm': '376px',
      }
    },
  },
  plugins: [],
}
