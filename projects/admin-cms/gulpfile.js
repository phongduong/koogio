const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const rollup = require("gulp-better-rollup");
const rollupTypescriptPlugin = require("rollup-plugin-typescript");
const rename = require("gulp-rename");

const cssDev = () =>
  src("public/style/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("public/style/css"));

const jsDev = () =>
  src(["public/scripts/ts/*.ts", "!public/scripts/ts/_*.ts"])
    .pipe(rollup({ plugins: [rollupTypescriptPlugin()] }, { format: "umd" }))
    .pipe(
      rename({
        extname: ".js"
      })
    )
    .pipe(dest("public/scripts/js"));

const cssWatch = () => watch("public/style/scss/**/*.scss", cssDev);

const jsWatch = () => watch("public/scripts/ts/**/*.ts", jsDev);

exports.default = series(parallel(cssDev, jsDev), parallel(cssWatch, jsWatch));
