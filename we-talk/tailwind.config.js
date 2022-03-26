/* eslint-disable no-undef */
module.exports = {
  content: [
    './app/templates/*.{hbs}',
    './app/components/*.{hbs, js}',
    './app/styles/*.{css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
