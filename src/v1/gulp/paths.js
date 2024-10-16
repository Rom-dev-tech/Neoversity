module.exports = {
  src: {
    html: "src/html/pages/**/*.+(html|nunjucks|njk)",
    css: "src/assets/scss/**/*.scss",
    js: "src/assets/js/**/*.js",
    images: "src/assets/images/**/*",
    data: "src/json/**/*",
    php: "src/**/*.php",
  },
  watch: {
    html: "src/html/**/*.+(html|nunjucks|njk)",
    css: "src/assets/scss/**/*.scss",
    tailwindcss: "./tailwind.config.js",
    js: "src/assets/js/**/*.js",
    images: "src/assets/images/**/*",
    data: "src/json/data.json",
  },
  build: {
    html: "build/",
    css: "build/assets/css/",
    js: "build/assets/js/",
    images: "build/assets/images/",
    php: "build/",
  },
  clean: "build/",
};
