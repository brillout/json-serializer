const util = require('util');
/*
JSON.stringify({
  a: '1',
  b: 2,
  c: new Date(),
  d: {e: 12},
  f: undefined,
  l: 'hm',
}, function(...args) {
  console.log(args);
  return args[1];
});
*/

const parse = require('./parse');
const stringify = require('./stringify');
const assert = require('reassert');

const original = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regex: /^\d+$/,
  // make sure that old types work as well
  sub: {obj: {
    null: null,
    arr: [1, 'two', undefined, null, {subi: [1]}],
    str: 'A string',
    n: 1337,
  }},
};

const serialized = stringify(original, null, 2);
const deserialized = parse(serialized);

console.log('Original:');
logObj(original);
console.log('Serialized:');
console.log(serialized);
console.log('Deserialized:');
logObj(deserialized);

/*
assert(obj.date.constructor===Date);
assert(obj.date.getTime()===date.getTime());
assert(obj.notDefined===undefined);

try {
  stringify({fn: function(){}});
  assert(false);
} catch(err) {}
*/

function logObj(obj) {
  console.log(util.inspect(obj, {depth: Infinity, colors: true}));
}
