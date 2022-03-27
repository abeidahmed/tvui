/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/index.html',
    './app/templates/**/*.hbs',
    './app/components/**/*.{hbs,js}',
    './app/styles/**/*.css',
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: colors.gray[300],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
      },
      colors: {
        subtle: colors.gray[600],
        muted: colors.gray[700],
        default: colors.gray[900],
        accent: colors.blue[700],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
