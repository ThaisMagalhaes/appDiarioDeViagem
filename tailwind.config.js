/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: { colors: { verde: '#3BBB30', roxo: '#1967FB', roxoP: '#6448B7' } },
  },
  plugins: [],
};
