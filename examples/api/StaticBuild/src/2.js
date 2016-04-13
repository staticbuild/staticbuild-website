gulp.task(mts('images'), function () {
  return gulp.src([
    // Returns 'src/**/*.gif' and so on....
    build.src('/**/*.gif'),
    build.src('/**/*.ico'),
    build.src('/**/*.jpg'),
    build.src('/**/*.png')
  ])
  .pipe(gulpif(gzipOn, gzip(gzipOpt)))
  .pipe(gulp.dest(build.destLocale()));
});
