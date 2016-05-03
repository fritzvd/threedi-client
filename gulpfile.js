'use strict'

const gulp = require('gulp')
const standard = require('gulp-standard')
const tape = require('gulp-tape')
const tapColorize = require('tap-colorize')
const webserver = require('gulp-webserver')
const browserify = require('browserify')
const stringify = require('stringify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')

const paths = {}
paths.tests = ['./tests/**/*.js']
paths.tags = ['./src/**/*.tag']
paths.html = ['./src/**/*.html']
paths.scripts = ['./src/**/*.js', paths.tests[0]]

gulp.task('test', function () {
  return gulp.src(paths.tests)
    .pipe(tape({
      reporter: tapColorize()
    }))
})

gulp.task('linting', function () {
  return gulp.src(paths.scripts)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('webserver', function () {
  gulp.src('./dist/')
    .pipe(webserver({
      livereload: true,
      open: true
    }))
})

gulp.task('browserify', function () {
  browserify({ entries: ['src/app.js'] })
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.html', '.css'] },
    minify: false
  }) // pass options if you need
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/'))
})

gulp.task('htmlmin', function () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('jsmin', function () {
  browserify({ entries: ['src/app.js'] })
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.html', '.css'] },
    minify: true
  }) // pass options if you need
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['linting', 'test'])
  gulp.watch(paths.scripts
    .concat(paths.tags)
    .concat(paths.html), ['browserify'])
})

gulp.task('minify', ['htmlmin', 'jsmin'])
gulp.task('build', ['test', 'linting', 'minify'])
gulp.task('dev', ['watch', 'webserver'])
gulp.task('default', ['dev'])
