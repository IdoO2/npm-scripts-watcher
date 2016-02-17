#!/usr/bin/env node
import 'colors';
import debounce from 'debounce';
import glob from 'glob';
import watch from 'node-watch';
import path from 'path';
import shell from 'shelljs';

const cwd = process.cwd();
const config = require(path.join(cwd, 'package.json'));

const verbose = (['--verbose', '-v'].indexOf(process.argv[2]) !== -1);

Object.keys(config.watch).forEach(pattern => {
  glob(pattern, { cwd }, (err, files) => {
    if (err) {
      console.log(err.bold.red);
    } else {
      console.log(`Watching ${files.length} files matching '${pattern}'...`.bold);
      start(config.watch[pattern], config.scripts);
    }

    watch(files, debounce(filename => {
      console.log('~'.blue, `${filename} changed`.gray);
      start(config.watch[pattern], config.scripts);
    }, 1000));
  });
});

function start(watchScripts, npmScripts) {
  watchScripts.forEach(scriptName => {
    if (npmScripts[scriptName]) {
      run(scriptName, npmScripts[scriptName], `npm run ${scriptName} -s`);
    } else {
      console.log(`Error: '${scriptName}' not found in scripts`.red, 'check your package.json'.gray);
    }
  });
}

function run(name, script, command) {
  shell.exec(command, { silent: true }, (exitcode, output) => {
    if (exitcode === 0) {
      console.log('✓'.green, name.bold, script.gray);
      verbose && console.log(output.trim().gray);
    } else {
      console.log('✗'.red, name.bold, script.gray);
      console.log(output.trim().gray);
    }
  });
}
