/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        periwinkle: '#c6d8ffff',
        ruddyBlue: ' #71a9f7ff',
        ultraViolet: '#6b5ca5ff',
        byzantium: '#72195aff',
      },
    },
  },
  plugins: [],
};
