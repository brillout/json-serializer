const assert = require('assert');

const parse = require('@brillout/jpp/parse');
const stringify = require('@brillout/jpp/stringify');

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
};

// All of `obj` can be serialized with JSON++
const obj_jpp = parse(stringify(obj))
assert(obj_jpp.date.getTime()===obj.date.getTime());
assert(obj_jpp.undefined===undefined && 'undefined' in obj_jpp);
assert(isNaN(obj_jpp.NaN));
assert(obj_jpp.Infinity===Infinity);
assert(obj_jpp.regexp.toString()===obj.regexp.toString());

// JSON cannot serialize any of `obj`
const obj_json = JSON.parse(JSON.stringify(obj))
// JSON converts dates to strings
assert(obj_json.constructor!==Date);
// JSON removes properties with a value of `undefined`
assert(!('undefined' in obj_json));
// JSON converts `NaN` to `null`
assert(obj_json.NaN===null);
// JSON converts `Infinity` to `null`
assert(obj_json.Infinity===null);
// JSON converts RegExp to an empty object
assert(obj_json.regexp.constructor===Object && Object.keys(obj_json.regexp).length===0);
