/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({addUtilities}){
      const newUtilities={
        '.no-scrollbar::-webkit-scrollbar':{
          'display':'none',
        },
        '.no-scrollbar':{
          '-ms-overflow-style':'none',
          'scrollbar-width':'none',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}