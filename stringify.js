// Help Nuxt2's resolver which doesn't support `package.json#exports`
// prettier-ignore
'use strict';
// prettier-ignore
exports.stringify = require('./dist/cjs/stringify.js').stringify;
