/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#13111C',
        },
        light: {
          100: '#33323E',
          50: '#211F2D',
        },
        accent: {
          100: '#853bce',
          50: '#9853db',
        },
      },
      fontFamily: {
        inter: ['Inter'],
      },
    },
  },
  plugins: [],
};
