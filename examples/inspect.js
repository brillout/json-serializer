const stringify = require('@brillout/jpp/stringify');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// We use the second argument `2` to have a prettified JSON++ string.
// (Same as in `JSON.stringify(obj, undefined, 2)`).
console.log(stringify(obj, undefined, 2));
// Prints:
/*
{
  "date": "@brillout/jpp:tYpE|Date|2018-11-14T17:39:09.245Z",
  "undefined": "@brillout/jpp:tYpE|undefined",
  "NaN": "@brillout/jpp:tYpE|NaN",
  "Infinity": "@brillout/jpp:tYpE|Infinity",
  "regexp": "@brillout/jpp:tYpE|RegExp|/^\\d+$/g"
}
*/
