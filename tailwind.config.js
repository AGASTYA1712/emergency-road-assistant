/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        targo: {
          black: '#000000',
          red: '#EE3F2C',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
      }
    },
  },
  plugins: [],
}
