// Some tools don't support `package.json#exports`, such as:
//  - Nuxt v2
//  - Expo/Metro
//  - ESLint
// prettier-ignore
// biome-ignore format:
'use strict';
// prettier-ignore
// biome-ignore format:
exports.stringify = require('./dist/cjs/stringify.js').stringify;
