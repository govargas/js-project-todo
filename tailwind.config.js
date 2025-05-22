/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'neue-kabel': ['neue-kabel', 'sans-serif'],
      },
    },
  },
  plugins: [],
}