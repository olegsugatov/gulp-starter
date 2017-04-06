// 'use strict';
///////////////////////////////////////////////////
// add var paths
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Required taskes
// gulp build
// gilp build:crean
// gulp build:server
///////////////////////////////////////////////////
var gulp 	  	    = require('gulp'),
    jade          = require('gulp-jade'),
	  sass 	  	    = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'), 
    flatten       = require('gulp-flatten'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    plumber       = require('gulp-plumber'),
    rename 		    = require('gulp-rename'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    del           = require('del');

///////////////////////////////////////////////////
// Markdown Tasks
///////////////////////////////////////////////////
gulp.task('markdown', function () {
  gulp.src('src/jade/index.jade')
   .pipe(plumber())
   .pipe(jade())
   .pipe(gulp.dest('src'))

   .pipe(reload({stream:true}));
});

///////////////////////////////////////////////////
// Styles Tasks
///////////////////////////////////////////////////
gulp.task('styles', function () {
  gulp.src('src/css/style.scss')
    .pipe(plumber())
      .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))

    .pipe(reload({stream:true}));
});

///////////////////////////////////////////////////
// JavaScripts Tasks
///////////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src('src/js/main.js')
    //.pipe(plumber())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('src/js'))

    .pipe(reload({stream:true}));
});

///////////////////////////////////////////////////
// Bower Tasks
///////////////////////////////////////////////////
gulp.task('bower_scripts', function () {
  gulp.src('src/bower_components/**/*.min.js')
    .pipe(flatten( {includeParents: 1} ))
    // .pipe(uglify())
    // .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('bower_styles', function () {
  gulp.src(['src/bower_components/**/*.css'])
    .pipe(flatten( { includeParents: 1} ))
    // .pipe(minifyCSS())
    // .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest('src/css'));
});

///////////////////////////////////////////////////
// Browser-Sync Tasks
///////////////////////////////////////////////////
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('build:server', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});

///////////////////////////////////////////////////
// Build Tasks
///////////////////////////////////////////////////
// clean build folder
gulp.task('build:clean', function () {
  del(['build/**']);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:clean'], function(){
    return gulp.src('src/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function () {
    del([
    'build/jade',
    'build/css/!(*.min.css)',
    'build/js/!(*.min.js)',
    'build/bower_components',
    'build/libs'
    // 'build/libs/normalize-css'
  ]);
});

// build notify
gulp.task('build:notify', function () {
    gulp.src("./build")
      .pipe(notify("Success Build!"));
});

// gulp build default
gulp.task('build', ['build:copy', 'build:remove', 'build:notify']);

///////////////////////////////////////////////////
// Watch Tasks
///////////////////////////////////////////////////
gulp.task('watch', function () {
  gulp.watch('src/**/*.jade', ['markdown']);
  gulp.watch('src/css/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['markdown', 'styles' , 'scripts', 'bower_scripts', 'bower_styles', 'browser-sync', 'watch']);