'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat'); // объединение файлов
const uglify = require('gulp-uglify'); // минификатор js
const rename  = require('gulp-rename'); // переименование, добавление суффикосов
const postcss = require('gulp-postcss');
const csso = require('postcss-csso'); // минификатор css
const cssmqpacker = require('css-mqpacker'); // объединение и сортировка @media
/* для css var https://github.com/postcss/postcss-custom-properties */
const customProperties = require('postcss-custom-properties');
/* для calc https://github.com/postcss/postcss-calc */
const calc = require('postcss-calc');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const remove = require('gulp-remove-files');

// пути к файлам
const path = {
  js:  ['./**/*.js', '!./node_modules/**', '!./_test/**', '!./gulpfile.js'],
  css: ['./**/*.css', '!./node_modules/**', '!./_test/**']
};

// плагины postcss
const postCssPlugins = [
    customProperties({
        preserve: false
    }),
    calc(),
    cssmqpacker({
        sort: true
    }),
    csso()
];

const uglyOptions = {
  comments: true
};


// critical css
gulp.task('css', () => {
    return gulp.src([
        './**/critical.css',
        '!./_test/**',
        '!./node_modules/**'
    ])
    .pipe(concat('main.min.css'))
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest('./_test/css/'))
});

// additional css
gulp.task('css:add', () => {
  return gulp.src([
      './root/critical.css',
      './**/add.css',
      './**/night.css',
      '!./_test/**',
      '!./node_modules/**'
  ])
    .pipe(concat('decor.min.css'))
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest('./_test/css/'))
});

// print css
gulp.task('css:print', () => {
    return gulp.src([
        './root/critical.css',
        './**/ptint.css',
        '!./_test/**',
        '!./node_modules/**',
        ])
        .pipe(concat('print.min.css'))
        .pipe(postcss(postCssPlugins))
        .pipe(gulp.dest('./_test/css/'))
});

// js
gulp.task('js', () => {
    return gulp.src([
        './**/base.js',
        '!./_test/**',
        '!./node_modules/**'
        ])
        .pipe(concat('main.min.js'))
        .pipe(babel({
        	presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./_test/js'))
});



// libraries
gulp.task('js:lazy', () => {
    return gulp.src([
        './**/*_lazy.js',
        '!./_test/**',
        '!./node_modules/**'
        ])
        .pipe(babel({
        	presets: ["env"]
        }))
        .pipe(uglify(
            {
            output: {
                    comments: `/^!/`
                }
            }
        ))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./_test/js'))
});


// images
gulp.task('img', () => {
    return gulp.src([
        './img/*.svg',
        '!./_test/**',
        '!./node_modules/**'
    ])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./_test/img'))
});


gulp.task('remove', function () {
    gulp.src([
        './_test/css/**',
        './_test/js/**'
    ])
    .pipe(remove())
});


// server
gulp.task('serv', function() {
    browserSync.init({
        server: './_test/'
    });

    browserSync.watch([
        './**/*.*',
        '!./node_modules/**',
        '!./_test/**',
        '!./gulpfile.js'
    ]).on('change', browserSync.reload);
});


// следим за изменением файлов
gulp.task('watch', function() {
    gulp.watch(path.css, ['css','css:add','css:print','serv']);
    gulp.watch(path.js, ['js','serv']);
});

// сборка проекта
gulp.task('dev', ['remove',
                  'css',
                  'css:add',
                  'css:print',
                  'js',
                  'js:lazy',
                  'serv',
                  'watch']);
