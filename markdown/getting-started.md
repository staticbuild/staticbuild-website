### Global Install

Run

`npm install -g staticbuild`

Then, to setup a new project in the specified path:

`staticbuild setup [path]`

Output

```
Setting up basic site template....
Done.
When ready, please run: npm install && bower install
To view the site during development: npm run dev
To generate the site for production: gulp
```

*(The path argument is optional and defaults to the current directory.)*

### Manual Installation

Run

`npm install --save-dev staticbuild`

In the `package.json` file for your project, add one of the following and then
run it with `npm run dev`. Look at the `demo` projects for more details.

```json
"scripts": {
  "dev": "staticbuild dev ."
}
```

or

```json
"scripts": {
  "dev": "staticbuild dev path/to/staticbuild.json"
}
```

## Command Line Interface

The default command right now is to just run the development server.
That may change in the future and more commands will be added to generate
files like a gulp or grunt file.

### Help
```
staticbuild v0.12.4 - A static website generator and development server.

Usage:
  staticbuild [command] [options]

Commands:
  dev    Run the development web server.
  setup  Setup a new project.

Options:
  -v, --version  Show version number.  [boolean]
  -h, --help     Show help.  [boolean]
  -V, --verbose  Enables verbose output.  [count]
```

### Development Server
```
staticbuild v0.12.4 - Development server.

    Runs a local http server to dynamically render static content during development.

Usage:
  staticbuild dev [options] <path>

Required:
  path           Path to a staticbuild.json file or directory to find one.
                 If no path is supplied, the current directory is used.

Options:
  -v, --version       Show version number.  [boolean]
  -h, --help, --help  Show help.  [boolean]
  -b, --bundling      Enable bundling.  [boolean] [default: false]
  -r, --restart       Number of seconds to delay nodemon restarts.  [number] [default: 1]
  --no-restart        Disables the built-in nodemon server restart.
  -V, --verbose       Enables verbose output.  [count]
```

### Setup

At the time of this writing, this command simply creates a default 
`staticbuild.json` file.

```
staticbuild v0.12.4 - Setup.

    Interactive setup to create a new project.

Usage:
  staticbuild setup [options] [path]

Options:
  -v, --version       Show version number.  [boolean]
  -h, --help, --help  Show help.  [boolean]
  -V, --verbose       Enables verbose output.  [count]
```

