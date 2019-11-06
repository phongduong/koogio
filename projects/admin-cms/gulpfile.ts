import { src, dest, series, parallel, watch } from 'gulp';
import sass from 'gulp-sass';
import ts from 'gulp-typescript';

const cssDev = () =>
  src('public/style/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/style/css'));

const jsDev = () =>
  src('public/scripts/ts/**/*.ts')
    .pipe(ts())
    .on('error', error => console.log(error))
    .pipe(dest('public/scripts/js'));

const cssWatch = () => watch('public/style/scss/**/*.scss', cssDev);

const jsWatch = () => watch('public/scripts/ts/**/*.ts', jsDev);

export default series(parallel(cssDev, jsDev), parallel(cssWatch, jsWatch));
