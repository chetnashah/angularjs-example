

var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('build', ['clean'], function(done){
    runSequence('build:scripts', done);
});

gulp.task('clean', function(done){
    return del(['build']);
});

gulp.task('build:scripts',['build:tpl'], function(done){
    var scripts = [
        'node_modules/moment/moment.js',
        "node_modules/angularjs-bootstrap-datetimepicker/src/js/datetimepicker.js",
        "node_modules/angularjs-bootstrap-datetimepicker/src/js/datetimepicker.templates.js",
        "node_modules/angular-date-time-input/src/dateTimeInput.js",
        "node_modules/ng-file-upload/dist/ng-file-upload-shim.js",
        "node_modules/ng-file-upload/dist/ng-file-upload.js",
        "src/js/app.js"
    ];
    return gulp.src(scripts)
    .pipe(concat('all.js', {newLine: ';'}))
    .pipe(gulp.dest('build'));
});

gulp.task('build:tpl',['build:css'], function(){
    var templates = [
        "src/tpl/fourthdir.html",
        "src/tpl/careers.html",
        "src/index.html"
    ];
    return gulp.src(templates)
    .pipe(gulp.dest('build'));
});
gulp.task('build:css', function(){
    var styles = [
        "node_modules/angularjs-bootstrap-datetimepicker/src/css/datetimepicker.css",
        "src/css/app.css"
    ];
    return gulp.src(styles)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('all-watch', ['build'], function(cb){
    
    browserSync.reload();
    cb();
});

gulp.task('default', ['build'], function(){
// Start a Browsersync proxy
browserSync.init({
    proxy: "http://localhost:4000"
});

    gulp.watch("src/js/*.js", ['all-watch']);
})
