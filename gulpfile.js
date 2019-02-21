var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
sass.compiler = require("node-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  // we want to run sass css/app.scss app.css --watch
  return gulp
    .src("css/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(browserSync.stream());
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("css/app.scss", ["sass"]);
});

gulp.task("default", ["sass", "watch"]);
