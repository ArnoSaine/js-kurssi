const { readdir } = require('fs');
const { move, writeJson } = require('fs-extra');
const { resolve } = require('path');
const { exec } = require('child_process');

const source = 'slides';
const slidePath = 'slidePath.json';

readdir(source, async (error, paths) => {
  if (error) {
    throw error;
  }
  await paths.reduce(async (previous, path) => {
    await previous;
    await writeJson(slidePath, `${source}/${path}`);
    return new Promise((resolve, reject) =>
      exec(`exerslide build public/${path}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        console.log(stdout);
        console.log(stderr);
        resolve();
      })
    );
  }, Promise.resolve());
  await writeJson(slidePath, source);
});
