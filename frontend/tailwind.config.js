/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        accentLightShade: '#48d6d2',
        accentDarkShade: '#26a6a2',
        secondaryLightShade: '#2a6fdb',
        secondaryDarkShade: '#122c91',
      },
      boxShadow: {
        custom: '0 0 0 5px rgb(42,111,219,0.3)',
      },
    },
  },
  plugins: [],
};
