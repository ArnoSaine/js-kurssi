const { copy, ensureDir } = require('fs-extra');
const { resolve } = require('path');
const recursive = require('recursive-readdir');
const { readdir } = require('fs');
const concat = require('concat');

const icons = [
  'flask',
  'thumbs-o-up',
  'thumbs-o-down',
  'meh-o',
  'check-square-o'
];
const emojis = [
  'fireworks',
  'thumbsup',
  'thumbsdown',
  'neutral_face',
  'ballot_box_with_check'
];
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
      /^##### /gm,
      /^#### /gm,
      /^### /gm,
      /^## /gm,
      /\s*---\s*(title|chapter):\s*/,
      /\s*---\s*\#chapter\s*/,
      /title:\s*/,
      /^---\s*/m
      ///---\s*/m
    ],
    to: [
      ...emojis.map(emoji => `:${emoji}:`),
      '###### ',
      '##### ',
      '#### ',
      '### ',
      '# ',
      '',
      '## ',
      '\n'
      //'',
      //'#',
      //'##'
      //'\n'
    ]
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
