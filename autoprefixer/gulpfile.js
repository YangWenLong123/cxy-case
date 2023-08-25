/*
 * @Author: along
 * @Description: css
 * @Date: 2023-06-29 21:31:46
 * @LastEditors: along
 * @LastEditTime: 2023-08-02 09:26:26
 * @FilePath: /cxy-case/autoprefixer/gulpfile.js
 */

let gulp = require('gulp');


// gulp.task('one', function (cb) {
//   gulp.src('tools' + '/**/*.js')
//     .pipe(gulpJavaScriptObfuscator({
//       compact: true,
//       selfDefending: true,
//       // Type: number Default: 0.75 Min: 0 Max: 1
//       controlFlowFlatteningThreshold: secretKey,
//       deadCodeInjectionThreshold: 0.7
//     }))
//     .pipe(gulp.dest('dist'));
//   cb();
// });

gulp.task('autoprefixer', () => {
  const autoprefixer = require('autoprefixer')
  const sourcemaps = require('gulp-sourcemaps')
  const postcss = require('gulp-postcss')

  return gulp.src('./*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'))
})



gulp.task('default', gulp.series(['autoprefixer']));
