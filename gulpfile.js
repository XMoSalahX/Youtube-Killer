const GulpClient = require("gulp");
var gulp = require("gulp");
var concat = require("gulp-concat");
var Sass = require('gulp-sass')(require('sass'))
var pug = require("gulp-pug")

gulp.task("css-log", function() {
    return gulp.src(["css/normalize.css", "css/all.min.css", "css/main-log.scss", "css/media-log.css"])
        .pipe(Sass({ outputStyle: "compressed" }))
        .pipe(concat("main-log.css"))
        .pipe(gulp.dest('dist/css'));
})

gulp.task("html-log-reg", function() {
    return gulp.src(["register-page.pug"])
        .pipe(pug())
        .pipe(gulp.dest("dist"))
})