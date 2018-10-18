var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create()

// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// development server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

// compiles all SCSS files
gulp.task('sass', function () {
  gulp.src('src/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(autoprefixer('last 2 version', '> 5%', 'ie 8'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/*.scss', ['sass'])
  gulp.watch('./src/**/*.scss', ['sass'])
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload)
  gulp.watch('./*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve'])
