/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        1065: '1065px'
      },
      height: {
        2206: '2206px'
      },
      minHeight: {
        500: '500px'
      }
    }
  },
  plugins: []
}
