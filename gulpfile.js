var gulp = require('gulp');
var babel = require('gulp-babel');
var browser = require('browser-sync');

gulp.task('reload', function(cb) {
    browser.reload();
    cb();
});

gulp.task('server', function() {
    browser.init({
        server: {
            baseDir: "examples",
            index: ['index.html']
        },
        port: 8001,
    });
});

gulp.task('jsx', function() {
    return gulp.src('examples/**/app.jsx')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['jsx', 'server'], function() {
    gulp.watch(['examples/**/*.jsx'], ['jsx', 'reload']);
});
