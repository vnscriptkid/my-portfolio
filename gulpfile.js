const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('prefix', function() {
    return gulp.src('css/main.css')
        .pipe(prefixer())
        .pipe(gulp.dest('build/'));
})

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('css/'));
  });

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('css/main.css', gulp.series('prefix'));
})