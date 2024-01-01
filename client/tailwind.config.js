/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#03032E',
      secondary: '#06063C',
      blue: '#3333BD',
      black: '#111111',
      gray: '#363636',
      'gray-light': '#888888',
      light: '#E7E7E7',
      white: '#FBFBFB',
      red: '#FF4444',
      'red-light': '#FF444455',
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
