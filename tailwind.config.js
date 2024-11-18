/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        headerBg: "#e4e2dd",
        footerBg: "#e4e2dd",
        linkColor: "#db4a2b",
        textColor: "#333333",
        contentBg: "#f5f5f5", 
        borderColor: "#e4e2dd" // or "#ffffff" for a cleaner look
      },
    },
  },
  plugins: [],
}
