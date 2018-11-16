const JSON = require('json-s');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// We use the second argument `2` to have a prettified JSON-S string.
// (Same as in JSON's `JSON.stringify(obj, undefined, 2)`).
console.log(JSON.stringify(obj, undefined, 2));
// Prints:
/*
{
  "date": "json-s:tYpE|Date|2018-11-14T17:39:09.245Z",
  "undefined": "json-s:tYpE|undefined",
  "NaN": "json-s:tYpE|NaN",
  "Infinity": "json-s:tYpE|Infinity",
  "regexp": "json-s:tYpE|RegExp|/^\\d+$/g"
}
*/
