/**
 * Created by Administrator on 2016/7/15 0015.
 */
var gulp = require('gulp');
var repV = require('gulp-version-replace');

gulp.task('rev', function () {
    gulp.src('test/**/*.html')
        .pipe(repV({regRxp : '',path : ''}))
        .pipe(gulp.dest('dist'));
});