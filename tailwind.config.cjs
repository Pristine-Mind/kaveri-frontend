module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato',],      },
        keyframes: {
          dropdown: {
            '0%': { opacity: '0', transform: 'scale(95%)' },
            '100%': { opacity: '1', transform: 'scale(100%)' },
          },
        },
        animation: {
          dropdown: 'dropdown 200ms ease-out forwards',
        },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),],
};
