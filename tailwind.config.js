module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#02fe6a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
