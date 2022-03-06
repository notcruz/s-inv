module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 0px 12.5px 0px #F05454",
      },
      colors: {
        's-red': '#F05454',
        's-blue-300': '#222831',
        's-blue-200': '#30475E',
        's-blue-100': '#4A5568',
        's-gray-100': '#DDDDDD'
      }
    },
  },
  plugins: [],
}