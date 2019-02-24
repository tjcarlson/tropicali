var gulp = require("gulp");

//css
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");

//browser refresh
var browserSync = require("browser-sync").create();

//images
var imageMin = require("gulp-imagemin");

gulp.task("css", function() {
  // we want to run sass css/app.css app.css --watch
  return gulp
    .src(["src/css/reset.css", "src/css/typography.css", "source/css/app.ss"])
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("autoprefixer"),
        require("postcss-preset-env")({
          stage: 1,
          browsers: ["IE 11", "last 2 versions"]
        })
      ])
    )
    .pipe(concat("app.css"))
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
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("fonts", function() {
  return gulp.src("src/fonts/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("images", function() {
  return gulp
    .src("src/img/*")
    .pipe(imageMin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload);
  gulp.watch("src/css/*", ["css"]);
  gulp.watch("src/fonts/*", ["fonts"]);
  gulp.watch("src/images/*", ["images"]);
});

gulp.task("default", ["html", "css", "watch", "fonts", "images"]);
