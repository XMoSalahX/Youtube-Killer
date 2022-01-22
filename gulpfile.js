const GulpClient = require("gulp");
var gulp = require("gulp"),
    concat = require("gulp-concat"),
    Sass = require('gulp-sass')(require('sass')),
    pug = require("gulp-pug"),
    livereload = require("gulp-livereload"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    zip = require("gulp-zip");

gulp.task("compress", function() {
    return gulp.src("dist/**/*.*")
        .pipe(zip("Website.zip"))
        .pipe(notify("Website is Compressed Successfuly"))
        .pipe(gulp.dest("."))
})


gulp.task("css-log", function() {
    return gulp.src(["css/normalize.css", "css/all.min.css", "css/main-log.scss", "css/media-log.css"])
        .pipe(sourcemaps.init())
        .pipe(Sass({ outputStyle: "compressed" }))
        .pipe(concat("main-log.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("Css log task done!"))
        .pipe(livereload())
})

gulp.task("html-log-reg", function() {
    return gulp.src(["register-page.pug"])
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(notify("Html log register task done!"))
        .pipe(livereload())
})

gulp.task("html-log-login", function() {

    return gulp.src(["login-page.pug"])
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(notify("Html log Login task done!"))
        .pipe(livereload())
})

gulp.task("html-log-forget", function() {
    return gulp.src(["forget.pug"])
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(notify("Html log Forget task done!"))
        .pipe(livereload())
})

gulp.task("reg-Sript", function() {
    return gulp.src(["js/fbAPI.js", "js/register.js"])
        .pipe(concat("register.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(notify("JS register task done!"))
        .pipe(livereload())
})

gulp.task("login-Script", function() {
    return gulp.src(["js/fbAPI.js", "js/login.js"])
        .pipe(concat("login.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(notify("JS Login task done!"))
        .pipe(livereload())
})

gulp.task("forget-Script", function() {
    return gulp.src(["js/fbAPI.js", "js/forget.js"])
        .pipe(concat("forget.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(notify("JS Forget task done!"))
        .pipe(livereload())
})

gulp.task("html-home", function() {
    return gulp.src("home-page.pug")
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(notify("HTML Home Page task done!"))
        .pipe(livereload())
})

gulp.task("css-home", function() {
    return gulp.src(["css/normalize.css", "css/all.min.css", "css/home-main.scss", "css/home-media.css"])
        .pipe(sourcemaps.init())
        .pipe(Sass({ outputStyle: "compressed" }))
        .pipe(concat("home-main.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("CSS Home Page task done!"))
        .pipe(livereload())
})

gulp.task("js-home", function() {
    return gulp.src(["js/home.js", "js/global-main-page.js"])
        .pipe(concat("home.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify("JS Home Page task done!"))
        .pipe(livereload())
})

gulp.task("html-active", function() {
    return gulp.src("active-vedieo.pug")
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(notify("HTML Active Page task done!"))
        .pipe(livereload())
})

gulp.task("css-active", function() {
    return gulp.src(["css/normalize.css", "css/all.min.css", "css/home-main.scss", "css/home-media.css", "css/main-active-Video.scss", "css/acive-media.css"])
        .pipe(sourcemaps.init())
        .pipe(Sass({ outputStyle: "compressed" }))
        .pipe(concat("main-active-Video.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("CSS Active Page task done!"))
        .pipe(livereload())
})

gulp.task("js-active", function() {
    return gulp.src(["js/jquery.fitvids.js", "js/active-vedio.js", "js/global-main-page.js"])
        .pipe(concat("active-vedio.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify("JS Active Page task done!"))
        .pipe(livereload())
})

gulp.task("watch", function() {
    require("./server.js");
    livereload.listen();
    gulp.watch(["./login-page.pug", "basic-log-page.pug"], gulp.series("html-log-login"))
    gulp.watch(["register-page.pug", "basic-log-page.pug"], gulp.series("html-log-reg"))
    gulp.watch(["footer&setting.pug", "active-vedieo.pug", "basic-main-page.pug"], gulp.series("html-active"))
    gulp.watch(["forget.pug", "basic-log-page.pug"], gulp.series("html-log-forget"))
    gulp.watch(["footer&setting.pug", "home-page.pug", "basic-main-page.pug"], gulp.series("html-home"))
    gulp.watch(["css/_color.scss", "css/main-log.scss", "media-log.css"], gulp.series("css-log"))
    gulp.watch(["css/_color.scss", "css/home-main.scss", "css/home-media.css"], gulp.series("css-home"))
    gulp.watch(["css/_color.scss", "css/main-active-Video.scss", "acive-media.css"], gulp.series("css-active"))
    gulp.watch(["js/fbAPI.js", "js/register.js"], gulp.series("reg-Sript"))
    gulp.watch(["js/fbAPI.js", "js/login.js"], gulp.series("login-Script"))
    gulp.watch(["js/fbAPI.js", "js/forget.js"], gulp.series("forget-Script"))
    gulp.watch(["js/home.js", "js/global-main-page.js"], gulp.series("js-home"))
    gulp.watch(["js/jquery.fitvids.js", "js/active-vedio.js", "js/global-main-page.js"], gulp.series("js-active"))
    gulp.watch(["dist/**/*.*"], gulp.series("compress"))
});

gulp.task('default', gulp.series('watch'));