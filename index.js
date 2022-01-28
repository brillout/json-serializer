// Help Nuxt2's resolver which doesn't support `package.json#exports`
// prettier-ignore
'use strict';
// prettier-ignore
exports.parse = require('./dist/cjs/index.js').parse;
exports.stringify = require('./dist/cjs/index.js').stringify;
