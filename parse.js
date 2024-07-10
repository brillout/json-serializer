// Some tools don't support `package.json#exports`, such as:
//  - Nuxt v2
//  - Expo/Metro
//  - ESLint
// prettier-ignore
// biome-ignore format:
'use strict';
// prettier-ignore
// biome-ignore format:
exports.parse = require('./dist/cjs/parse.js').parse;
exports.parseTransform = require('./dist/cjs/parse.js').parseTransform
