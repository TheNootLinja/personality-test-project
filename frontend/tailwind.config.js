/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx/,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page-background-mobile': "url('/img/bg.jpg')",
        'checkbox-checked': "url('/img/checkbox--checked.svg')",
        'checkbox-unchecked': "url('/img/checkbox--unchecked.svg')",
      },
      borderWidth: {
        '1': '1px'
      },
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
