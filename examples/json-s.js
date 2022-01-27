const assert = require('assert')

const { parse } = require('@brillout/json-s/parse')
const { stringify } = require('@brillout/json-s/stringify')

const obj = {
  date: new Date(),
  undefined: undefined,
  NaN: NaN,
  Infinity: Infinity,
  regexp: /^\d+$/g,
}

// All of `obj` can be serialized with JSON-S
const obj2 = parse(stringify(obj))
assert(obj2.date.getTime() === obj.date.getTime())
assert(obj2.undefined === undefined && 'undefined' in obj2)
assert(isNaN(obj2.NaN))
assert(obj2.Infinity === Infinity)
assert(obj2.regexp.toString() === obj.regexp.toString())

// JSON cannot serialize any of `obj`
const obj3 = JSON.parse(JSON.stringify(obj))
// JSON converts dates to strings
assert(obj3.constructor !== Date)
// JSON removes properties with a value of `undefined`
assert(!('undefined' in obj3))
// JSON converts `NaN` to `null`
assert(obj3.NaN === null)
// JSON converts `Infinity` to `null`
assert(obj3.Infinity === null)
// JSON converts RegExp to an empty object
assert(obj3.regexp.constructor === Object && Object.keys(obj3.regexp).length === 0)
