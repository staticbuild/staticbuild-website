// Construct with a configuration file...
var build = new StaticBuild('./staticbuild.json');

// with the default file ('./staticbuild.json')...
var build = new StaticBuild();

// with a configuration file and other options...
var build = new StaticBuild('./staticbuild.json', {
  verbose: true
});

// or with options containing a configuration file path...
var build = new StaticBuild({
  path: './staticbuild.json',
  verbose: true
});
