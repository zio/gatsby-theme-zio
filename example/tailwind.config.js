
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./node_modules/@atooni/gatsby-theme-ziodoc/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: { 
        primary: colors.stone,
        secondary: colors.red
      }
    }
  },
  plugins: [],
}
