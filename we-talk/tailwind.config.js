/* eslint-disable no-undef */
module.exports = {
  content: [
    './app/index.html',
    './app/templates/*.hbs',
    './app/components/*.{hbs,js}',
    './app/styles/*.css',
  ],
  theme: {
    extend: {
      borderColor: (theme) => ({
        DEFAULT: theme('colors.gray.300'),
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
