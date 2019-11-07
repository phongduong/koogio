const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const glob = require("glob");

const cssDev = () =>
  src("public/style/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("public/style/css"));

const jsDev = () =>
  browserify({
    basedir: ".",
    entries: glob.sync("public/scripts/ts/**/*.ts"),
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(dest("public/scripts/js"));

const cssWatch = () => watch("public/style/scss/**/*.scss", cssDev);

const jsWatch = () => watch("public/scripts/ts/**/*.ts", jsDev);

exports.default = series(parallel(cssDev, jsDev), parallel(cssWatch, jsWatch));
