/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'unad-primary': '#003366',
        'unad-secondary': '#FFD700',
        'unad-accent': '#F58220',
        'unad-light-gray': '#F0F4F8',
        'unad-dark-gray': '#333333',
      },
    },
  },
  plugins: [],
}
