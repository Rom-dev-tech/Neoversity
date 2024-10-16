/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,njk,js,json}"],
  theme: {
    extend: {
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "32px",
          xl: "32px",
        },
      },
      // COLORS
      colors: {
        body: "#ffffff", // bg-body
        loading: "#000000", // text-loading
        white: {
          DEFAULT: "#ffffff", // *-white
        },
        black: {
          DEFAULT: "#000000", // *-black
          61: "#616161", // *-black-61
        },
        accent: {
          DEFAULT: "#00D85B", // *-accent
          hover: "#009C42",
        },
      },
      // BACKGROUND IMAGES
      backgroundImage: {
        checkbox: "url('../images/agree-checkbox.svg')", // bg-checkbox
      },
    },
    // MEDIA QUERIES
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1280px",
      "6xl": "1920px",
      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1279.98px" },
      notXl: { max: "1279.98px" },
    },
    // FONTS
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"], // font-montserrat
      unbounded: ["Unbounded", "sans-serif"],
    },
  },
  plugins: [],
};
