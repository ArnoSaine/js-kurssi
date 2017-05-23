const { copy, ensureDir } = require('fs-extra');
const { resolve } = require('path');
const recursive = require('recursive-readdir');
const { readdir } = require('fs');
const concat = require('concat');

const icons = ['flask', 'smile-o', 'frown-o'];
const emojis = ['fireworks', 'sunglasses', 'confused'];
const temp = 'temp';
const target = 'print';
const ignorePath = path => path.replace(/[\\\/]/g, '.');
(async () => {
  await copy('slides', temp);
  await require('replace-in-file')({
    files: [`${temp}/**/*.md`],
    from: [
      ...icons.map(icon =>
        RegExp(`<i class="fa fa-${icon}" aria-hidden="true"><\/i>`, 'g')
      ),
      /^\s*---\s*.*\s*title:/m,
      /---\s*/m
    ],
    to: [...emojis.map(emoji => `:${emoji}:`), '#', '\n']
  });
  readdir(temp, async (error, paths) => {
    if (error) {
      throw error;
    }
    await ensureDir(target);
    await paths.reduce(async (previous, path) => {
      await previous;
      const files = await recursive(`${temp}/${path}`);
      concat(
        files.sort((a, b) => ignorePath(a).localeCompare(ignorePath(b))),
        `${target}/${path}.md`
      );
    }, Promise.resolve());
  });
})();
