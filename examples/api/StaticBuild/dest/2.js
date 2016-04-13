gulp.task('clean-all', function () {
  del.sync([
    // Returns 'dist/**/*' for the default configuration...
    build.dest('/**/*')
  ]);
});
