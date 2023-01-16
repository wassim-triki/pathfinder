/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scale: 'scale .4s cubic-bezier(.39,.575,.565,1.000) both',
      },
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
