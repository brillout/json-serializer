const util = require('util');
const isEqual = require('lodash.isequal');
const assert = require('assert');

const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

const original = {
  // types not supported by JSON
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regex: /^\d+$/gi,

  // types supported by JSON
  sub: {obj: {
    null: null,
    false: false,
    true: true,
    arr: [1, 'two', undefined, null, {subi: [1]}],
    str: 'A string',
    n: 1337,
  }},
};

const serialized = stringify(original, null, 2);
const deserialized = parse(serialized);

assert(isEqual(original, deserialized));

console.log('Serialized:');
console.log(serialized);
console.log();
console.log('Original:');
logObj(original);
console.log();
console.log('Deserialized:');
logObj(deserialized);

function logObj(obj) {
  console.log(util.inspect(obj, {depth: Infinity, colors: true}));
}
