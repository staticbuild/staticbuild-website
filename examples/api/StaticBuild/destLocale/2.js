gulp.task(mts('fonts'), function () {
  return gulp.src([
    'src/lib/fonts/**/*'
  ])
  .pipe(gulpif(gzipOn, gzip(gzipOpt)))
  .pipe(gulp.dest(
    // Returns 'dist/en/lib/fonts/' when the 'en' locale is set...
    build.destLocale('/lib/fonts/')
  ));
});
