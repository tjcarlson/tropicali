var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCss = require("gulp-clean-css");
sass.compiler = require("node-sass");

gulp.task("sass", function() {
  // we want to run sass css/app.scss app.css --watch
  return gulp
    .src("css/app.scss")
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest("."));
});

gulp.task("watch", function() {
  gulp.watch("css/app.scss", ["sass"]);
});

gulp.task("default", ["sass", "watch"]);
