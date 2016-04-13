/** Sets a default or specific locale via cli flag `gulp [task] --locale=en` */
build.trySetLocale(gutil.env.locale, function (err) {
  if (!err)
    return;
  gutil.log(err);
  process.exit(1001);
});
