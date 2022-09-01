const { stringify } = require('@brillout/json-s/stringify')

const obj = {
  date: new Date(),
  undefined: undefined,
  collision: '!undefined',
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g
}

console.log(stringify(obj, undefined, 2))
// Prints:
/*
{
  "date": "!Date:2021-01-12T22:15:56.319Z",
  "undefined": "!undefined",
  "collision": "!!undefined"
  "NaN": "!NaN",
  "Infinity": "!Infinity",
  "regexp": "!RegExp:/^\\d+$/g"
}
*/
