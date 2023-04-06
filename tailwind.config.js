/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'sans': ['Montserrat', 'helvetica', 'arial', 'sans-serif']
      },
      fontSize: {
        "xxs": ".625rem",
      }
    },
  },
  daisyui: {
    themes: ["autumn"]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}