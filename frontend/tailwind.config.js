/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { primary: ["Roboto", "sans-serif"] },
      fontSize: {
        heding1Black: ["30px", "46px"],
        heading2Bold: ["26px", "40px"],
        heading3Bold: ["18px", "28px"],
        displayBold: ["16px", "24px"],
        displayMedium: ["16px", "24px"],
        bodyBold: ["14px", "22px"],
        bodyMedium: ["13px", "18px"],
        bodyRegular: ["12px", "18px"],
      },
      colors: {
        primary: "#b68bdcb1",
        secondary: "#2E4CFF",
        darkColors1: "#191C21",
        darkColors2: "#212833",
      },
    },
  },
  plugins: [],
};
