var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sass = require('gulp-sass');
var clean = require('gulp-clean');




gulp.task('sass', ['sass-libs-copy'], function () {
    return gulp.src([
        //usually only screen.scss
        'app/sass/**/*.scss',
        // no partials
        "!app/sass/**/_*.scss",
        //no libs
        '!app/sass/libs/**/*'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

gulp.task('sass-libs-copy', function() {
    return gulp.src(["bower_components/**/*.scss",
        "bower_components/**/*.css",
        "bower_components/**/*.woff"])
        .pipe(gulp.dest('app/sass/libs'))
});

gulp.task('frontend-libs-copy', function() {
    var bower_files_dev =  mainBowerFiles();
    return gulp.src(bower_files_dev, { base: 'bower_components' })
        .pipe(gulp.dest('./public/libs'))
});



gulp.task('app-js', function () {
    //first list files that define new modules. the module definitions must be at the beginning
    gulp.src(['app/ng/**/app.js', 'app/ng/components/movies/movies.js', 'app/ng/**/*.js'])
    /*
    suspend minification, since angular cannot handle sourcemaps in errors https://github.com/angular/angular.js/issues/5217#issuecomment-50993513
     */
        //.pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
})

 gulp.task('app-templates', function () {
     return gulp.src('app/ng/**/*.html')
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

var MAIN_TASKS = ['app-js', 'app-templates', 'frontend-libs-copy', 'sass'];

gulp.task('watch', MAIN_TASKS, function () {
    gulp.watch('app/ng/**/*.js', ['app-js'])
    gulp.watch('app/ng/**/*.html', [ 'app-templates']);
    gulp.watch(['bower_components/**/*', 'bower.json'], [ 'frontend-libs-copy', 'sass-libs-copy']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
})

gulp.task('install', MAIN_TASKS);

gulp.task('clean', function () {
    return gulp.src(['app/sass/libs',
                        'public/js/app.js',
                        'public/js/templates.js',
                        'public/css',
                        'public/libs'], {read: false})
        .pipe(clean());
});





