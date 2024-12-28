/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pThin: ["Poppins-Thin", "sans-serif"],
        pExtraLight: ["Poppins-ExtraLight", "sans-serif"],
        pLight: ["Poppins-Light", "sans-serif"],
        pRegular: ["Poppins-Regular", "sans-serif"],
        pMedium: ["Poppins-Medium", "sans-serif"],
        pSemiBold: ["Poppins-SemiBold", "sans-serif"],
        pBold: ["Poppins-Bold", "sans-serif"],
        pExtraBold: ["Poppins-ExtraBold", "sans-serif"],
        pBlack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
