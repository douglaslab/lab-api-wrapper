'use strict';
require('babel/register');  //to allow mocha to pick up babel
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var baseDir = 'src/**/*.js';

gulp.task('lint', function () {
  return gulp.src(baseDir)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('compile', function() {
	return gulp.src(baseDir)
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['lint', 'compile']);

gulp.task('test', function() {
  return gulp.src('tests/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch('src/**', ['default']);
});
