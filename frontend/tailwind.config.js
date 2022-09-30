/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx/,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E9C376",
        secondary: "#DFB8AC"
      },
    },
    fontFamily: {
      'display': ["Mirage"],
      'sans': ['"Nunito Sans"'],
      'handwriting': 'BrittanySignature',
      'serif': ['"Roboto Slab"'],
    }
  },
  plugins: [],
}
