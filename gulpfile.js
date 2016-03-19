var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var googlecdn = require('gulp-google-cdn');

gulp.task('libs', function () {
    return gulp.src('public/index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('./public/libs'));
});

var bower_files_dev =  mainBowerFiles();

//gulp.task('libs', function() {
//    return gulp.src(bower_files_dev, { base: 'bower_components' })
//        .pipe(gulp.dest('./public/libs'))
//});


gulp.task('app-js', function () {
    gulp.src(['app/**/app.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
})

 gulp.task('app-templates', function () {
     return gulp.src('app/**/*.html')
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', ['app-js', 'app-templates', 'libs'], function () {
    gulp.watch('app/**/*.js', ['app-js'])
    gulp.watch('app/**/*.html', [ 'app-templates']);

})

//gulp.task('default' ['watch'])






