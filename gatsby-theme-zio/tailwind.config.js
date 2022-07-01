const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
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
