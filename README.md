# npm-scripts-watcher

[![npm version](https://img.shields.io/npm/v/npm-scripts-watcher.svg)](https://www.npmjs.com/package/npm-scripts-watcher)

Globbing file watcher to automatically run npm scripts from package.json when files change, with pretty colors.

![Screenshot](https://raw.github.com/wehkamp/npm-scripts-watcher/master/screenshot.png)

## Usage

First install it as a devDependency:

```
npm i -D npm-scripts-watcher
```

Add a top-level `watch` config to your package.json and a `watch` script to your `scripts`:

```json
{
  "scripts": {
    "test": "mocha",
    "watch": "npm-scripts-watcher"
  },
  "watch": {
    "{src,test}/**/*.js": ["test"]
  }
}
```

Keys in the `watch` object should be [globs](https://www.npmjs.com/package/glob) and values should be an array of script
names as specified in `scripts`.

Now you can start the file watcher using `npm run watch`.
