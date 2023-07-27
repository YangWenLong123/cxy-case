/*
 * @Author: along
 * @Description: 压缩脚本
 * @Date: 2023-06-29 21:31:46
 * @LastEditors: along
 * @LastEditTime: 2023-07-23 17:58:01
 * @FilePath: /cxy-case/gulp-javascript-obfuscator/gulpfile.js
 */

let secretKey = Number((((Math.random() * 100) / 100).toFixed(2)));
let htmlmin = require('gulp-html-minifier-terser');
let gulp = require('gulp');
let gulpJavaScriptObfuscator = require('gulp-javascript-obfuscator');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');


console.log('%c密钥:' + secretKey, 'color: #2563fc');

gulp.task('one', function (cb) {
  gulp.src('tools' + '/**/*.js')
    .pipe(gulpJavaScriptObfuscator({
      compact: true,
      selfDefending: true,
      // Type: number Default: 0.75 Min: 0 Max: 1
      controlFlowFlatteningThreshold: secretKey,
      deadCodeInjectionThreshold: 0.7
    }))
    .pipe(gulp.dest('dist'));
  cb();
});

gulp.task('two', function (cb) {
  gulp.src('tools' + '/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }))

    .pipe(gulp.dest('dist'));
  cb();
});


gulp.task('three', function (cb) {
  gulp.src('tools' + '/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      level: 2,
      debug: true
    }))
    .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
  cb();
});

gulp.task('default', gulp.series(['one', 'two', 'three']));
