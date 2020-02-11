const { src, dest, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("gulp-purgecss");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");

const cssDev = () => {
  return src("assets/style/style.css")
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(dest("_site/assets/style"));
};

const cssProd = () => {
  return src("assets/style/style.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(
      purgecss({
        content: ["_site/**/*.html"]
      })
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("_site/assets/style"));
};

const copyImage = () => {
  return src("assets/img/*")
    .pipe(imagemin())
    .pipe(dest("_site/assets/img"));
};

exports.dev = parallel(cssDev, copyImage);
exports.build = parallel(cssProd, copyImage);
