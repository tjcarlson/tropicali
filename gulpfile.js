var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
sass.compiler = require("node-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
  // we want to run sass css/app.scss app.css --watch
  return gulp
    .src("src/css/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("html", function() {
  return gulp.src("src/index.html").pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("src/index.html", ["html"]).on("change", browserSync.reload);
  gulp.watch("src/css/app.scss", ["sass"]);
});

gulp.task("default", ["html", "sass", "watch"]);
